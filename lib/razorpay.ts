import crypto from "node:crypto";

export function getRazorpayKeyId() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  if (!keyId) {
    throw new Error("RAZORPAY_KEY_ID is not configured");
  }
  return keyId;
}

export function getRazorpayKeySecret() {
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) {
    throw new Error("RAZORPAY_KEY_SECRET is not configured");
  }
  return keySecret;
}

export function verifyRazorpayPaymentSignature({
  razorpayOrderId,
  razorpayPaymentId,
  razorpaySignature
}: {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}) {
  const expected = crypto
    .createHmac("sha256", getRazorpayKeySecret())
    .update(`${razorpayOrderId}|${razorpayPaymentId}`)
    .digest("hex");

  if (expected.length !== razorpaySignature.length) return false;
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(razorpaySignature));
}

export function verifyWebhookSignature(body: string, signature: string) {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!webhookSecret) {
    throw new Error("RAZORPAY_WEBHOOK_SECRET is not configured");
  }

  const expected = crypto.createHmac("sha256", webhookSecret).update(body).digest("hex");
  if (expected.length !== signature.length) return false;
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
}

export async function createRazorpayOrder({
  amountPaise,
  receipt,
  notes
}: {
  amountPaise: number;
  receipt: string;
  notes: Record<string, string>;
}) {
  const auth = Buffer.from(`${getRazorpayKeyId()}:${getRazorpayKeySecret()}`).toString("base64");
  const response = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      amount: amountPaise,
      currency: "INR",
      receipt,
      notes
    })
  });

  const payload = (await response.json()) as { id?: string; error?: { description?: string } };

  if (!response.ok || !payload.id) {
    throw new Error(payload.error?.description || "Unable to create Razorpay order");
  }

  return payload as { id: string; amount: number; currency: string; receipt: string };
}
