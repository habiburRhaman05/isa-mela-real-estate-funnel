import type { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

/**
 * Elevated surface behind every form/quiz. White on the warm page ground
 * with a real border and shadow — the old #faf9f7-on-#ffffff card was a 1%
 * contrast difference, so it read as nothing at all.
 */
export const FunnelCard = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => (
  <div
    className={cn(
      "w-full bg-white border border-[#ece5d9] rounded-[1.75rem] shadow-[0_20px_50px_-30px_rgba(26,26,24,0.35)] p-6 sm:p-8",
      className,
    )}
  >
    {children}
  </div>
);

export default FunnelCard;
