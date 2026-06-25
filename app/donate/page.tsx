"use client";

import Image from "next/image";
import { Heart, HeartHandshake, ShieldCheck, Stethoscope, Users, UtensilsCrossed } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";
import Button from "@/components/ui/Button";
import type { DonationFrequency } from "@/lib/donationConfig";

type DonationColor = "pink" | "blue" | "amber" | "green";

type DonationProject = {
  id: string;
  title: string;
  subtitle: string;
  impact: string;
  image: string;
  icon: LucideIcon;
  color: DonationColor;
  minimum: number;
  suggested: [number, number, number];
};

type DonorForm = {
  fullName: string;
  email: string;
  mobile: string;
  pan: string;
  address: string;
  consent: boolean;
};

type CheckoutState = "idle" | "pending" | "success" | "failed" | "cancelled";

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}

const donationProjects: DonationProject[] = [
  {
    id: "street-hunger-relief",
    title: "Street Hunger Relief",
    subtitle: "Serve meals with dignity to families in need",
    impact: "Help us take warm food, nutrition support, and care directly to children and families living in vulnerable roadside communities.",
    image: "/images/donate-food-support.jpeg",
    icon: UtensilsCrossed,
    color: "amber",
    minimum: 20,
    suggested: [20, 60, 150]
  },
  {
    id: "skill-india-youth-program",
    title: "Skill India Youth Program",
    subtitle: "Open pathways to learning and employment",
    impact: "Support youth workshops, certificates, training resources, and mentorship that help young people build confidence and real career skills.",
    image: "/images/donate-skill-india.jpeg",
    icon: Users,
    color: "blue",
    minimum: 20,
    suggested: [20, 40, 100]
  },
  {
    id: "children-nutrition-circle",
    title: "Children Nutrition Circle",
    subtitle: "Nourish childhood with care and consistency",
    impact: "Help provide nutritious meals, safe community gatherings, and support systems that protect children from hunger and neglect.",
    image: "/images/donate-children-care.jpeg",
    icon: Heart,
    color: "pink",
    minimum: 20,
    suggested: [20, 40, 100]
  },
  {
    id: "women-care-empowerment",
    title: "Women Care & Empowerment",
    subtitle: "Strengthen confidence and community leadership",
    impact: "Support grassroots women-led outreach, dignity programs, community events, and local initiatives that create safer, stronger neighborhoods.",
    image: "/images/donate-women-empowerment.jpeg",
    icon: HeartHandshake,
    color: "pink",
    minimum: 20,
    suggested: [20, 40, 100]
  },
  {
    id: "health-community-support",
    title: "Health & Community Support",
    subtitle: "Fund care where it reaches fast",
    impact: "Provide essential medicines, checkups, and care support in underserved communities.",
    image: "/images/donate-health-support.jpeg",
    icon: Stethoscope,
    color: "green",
    minimum: 20,
    suggested: [20, 40, 100]
  },
  {
    id: "education-every-child",
    title: "Education for Every Child",
    subtitle: "Bring learning into every community",
    impact: "Help children access school supplies, open-air learning spaces, and volunteer-led educational drives that keep hope alive.",
    image: "/images/donate-education-drive.jpeg",
    icon: Users,
    color: "blue",
    minimum: 20,
    suggested: [20, 40, 100]
  }
];

const projectColors: Record<
  DonationColor,
  {
    panel: string;
    badge: string;
    button: string;
    slider: string;
    ring: string;
    soft: string;
    text: string;
  }
> = {
  pink: {
    panel: "border-pink-mjkt/30",
    badge: "bg-pink-mjkt text-white",
    button: "bg-pink-mjkt hover:bg-pink-dark text-white",
    slider: "accent-pink-mjkt",
    ring: "focus-visible:ring-pink-mjkt/30",
    soft: "bg-pink-light",
    text: "text-pink-mjkt"
  },
  blue: {
    panel: "border-blue-mjkt/30",
    badge: "bg-blue-mjkt text-white",
    button: "bg-blue-mjkt hover:bg-blue-dark text-white",
    slider: "accent-blue-mjkt",
    ring: "focus-visible:ring-blue-mjkt/30",
    soft: "bg-blue-light",
    text: "text-blue-mjkt"
  },
  amber: {
    panel: "border-amber-mjkt/30",
    badge: "bg-amber-mjkt text-midnight",
    button: "bg-amber-mjkt hover:bg-amber-dark hover:text-white text-midnight",
    slider: "accent-amber-mjkt",
    ring: "focus-visible:ring-amber-mjkt/30",
    soft: "bg-amber-light",
    text: "text-amber-mjkt"
  },
  green: {
    panel: "border-green-mjkt/30",
    badge: "bg-green-mjkt text-white",
    button: "bg-green-mjkt hover:bg-green-dark text-white",
    slider: "accent-green-mjkt",
    ring: "focus-visible:ring-green-mjkt/30",
    soft: "bg-green-light",
    text: "text-green-mjkt"
  }
};

