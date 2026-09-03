import type { PropsWithChildren } from "react";

/**
 * Soft contained card behind every form/quiz column so it reads as a
 * deliberate module instead of floating loose on white. Restrained on
 * purpose: tint + hairline border + soft shadow, no gradients or glass.
 */
export const FunnelCard = ({ children }: PropsWithChildren) => (
  <div className="w-full bg-[#faf9f7] border border-[#7B5EA7]/15 rounded-[2rem] shadow-[0_10px_40px_-20px_rgba(15,15,15,0.18)] p-6 sm:p-8">
    {children}
  </div>
);

export default FunnelCard;
