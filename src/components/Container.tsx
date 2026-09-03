import type { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

/**
 * The single horizontal rhythm for the whole site. Header, page body and
 * footer all render inside this so every page has ONE left edge instead of
 * the four different ones we had when each section picked its own max-width.
 */
export const Container = ({
  children,
  className,
  width = "default",
}: PropsWithChildren<{ className?: string; width?: "default" | "narrow" }>) => (
  <div
    className={cn(
      "w-full mx-auto px-5 sm:px-8",
      width === "narrow" ? "max-w-3xl" : "max-w-6xl",
      className,
    )}
  >
    {children}
  </div>
);

export default Container;