function loadRazorpayScript() {
  return new Promise<boolean>((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
    );

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(true), { once: true });
      existingScript.addEventListener("error", () => resolve(false), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

const emptyDonor: DonorForm = {
  fullName: "",
  email: "",
  mobile: "",
  pan: "",
  address: "",
  consent: false
};

function DonateCard({ project }: { project: DonationProject }) {
  const [amount, setAmount] = useState(project.suggested[2]);
  const [frequency, setFrequency] = useState<DonationFrequency>("once");
  const [donor, setDonor] = useState<DonorForm>(emptyDonor);
  const [checkoutState, setCheckoutState] = useState<CheckoutState>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const color = projectColors[project.color];
  const Icon = project.icon;

  const updateDonor = (field: keyof DonorForm, value: string | boolean) => {
    setDonor((current) => ({ ...current, [field]: value }));
  };

  const startCheckout = async () => {
    setCheckoutState("pending");
    setStatusMessage("Creating a secure Razorpay order...");

    const hasScript = await loadRazorpayScript();
    if (!hasScript || !window.Razorpay) {
      setCheckoutState("failed");
      setStatusMessage("Razorpay Checkout could not be loaded. Please try again.");
      return;
    }

    try {
      const response = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          causeId: project.id,
          amountRupees: amount,
          frequency,
          donor: {
            ...donor,
            pan: donor.pan || undefined
          }
        })
      });

      const order = (await response.json()) as {
        state: string;
        message?: string;
        keyId?: string;
        orderId?: string;
        amountRupees?: number;
        cause?: string;
        semanticColor?: string;
        donor?: { name: string; email: string; contact: string };
      };

      if (!response.ok || !order.keyId || !order.orderId) {
        setCheckoutState("failed");
        setStatusMessage(order.message || "Unable to create payment order.");
        return;
      }

      setStatusMessage("Razorpay Checkout is open. Complete or cancel the payment there.");

      const checkout = new window.Razorpay({
        key: order.keyId,
        currency: "INR",
        name: "Manav Jan Kalyan Trust",
        description: order.cause,
        order_id: order.orderId,
        prefill: order.donor,
        theme: {
          color: order.semanticColor
        },
        modal: {
          ondismiss: () => {
            setCheckoutState("cancelled");
            setStatusMessage("Payment was cancelled before completion.");
          }
        },
        handler: async (payment: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          setCheckoutState("pending");
          setStatusMessage("Verifying payment securely...");
          const verifyResponse = await fetch("/api/razorpay/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payment)
          });
          const verified = (await verifyResponse.json()) as {
            state: "paid" | "failed";
            message?: string;
            redirectUrl?: string;
          };

          if (verifyResponse.ok && verified.state === "paid" && verified.redirectUrl) {
            setCheckoutState("success");
            setStatusMessage("Payment verified. Opening your donation receipt...");
            window.location.href = verified.redirectUrl;
            return;
          }

          setCheckoutState("failed");
          setStatusMessage(verified.message || "Payment verification failed.");
        }
      });

      checkout.open();
    } catch (error) {
      setCheckoutState("failed");
      setStatusMessage(error instanceof Error ? error.message : "Payment could not be started.");
    }
  };

  return (
    <article className={`grid overflow-hidden rounded-[28px] border bg-white shadow-mjkt max-md:rounded-[22px] xl:grid-cols-[1.1fr_0.9fr] ${color.panel}`}>
      <div className="relative min-h-[320px] overflow-hidden max-md:min-h-[360px]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(min-width: 1280px) 30vw, 100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight/65 via-midnight/5 to-transparent" />
        <div className="absolute left-5 top-5 flex items-center gap-3 max-md:left-4 max-md:top-4">
          <span className={`flex h-11 w-11 items-center justify-center rounded-full ${color.badge}`}>
            <Icon className="h-5 w-5" />
          </span>
          <div className="max-w-[250px] text-white">
            <p className="font-heading text-sm font-semibold max-md:text-base">{project.title}</p>
            <p className="text-sm text-white/80 max-md:hidden">{project.subtitle}</p>
          </div>
        </div>
        <div className="absolute bottom-5 left-5 max-w-[320px] text-white max-md:left-6">
          <p className="font-heading text-[2rem] font-bold leading-none max-md:text-[2.15rem]">WE CAN</p>
          <p className="font-heading text-[2rem] font-bold leading-none max-md:text-[2.15rem]">SAVE THE FUTURE</p>
          <div className={`mt-3 h-1 w-24 rounded-full ${color.badge.split(" ").find((cls) => cls.startsWith("bg-"))}`} />
        </div>
      </div>

      <div className="flex flex-col justify-between p-6 max-md:p-5">
        <div>
          <div className={`rounded-[24px] border px-4 py-4 max-md:rounded-[18px] ${color.soft} ${color.panel}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-midnight/55">Project Name</p>
            <h2 className="mt-2 font-heading text-[1.45rem] font-bold leading-tight text-midnight max-md:text-[1.8rem]">
              {project.title}
            </h2>
            <p className="mt-1 text-sm leading-6 text-midnight/75">{project.subtitle}</p>
          </div>

          <p className="mt-6 font-heading text-sm font-semibold text-midnight">Choose a donation amount</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
            {project.suggested.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setAmount(value)}
                className={`rounded-2xl border px-4 py-3 text-left transition-all max-md:grid max-md:grid-cols-[72px_1fr] max-md:items-center max-md:gap-3 max-md:py-4 ${amount === value ? `${color.badge} border-transparent shadow-mjkt` : `border-graylight ${color.soft} text-midnight`}`}
              >
                <span className="font-heading text-lg font-bold">₹{value}</span>
                <span className="hidden text-xs leading-5 max-md:block">
                  {value === project.suggested[0]
                    ? "Begin with a small act of care."
                    : value === project.suggested[1]
                      ? "Support a stronger day for a family."
                      : "Create deeper impact for this cause."}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-6">
            <div className="mb-3 flex items-center justify-between">
              <label htmlFor={project.title} className="font-heading text-sm font-semibold text-midnight">
                Select custom amount
              </label>
              <span className={`font-heading text-xl font-bold ${color.text}`}>₹{amount}</span>
            </div>
            <input
              id={project.title}
              type="range"
              min={project.minimum}
              max={5000}
              step={10}
              value={amount}
              onChange={(event) => setAmount(Number(event.target.value))}
              className={`h-2 w-full cursor-pointer rounded-full bg-graylight ${color.slider}`}
            />
            <div className="mt-2 flex justify-between text-xs text-graymid">
              <span>₹{project.minimum}</span>
              <span>₹5000</span>
            </div>
          </div>

          <div className="mt-6">
            <p className="font-heading text-sm font-semibold text-midnight">Donation frequency</p>
            <div className="mt-3 grid grid-cols-2 gap-3 max-md:gap-0 max-md:overflow-hidden max-md:rounded-2xl max-md:border max-md:border-graylight">
              {[
                ["once", "One time"],
                ["monthly_pledge", "Monthly pledge"]
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setFrequency(value as DonationFrequency)}
                  className={`rounded-2xl border px-4 py-3 font-heading text-sm font-semibold transition-all max-md:rounded-none max-md:border-0 max-md:py-4 ${frequency === value ? `${color.badge} border-transparent` : "border-graylight text-midnight"}`}
                >
                  {label}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs leading-5 text-midnight/60">
              Monthly pledge records your intent only. Razorpay Standard Checkout charges only the amount paid today.
            </p>
          </div>

          <div className="mt-6 grid gap-3 rounded-[22px] border border-graylight/70 bg-white/80 p-4">
            <p className="font-heading text-sm font-semibold text-midnight">Donor details</p>
            <input
              value={donor.fullName}
              onChange={(event) => updateDonor("fullName", event.target.value)}
              required
              placeholder="Full name"
              aria-label="Full name"
              className="rounded-2xl border border-graylight px-4 py-3 text-midnight"
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                value={donor.email}
                onChange={(event) => updateDonor("email", event.target.value)}
                required
                type="email"
                placeholder="Email"
                aria-label="Email"
                className="rounded-2xl border border-graylight px-4 py-3 text-midnight"
              />
              <input
                value={donor.mobile}
                onChange={(event) => updateDonor("mobile", event.target.value)}
                required
                inputMode="numeric"
                placeholder="Mobile number"
                aria-label="Mobile number"
                className="rounded-2xl border border-graylight px-4 py-3 text-midnight"
              />
            </div>
            <input
              value={donor.pan}
              onChange={(event) => updateDonor("pan", event.target.value.toUpperCase())}
              placeholder="PAN, if legally required"
              aria-label="PAN, if legally required"
              className="rounded-2xl border border-graylight px-4 py-3 uppercase text-midnight"
            />
            <textarea
              value={donor.address}
              onChange={(event) => updateDonor("address", event.target.value)}
              required
              placeholder="Address"
              aria-label="Address"
              rows={3}
              className="resize-none rounded-2xl border border-graylight px-4 py-3 text-midnight"
            />
            <label className="flex items-start gap-3 rounded-2xl border border-graylight p-3 text-sm leading-6 text-midnight/75">
              <input
                type="checkbox"
                checked={donor.consent}
                onChange={(event) => updateDonor("consent", event.target.checked)}
                className={`mt-1 h-4 w-4 ${color.slider}`}
              />
              I consent to Manav Jan Kalyan Trust storing my details for donation records, receipts, and compliance.
            </label>
          </div>
        </div>

        <div className="mt-6">
          <p className="mb-4 text-sm leading-6 text-midnight/75">{project.impact}</p>
          <button
            type="button"
            onClick={startCheckout}
            disabled={checkoutState === "pending"}
            className={`flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-4 font-heading text-base font-semibold transition-all focus-visible:ring-4 ${color.button} ${color.ring}`}
          >
            <Heart className="h-5 w-5" />
            {checkoutState === "pending" ? "Processing..." : `Pay ₹${amount}`}
          </button>
          <p
            className={`mt-3 rounded-2xl px-4 py-3 text-sm leading-6 ${
              checkoutState === "idle"
                ? "sr-only"
                : checkoutState === "success"
                  ? "bg-green-light text-green-dark"
                  : checkoutState === "failed"
                    ? "bg-pink-light text-pink-dark"
                    : checkoutState === "cancelled"
                      ? "bg-amber-light text-amber-dark"
                      : "bg-blue-light text-blue-dark"
            }`}
            role="status"
            aria-live="polite"
          >
            {statusMessage || "Ready for secure payment."}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function DonatePage() {
  return (
    <main className="watercolor-bg min-h-dvh pt-28 max-md:pt-[80px]">
      <section className="section-shell pt-8 max-md:pt-7">
        <div className="mx-auto max-w-[980px] text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-pink-mjkt bg-white/80 px-6 py-3 font-heading text-sm font-semibold text-pink-mjkt shadow-mjkt max-md:px-5 max-md:py-2.5">
            <Heart className="h-5 w-5" />
            Donate
          </div>
          <h1 className="mt-6 font-heading text-[clamp(2.6rem,4.5vw,4.8rem)] font-bold leading-[1.05] text-midnight max-md:text-[clamp(2.65rem,9vw,4rem)]">
            Your Donation. <span className="text-amber-mjkt">Their Tomorrow.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-[760px] text-xl leading-9 text-midnight/80 max-md:text-base max-md:leading-7">
            Together, we can build stronger communities with dignity, education,
            health, and support for a better tomorrow.
          </p>
        </div>

        <div className="mt-12 grid gap-8 max-md:mt-8 max-md:gap-7 xl:grid-cols-2">
          {donationProjects.map((project) => (
            <DonateCard key={project.title} project={project} />
          ))}
        </div>

        <div className="mt-10 grid gap-4 rounded-[28px] bg-white p-6 shadow-mjkt max-md:grid-cols-2 max-md:gap-5 max-md:rounded-[22px] max-md:p-4 lg:grid-cols-5">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-mjkt text-white">
              <ShieldCheck className="h-6 w-6" />
            </span>
            <div>
              <p className="font-heading font-bold text-midnight">100% Accountability</p>
              <p className="text-sm text-midnight/75">Every rupee, fully accounted</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-mjkt text-white">
              <Users className="h-6 w-6" />
            </span>
            <div>
              <p className="font-heading font-bold text-midnight">Quarterly Reports</p>
              <p className="text-sm text-midnight/75">Transparency, timely, consistent</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-mjkt text-midnight">
              <ShieldCheck className="h-6 w-6" />
            </span>
            <div>
              <p className="font-heading font-bold text-midnight">80G Certified</p>
              <p className="text-sm text-midnight/75">Your donation is eligible</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-green-mjkt text-white">
              <ShieldCheck className="h-6 w-6" />
            </span>
            <div>
              <p className="font-heading font-bold text-midnight">Audited Statements</p>
              <p className="text-sm text-midnight/75">Independently verified</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-mjkt text-white">
              <HeartHandshake className="h-6 w-6" />
            </span>
            <div>
              <p className="font-heading font-bold text-midnight">Trusted & Transparent</p>
              <p className="text-sm text-midnight/75">Our promise. Always.</p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-5 rounded-[28px] border border-pink-mjkt/20 bg-gradient-to-r from-pink-light via-white to-amber-light px-8 py-6 shadow-mjkt max-md:rounded-[22px] max-md:px-5 max-md:text-center lg:flex-row">
          <div>
            <p className="font-heading text-[2rem] font-bold text-pink-mjkt">
              Every small contribution creates a big change.
            </p>
            <p className="mt-2 text-lg text-midnight/75">
              Join thousands of kind hearts in building a better tomorrow.
            </p>
          </div>
          <Button href="/donate" variant="donate" className="h-14 px-8 text-base">
            <Heart className="h-5 w-5" /> Donate Now
          </Button>
        </div>
      </section>
    </main>
  );
}
