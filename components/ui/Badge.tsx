import type { LucideIcon } from "lucide-react";

type BadgeProps = {
  icon: LucideIcon;
  children: React.ReactNode;
  className?: string;
};

export default function Badge({ icon: Icon, children, className = "" }: BadgeProps) {
  return (
    <div
      className={`inline-flex items-center gap-3 rounded-full border border-pink-mjkt bg-pink-light px-6 py-3 font-heading text-sm font-semibold text-pink-mjkt ${className}`}
    >
      <Icon aria-hidden="true" className="h-5 w-5" />
      {children}
    </div>
  );
}
