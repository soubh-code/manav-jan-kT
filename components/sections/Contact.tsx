"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, MapPin, Phone, Send, UserRound } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(8, "Please enter a valid phone number."),
  subject: z.string().min(1, "Please choose a subject."),
  message: z.string().min(10, "Please share a little more detail.")
});

type FormValues = z.infer<typeof schema>;

const fields = [
  { name: "name", label: "Name", type: "text", autocomplete: "name" },
  { name: "email", label: "Email", type: "email", autocomplete: "email" },
  { name: "phone", label: "Phone", type: "tel", autocomplete: "tel" }
] as const;

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful }
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", phone: "", subject: "", message: "" }
  });

  const onSubmit = () => {
    reset();
  };

  return (
    <section id="contact" className="bg-midnight text-white">
      <div className="section-shell grid gap-12 lg:grid-cols-[0.42fr_0.58fr]">
        <div>
          <p className="font-heading text-sm font-semibold uppercase tracking-[0.18em] text-amber-mjkt">
            Contact
          </p>
          <h2 className="mt-4 font-heading text-5xl font-bold leading-tight">
            Get In <span className="text-amber-mjkt">Touch</span>
          </h2>
          <p className="mt-6 max-w-md text-lg leading-8 text-graylight">
            Reach out to donate, volunteer, partner with us, or learn more about
            Manav Jan Kalyan Trust projects across India.
          </p>
          <div className="mt-9 grid gap-5">
            <div className="flex gap-4">
              <MapPin className="h-6 w-6 text-pink-mjkt" />
              <span>Manav Jan Kalyan Trust, India</span>
            </div>
            <div className="flex gap-4">
              <Phone className="h-6 w-6 text-pink-mjkt" />
              <a href="tel:+910000000000" className="hover:text-pink-mjkt">
                +91 00000 00000
              </a>
            </div>
            <div className="flex gap-4">
              <Mail className="h-6 w-6 text-pink-mjkt" />
              <a href="mailto:hello@mjktrust.org" className="hover:text-pink-mjkt">
                hello@mjktrust.org
              </a>
            </div>
          </div>
          <div className="mt-9 flex gap-3">
            {[UserRound, Mail, Phone].map((Icon, index) => (
              <a
                key={index}
                href="#contact"
                aria-label="Contact channel"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-pink-mjkt text-white transition-colors hover:bg-pink-dark"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-3xl bg-white p-6 text-midnight shadow-glow md:p-8"
          noValidate
        >
          <div className="grid gap-5 md:grid-cols-2">
            {fields.map((field) => (
              <label key={field.name} className="grid gap-2 font-heading text-sm font-semibold">
                {field.label}
                <input
                  {...register(field.name)}
                  type={field.type}
                  autoComplete={field.autocomplete}
                  className="h-12 rounded-xl border border-graylight px-4 font-body text-base font-normal"
                />
                {errors[field.name] ? (
                  <span className="font-body text-sm text-pink-mjkt">
                    {errors[field.name]?.message}
                  </span>
                ) : null}
              </label>
            ))}
            <label className="grid gap-2 font-heading text-sm font-semibold md:col-span-2">
              Subject
              <select
                {...register("subject")}
                className="h-12 rounded-xl border border-graylight px-4 font-body text-base font-normal"
              >
                <option value="">Choose a subject</option>
                <option value="donation">Donation</option>
                <option value="volunteer">Volunteer</option>
                <option value="partnership">Partnership</option>
                <option value="report">Annual report</option>
              </select>
              {errors.subject ? (
                <span className="font-body text-sm text-pink-mjkt">
                  {errors.subject.message}
                </span>
              ) : null}
            </label>
            <label className="grid gap-2 font-heading text-sm font-semibold md:col-span-2">
              Message
              <textarea
                {...register("message")}
                rows={4}
                className="rounded-xl border border-graylight px-4 py-3 font-body text-base font-normal"
              />
              {errors.message ? (
                <span className="font-body text-sm text-pink-mjkt">
                  {errors.message.message}
                </span>
              ) : null}
            </label>
          </div>
          <button
            type="submit"
            className="mt-7 flex h-13 min-h-12 w-full items-center justify-center gap-2 rounded-full bg-pink-mjkt px-6 py-4 font-heading font-semibold text-white transition-colors hover:bg-pink-dark focus-visible:ring-4 focus-visible:ring-pink-mjkt/30"
          >
            Send Message <Send className="h-5 w-5" />
          </button>
          {isSubmitSuccessful ? (
            <p className="mt-4 rounded-xl bg-green-light px-4 py-3 text-green-dark" role="status">
              Thank you. Your message is ready for the MJKT team.
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
