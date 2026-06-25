import { NextResponse } from "next/server";
import { getOrderByLocalId, getPaidPaymentByLocalOrderId } from "@/lib/donationsDb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ReceiptRouteProps = {
  params: {
    orderId: string;
  };
};

export async function GET(_request: Request, { params }: ReceiptRouteProps) {
  const order = getOrderByLocalId(params.orderId);
  const payment = getPaidPaymentByLocalOrderId(params.orderId);

  if (!order || order.status !== "paid" || !payment) {
    return NextResponse.json({ message: "Verified receipt not found." }, { status: 404 });
  }

  const receipt = [
    "Manav Jan Kalyan Trust - Donation Receipt",
    "-----------------------------------------",
    `Receipt ID: ${params.orderId}`,
    `Payment ID: ${String(payment.razorpay_payment_id)}`,
    `Amount: INR ${String(order.amount_rupees)}`,
    `Cause: ${String(order.cause_title)}`,
    `Donor: ${String(order.donor_full_name)}`,
    `Email: ${String(order.donor_email)}`,
    `Mobile: ${String(order.donor_mobile)}`,
    `Date: ${String(order.updated_at)}`,
    "",
    "This receipt is generated from verified Razorpay payment records."
  ].join("\n");

  return new Response(receipt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": `attachment; filename="mjkt-receipt-${params.orderId}.txt"`
    }
  });
}
