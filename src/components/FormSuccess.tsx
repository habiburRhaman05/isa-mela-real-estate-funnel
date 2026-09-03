import { CheckCircle2 } from "lucide-react";

type FormSuccessProps = {
  title: string;
  subtitle?: string;
};

/** Inline confirmation shown in place of a form right after a successful submit. */
export const FormSuccess = ({ title, subtitle }: FormSuccessProps) => (
  <div className="w-full flex flex-col items-center text-center gap-3 py-12 animate-in fade-in zoom-in-95 duration-300">
    <span className="w-14 h-14 rounded-full bg-[#7B5EA7]/10 flex items-center justify-center">
      <CheckCircle2 className="w-8 h-8 text-[#7B5EA7]" />
    </span>
    <p className="text-lg font-semibold text-[#0f0f0f]">{title}</p>
    {subtitle && <p className="text-sm text-[#6b6b6b]">{subtitle}</p>}
  </div>
);

export default FormSuccess;
