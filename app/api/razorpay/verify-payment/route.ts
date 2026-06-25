import { NextResponse } from "next/server";
import { z } from "zod";
import { getOrderByRazorpayId, updateOrderStatus, upsertPayment } from "@/lib/donationsDb";
import { verifyRazorpayPaymentSignature } from "@/lib/razorpay";

export const runtime = "nodejs";

const verifySchema = z.object({
  razorpay_order_id: z.string().min(1),
  razorpay_payment_id: z.string().min(1),
  razorpay_signature: z.string().min(1)
});

export async function POST(request: Request) {
  try {
    const parsed = verifySchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json(
        { state: "failed", message: "Invalid payment verification payload." },
        { status: 400 }
      );
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = parsed.data;
    const order = getOrderByRazorpayId(razorpay_order_id);

    if (!order) {
      return NextResponse.json({ state: "failed", message: "Order not found." }, { status: 404 });
    }

    const isValid = verifyRazorpayPaymentSignature({
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature
    });

    if (!isValid) {
      upsertPayment({
        razorpayPaymentId: razorpay_payment_id,
        razorpayOrderId: razorpay_order_id,
        localOrderId: String(order.local_order_id),
        amountPaise: Number(order.amount_paise),
        status: "failed"
      });
      updateOrderStatus(razorpay_order_id, "failed");
      return NextResponse.json(
        { state: "failed", message: "Payment signature verification failed." },
        { status: 400 }
      );
    }

    upsertPayment({
      razorpayPaymentId: razorpay_payment_id,
      razorpayOrderId: razorpay_order_id,
      localOrderId: String(order.local_order_id),
      amountPaise: Number(order.amount_paise),
      status: "paid"
    });
    updateOrderStatus(razorpay_order_id, "paid");

    return NextResponse.json({
      state: "paid",
      redirectUrl: `/donation-success?order=${encodeURIComponent(String(order.local_order_id))}`
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to verify payment.";
    return NextResponse.json({ state: "failed", message }, { status: 500 });
  }
}
