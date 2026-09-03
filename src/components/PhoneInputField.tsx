import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useLang } from "@/lib/i18n";

type PhoneInputFieldProps = {
  value: string;
  onChange: (fullNumber: string, countryData: CountryData) => void;
  placeholder?: string;
  hasError?: boolean;
};

export type CountryData = {
  name: string;
  dialCode: string;
  countryCode: string; // ISO 3166-1 alpha-2, e.g. "ae"
  format?: string;
};

const LANG_TO_LOCALE: Record<string, string> = {
  pt: "pt-BR",
  en: "en",
  es: "es",
};

export const PhoneInputField = ({
  value,
  onChange,
  placeholder,
  hasError,
}: PhoneInputFieldProps) => {
  const lang = useLang();

  return (
    <div className="phone-input-wrapper w-full">
      <PhoneInput
        country={"ae"}
        preferredCountries={["ae", "us", "br", "es", "pt", "gb"]}
        inputProps={{
          name: "phone",
          required: true,
          autoFocus: false,
        }}
        value={value}
        onChange={(phone, country) =>
          onChange(phone as string, country as unknown as CountryData)
        }
        placeholder={placeholder}
        inputClass="phone-input-field"
        buttonClass="phone-input-flag-btn"
        dropdownClass="phone-input-dropdown"
        containerClass={`phone-input-container${hasError ? " phone-input-container--error" : ""}`}
        // @ts-expect-error locale prop exists at runtime
        locale={LANG_TO_LOCALE[lang] ?? "en"}
      />
    </div>
  );
};

export default PhoneInputField;
