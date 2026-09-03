import { ISA_PHOTO_URL, SKYLINE_URL } from "@/lib/constants";

/** Isa's portrait blended over the Dubai skyline — reused on every split-layout page. */
export const PhotoCollage = () => (
  <div className="relative w-full max-w-sm lg:max-w-md xl:max-w-lg mx-auto overflow-hidden rounded-[2.5rem] shadow-[0_20px_60px_-25px_rgba(15,15,15,0.35)]">
    <img
      src={SKYLINE_URL}
      alt="Dubai skyline illustration"
      className="absolute inset-x-0 bottom-0 w-full h-auto opacity-90 pointer-events-none select-none"
    />
    <img
      src={ISA_PHOTO_URL}
      alt="Isa Melo, Dubai real estate consultant"
      className="relative z-10 w-full mx-auto object-contain rounded-[2.5rem]"
    />
  </div>
);

export default PhotoCollage;
