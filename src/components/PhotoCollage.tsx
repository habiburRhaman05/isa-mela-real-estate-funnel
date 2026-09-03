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
  <div className={cn("relative w-full max-w-[440px] mx-auto lg:mx-0", className)}>
    {/* Gold offset frame */}
 

    {/* Skyline watermark — now actually visible, sitting behind the frame */}


    <div className="relative overflow-hidden rounded-[2rem] bg-[#efe9df] shadow-[0_28px_60px_-30px_rgba(26,26,24,0.45)]">
      <img
        src={ISA_PHOTO_URL}
        alt="Isa Melo, Dubai real estate consultant"
        className={cn(
          "w-full object-cover object-top",
          size === "tall" ? "h-[480px] sm:h-[620px]" : "h-[380px] sm:h-[480px]",
        )}
      />
    </div>
  </div>
);

export default PhotoCollage;
