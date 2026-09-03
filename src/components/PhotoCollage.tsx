import { ISA_PHOTO_URL, SKYLINE_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

type PhotoCollageProps = {
  className?: string;
  /** Portrait frame height. Kept capped so the image column ends level with
   *  the form column beside it instead of running hundreds of px past it. */
  size?: "default" | "tall";
};

/**
 * Isa's portrait in an editorial frame: a gold hairline offset behind the
 * image, the Dubai skyline showing as a soft watermark. The skyline used to
 * be layered *behind* an opaque portrait, so it never actually rendered.
 */
export const PhotoCollage = ({ className, size = "default" }: PhotoCollageProps) => (
  <div className={cn("relative w-full max-w-[400px] mx-auto lg:mx-0", className)}>
    {/* Gold offset frame */}
    <div
      aria-hidden="true"
      className="absolute -inset-2 sm:-inset-3 translate-x-3 translate-y-3 rounded-[2rem] border border-[#c9a961]/45 pointer-events-none"
    />

    {/* Skyline watermark — now actually visible, sitting behind the frame */}
    <img
      src={SKYLINE_URL}
      alt=""
      aria-hidden="true"
      className="absolute -bottom-8 -left-10 w-[135%] max-w-none opacity-[0.16] pointer-events-none select-none"
    />

    <div className="relative overflow-hidden rounded-[2rem] bg-[#efe9df] shadow-[0_28px_60px_-30px_rgba(26,26,24,0.45)]">
      <img
        src={ISA_PHOTO_URL}
        alt="Isa Melo, Dubai real estate consultant"
        className={cn(
          "w-full object-cover object-top",
          size === "tall" ? "h-[440px] sm:h-[560px]" : "h-[380px] sm:h-[480px]",
        )}
      />
    </div>
  </div>
);

export default PhotoCollage;
