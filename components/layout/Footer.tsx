import { Globe2, HandHeart, Mail, MessageCircle, Send } from "lucide-react";

const columns = [
  {
    title: "Quick Links",
    links: [
      ["About", "/#about"],
      ["Projects", "/#projects"],
      ["Transparency", "/#transparency"],
      ["Contact", "/#contact"]
    ]
  },
  {
    title: "Our Work",
    links: [
      ["Education", "/#projects"],
      ["Healthcare", "/#projects"],
      ["Women Empowerment", "/#projects"],
      ["Livelihood", "/#projects"],
      ["Food Support", "/#projects"],
      ["Community Care", "/#projects"]
    ]
  },
  {
    title: "Legal",
    links: [
      ["Donate", "/donate"],
      ["Annual Reports", "/#transparency"],
      ["80G Certificate", "/#transparency"],
      ["Contact", "/#contact"]
    ]
  }
];

export default function Footer() {
  return (
    <footer className="border-t border-pink-mjkt bg-midnight text-white">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-6 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-amber-mjkt bg-white">
              <HandHeart aria-hidden="true" className="h-7 w-7 text-green-mjkt" />
            </span>
            <span className="font-heading text-xl font-bold leading-tight">
              Manav Jan
              <br />
              Kalyan Trust
            </span>
          </div>
          <p className="mt-5 max-w-sm leading-7 text-graylight">
            Working across food support, quality education, healthcare, dignity,
            and community upliftment for stronger communities.
          </p>
          <div className="mt-6 flex gap-3 text-pink-mjkt">
            {[Globe2, Mail, MessageCircle, Send].map((Icon, index) => (
              <a
                key={index}
                href="/#contact"
                aria-label="Social profile"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/8 transition-colors hover:bg-white/14"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
        {columns.map((column) => (
          <div key={column.title}>
            <h3 className="font-heading text-lg font-semibold">{column.title}</h3>
            <ul className="mt-5 grid gap-3 text-graylight">
              {column.links.map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="transition-colors hover:text-pink-mjkt">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 px-6 py-5 text-center text-sm text-graylight">
        © 2025 Manav Jan Kalyan Trust. All Rights Reserved. | Designed with care
        for humanity
      </div>
    </footer>
  );
}
