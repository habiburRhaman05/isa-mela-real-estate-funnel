import { Check } from "lucide-react";

type FormSuccessProps = {
  title: string;
  subtitle?: string;
};

/** Inline confirmation shown in place of a form right after a successful submit. */
export const FormSuccess = ({ title, subtitle }: FormSuccessProps) => (
  <div className="w-full flex flex-col items-center text-center gap-4 py-10 animate-in fade-in zoom-in-95 duration-300">
    <span className="w-14 h-14 rounded-full bg-[#7B5EA7] flex items-center justify-center">
      <Check className="w-7 h-7 text-white" strokeWidth={2.5} />
    </span>
    <p className="font-display text-xl text-[#1a1a18] leading-snug max-w-xs">
      {title}
    </p>
    {subtitle && <p className="text-sm text-[#8a847c]">{subtitle}</p>}
  </div>
);

export default FormSuccess;
