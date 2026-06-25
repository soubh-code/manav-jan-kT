import { NextResponse } from "next/server";
import { markPaymentRefunded, markWebhookProcessed, updateOrderStatus, upsertPayment } from "@/lib/donationsDb";
import { verifyWebhookSignature } from "@/lib/razorpay";

export const runtime = "nodejs";

type RazorpayWebhookPayload = {
  event?: string;
  payload?: {
    payment?: {
      entity?: {
        id?: string;
        order_id?: string;
        amount?: number;
        status?: string;
        method?: string;
      };
    };
    refund?: {
      entity?: {
        payment_id?: string;
        amount?: number;
      };
    };
  };
};

function mapPaymentStatus(status?: string) {
  if (status === "captured" || status === "authorized") return "paid";
  if (status === "failed") return "failed";
  if (status === "refunded") return "refunded";
  return "created";
}

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-razorpay-signature");
  const eventId =
    request.headers.get("x-razorpay-event-id") ||
    request.headers.get("x-razorpay-delivery-id") ||
    "";

  if (!signature) {
    return NextResponse.json({ state: "failed", message: "Missing webhook signature." }, { status: 400 });
  }

  try {
    if (!verifyWebhookSignature(rawBody, signature)) {
      return NextResponse.json({ state: "failed", message: "Invalid webhook signature." }, { status: 400 });
    }

    const payload = JSON.parse(rawBody) as RazorpayWebhookPayload;
    const eventName = payload.event || "unknown";
    const idempotencyKey = eventId || `${eventName}:${signature}`;

    if (!markWebhookProcessed(idempotencyKey, eventName)) {
      return NextResponse.json({ state: "duplicate", message: "Webhook already processed." });
    }

    const payment = payload.payload?.payment?.entity;
    if (payment?.id && payment.order_id) {
      const status = mapPaymentStatus(payment.status);
      upsertPayment({
        razorpayPaymentId: payment.id,
        razorpayOrderId: payment.order_id,
        amountPaise: payment.amount,
        status,
        method: payment.method,
        rawPayload: payload
      });

      if (eventName === "payment.captured" || eventName === "payment.authorized") {
        updateOrderStatus(payment.order_id, "paid");
      }

      if (eventName === "payment.failed") {
        updateOrderStatus(payment.order_id, "failed");
      }
    }

    const refund = payload.payload?.refund?.entity;
    if (eventName.startsWith("refund.") && refund?.payment_id) {
      markPaymentRefunded(refund.payment_id, payload);
      if (payment?.order_id) updateOrderStatus(payment.order_id, "refunded");
    }

    return NextResponse.json({ state: "processed" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Webhook processing failed.";
    return NextResponse.json({ state: "failed", message }, { status: 500 });
  }
}
