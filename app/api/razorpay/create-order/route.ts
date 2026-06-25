import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { createDonationOrder } from "@/lib/donationsDb";
import { getDonationCause, requiresPan } from "@/lib/donationConfig";
import type { DonationFrequency } from "@/lib/donationConfig";
import { createRazorpayOrder, getRazorpayKeyId } from "@/lib/razorpay";

export const runtime = "nodejs";

const donorSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(180),
  mobile: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter a valid 10 digit Indian mobile number"),
  pan: z.string().trim().optional(),
  address: z.string().trim().min(8).max(500),
  consent: z.literal(true)
});

const orderSchema = z.object({
  causeId: z.string().trim().min(1),
  amountRupees: z.number().int().positive(),
  frequency: z.enum(["once", "monthly_pledge"]),
  donor: donorSchema
});

export async function POST(request: Request) {
  try {
    const parsed = orderSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json(
        { state: "failed", message: "Please check the donation details and try again." },
        { status: 400 }
      );
    }

    const { causeId, amountRupees, frequency, donor } = parsed.data;
    const cause = getDonationCause(causeId);

    if (!cause || amountRupees < cause.minimum || amountRupees > cause.maximum) {
      return NextResponse.json(
        { state: "failed", message: "Invalid donation amount or cause." },
        { status: 400 }
      );
    }

    if (requiresPan(amountRupees) && !donor.pan) {
      return NextResponse.json(
        { state: "failed", message: "PAN is required for this donation amount." },
        { status: 400 }
      );
    }

    const amountPaise = amountRupees * 100;
    const localOrderId = randomUUID();
    const order = await createRazorpayOrder({
      amountPaise,
      receipt: localOrderId,
      notes: {
        causeId: cause.id,
        cause: cause.title,
        frequency
      }
    });

    createDonationOrder({
      localOrderId,
      razorpayOrderId: order.id,
      amountRupees,
      amountPaise,
      causeId: cause.id,
      causeTitle: cause.title,
      frequency: frequency as DonationFrequency,
      donor,
      status: "created"
    });

    return NextResponse.json({
      state: "created",
      keyId: getRazorpayKeyId(),
      orderId: order.id,
      localOrderId,
      amountRupees,
      cause: cause.title,
      semanticColor: cause.semanticColor,
      donor: {
        name: donor.fullName,
        email: donor.email,
        contact: donor.mobile
      }
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create payment order.";
    return NextResponse.json({ state: "failed", message }, { status: 500 });
  }
}
