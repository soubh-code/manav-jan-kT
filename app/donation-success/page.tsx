import Link from "next/link";
import { CheckCircle2, Download, Heart } from "lucide-react";
import { getOrderByLocalId, getPaidPaymentByLocalOrderId } from "@/lib/donationsDb";

export const dynamic = "force-dynamic";

type DonationSuccessPageProps = {
  searchParams: {
    order?: string;
  };
};

function formatDate(value: unknown) {
  const date = value ? new Date(String(value)) : new Date();
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  }).format(date);
}

export default function DonationSuccessPage({ searchParams }: DonationSuccessPageProps) {
  const orderId = searchParams.order || "";
  const order = orderId ? getOrderByLocalId(orderId) : undefined;
  const payment = orderId ? getPaidPaymentByLocalOrderId(orderId) : undefined;

  if (!order || order.status !== "paid" || !payment) {
    return (
      <main className="watercolor-bg min-h-dvh pt-28">
        <section className="section-shell">
          <div className="mx-auto max-w-2xl rounded-[28px] bg-white p-8 text-center shadow-mjkt">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-amber-light text-amber-dark">
              <Heart className="h-8 w-8" />
            </div>
            <h1 className="mt-6 font-heading text-4xl font-bold text-midnight">Donation status pending</h1>
            <p className="mt-4 text-lg leading-8 text-midnight/75">
              We could not find a verified paid donation for this receipt yet. If your payment was debited,
              please wait for confirmation or contact the trust with your Razorpay payment ID.
            </p>
            <Link
              href="/donate"
              className="mt-8 inline-flex rounded-full bg-blue-mjkt px-6 py-3 font-heading font-semibold text-white"
            >
              Return to donate page
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="watercolor-bg min-h-dvh pt-28">
      <section className="section-shell">
        <div className="mx-auto max-w-3xl overflow-hidden rounded-[32px] bg-white shadow-mjkt">
          <div className="bg-midnight px-8 py-10 text-center text-white">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-green-mjkt">
              <CheckCircle2 className="h-11 w-11" />
            </div>
            <h1 className="mt-6 font-heading text-4xl font-bold">Donation successful</h1>
            <p className="mt-3 text-white/78">Thank you for supporting Manav Jan Kalyan Trust.</p>
          </div>

          <div className="grid gap-5 p-8 text-midnight sm:grid-cols-2">
            <div className="rounded-2xl bg-blue-light p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-dark">Payment ID</p>
              <p className="mt-2 break-words font-heading text-lg font-bold">{String(payment.razorpay_payment_id)}</p>
            </div>
            <div className="rounded-2xl bg-green-light p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-green-dark">Amount</p>
              <p className="mt-2 font-heading text-2xl font-bold">₹{String(order.amount_rupees)}</p>
            </div>
            <div className="rounded-2xl bg-amber-light p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-amber-dark">Cause</p>
              <p className="mt-2 font-heading text-lg font-bold">{String(order.cause_title)}</p>
            </div>
            <div className="rounded-2xl bg-pink-light p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-pink-dark">Date</p>
              <p className="mt-2 font-heading text-lg font-bold">{formatDate(order.updated_at)}</p>
            </div>
            <div className="rounded-2xl bg-ivory p-5 sm:col-span-2">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-midnight/55">Donor name</p>
              <p className="mt-2 font-heading text-xl font-bold">{String(order.donor_full_name)}</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t border-graylight px-8 py-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-6 text-midnight/70">
              Receipt details are generated from verified payment records.
            </p>
            <a
              href={`/api/donation-receipt/${encodeURIComponent(orderId)}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-pink-mjkt px-6 py-3 font-heading font-semibold text-white"
            >
              <Download className="h-5 w-5" />
              Download receipt
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
