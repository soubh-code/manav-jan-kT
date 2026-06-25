import type { LucideIcon } from "lucide-react";
import Badge from "./Badge";

type SectionTagProps = {
  icon: LucideIcon;
  children: React.ReactNode;
};

export default function SectionTag({ icon, children }: SectionTagProps) {
  return (
    <div className="mb-7 flex items-center justify-center gap-5">
      <span className="hidden h-px w-28 border-t border-dotted border-blue-mjkt sm:block" />
      <Badge icon={icon}>{children}</Badge>
      <span className="hidden h-px w-28 border-t border-dotted border-blue-mjkt sm:block" />
    </div>
  );
}
