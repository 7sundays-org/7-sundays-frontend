"use client";

import { FC, useState } from "react";
import { usePathname } from "next/navigation";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { langFromPathname } from "@/lib/i18n";

type Status = "idle" | "submitting" | "success" | "error";

const ACCOMMODATION_OPTIONS = {
  it: [
    { value: "bilocale", label: "Bilocale" },
    { value: "trilocale", label: "Trilocale" },
    { value: "quadrilocale", label: "Quadrilocale" },
  ],
  en: [
    { value: "bilocale", label: "One-bedroom apartment" },
    { value: "trilocale", label: "Two-bedroom apartment" },
    { value: "quadrilocale", label: "Three-bedroom apartment" },
  ],
} as const;

const REASON_OPTIONS = {
  it: [
    { value: "lavoro", label: "Lavoro" },
    { value: "studio", label: "Studio" },
    { value: "trasferimento", label: "Imminente trasferimento" },
    { value: "vacanza", label: "Vacanza" },
  ],
  en: [
    { value: "lavoro", label: "Work" },
    { value: "studio", label: "Study" },
    { value: "trasferimento", label: "Upcoming relocation" },
    { value: "vacanza", label: "Holiday" },
  ],
} as const;

const STRINGS = {
  it: {
    name: "Nome e cognome *",
    email: "Email *",
    city: "In che città/zona stai cercando? *",
    dates: "Hai date flessibili oppure sono fisse? *",
    guests: "Quante persone sarete? *",
    accommodation: "Che tipo di alloggio stai cercando? *",
    reason: "Qual è il motivo del soggiorno? *",
    message: "Hai esigenze particolari?",
    submit: "Invia",
    submitting: "Invio…",
    success: "Messaggio inviato. Ti ricontatteremo a breve.",
    error: "Qualcosa è andato storto. Riprova.",
    errors: {
      name: "Inserisci il tuo nome (min. 2 caratteri)",
      email: "Inserisci un'email valida",
      city: "Indica la città o zona",
      dates: "Indica le tue date",
      guests: "Indica il numero di persone",
      accommodation: "Seleziona un tipo di alloggio",
      reason: "Seleziona il motivo del soggiorno",
    },
  },
  en: {
    name: "Full name *",
    email: "Email *",
    city: "Which city/area are you looking in? *",
    dates: "Do you have flexible or fixed dates? *",
    guests: "How many guests will there be? *",
    accommodation: "What type of accommodation are you looking for? *",
    reason: "What is the reason for your stay? *",
    message: "Do you have any special requirements?",
    submit: "Send",
    submitting: "Sending…",
    success: "Message sent. We'll get back to you shortly.",
    error: "Something went wrong. Please try again.",
    errors: {
      name: "Please enter your name (min. 2 characters)",
      email: "Please enter a valid email",
      city: "Please enter a city or area",
      dates: "Please indicate your dates",
      guests: "Please indicate the number of guests",
      accommodation: "Please select an accommodation type",
      reason: "Please select a reason for your stay",
    },
  },
} as const;

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  city: z.string().min(1),
  dates: z.string().min(1),
  guests: z.string().min(1),
  accommodation: z.enum(["bilocale", "trilocale", "quadrilocale"]),
  reason: z.enum(["lavoro", "studio", "trasferimento", "vacanza"]),
  message: z.string().optional(),
});

type FieldErrors = Partial<Record<keyof z.infer<typeof schema>, string>>;

const inputClass =
  "w-full rounded-[6px] border border-lilac-ash bg-porcelain px-4 py-3 text-[14px] placeholder:text-placeholder focus:ring-2 focus:ring-ring/40 focus:outline-none";
const errorClass = "mt-1 text-xs text-red-600";

function SelectField({
  name,
  placeholder,
  options,
}: {
  name: string;
  placeholder: string;
  options: readonly { value: string; label: string }[];
}) {
  const [selected, setSelected] = useState(false);
  return (
    <div className="relative">
      <select
        name={name}
        defaultValue=""
        onChange={() => setSelected(true)}
        className={`${inputClass} appearance-none pr-10 ${selected ? "text-foreground" : "text-placeholder"}`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-placeholder">
        &#8964;
      </span>
    </div>
  );
}

export const SoggiorniFormClient: FC<{ submitLabel?: string | null }> = ({
  submitLabel,
}) => {
  const [status, setStatus] = useState<Status>("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const lang = langFromPathname(usePathname());
  const t = STRINGS[lang];

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFieldErrors({});

    const formEl = e.currentTarget;
    const formData = new FormData(formEl);
    const raw = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      city: formData.get("city") as string,
      dates: formData.get("dates") as string,
      guests: formData.get("guests") as string,
      accommodation: formData.get("accommodation") as string,
      reason: formData.get("reason") as string,
      message: (formData.get("message") as string) || undefined,
    };

    const result = schema.safeParse(raw);
    if (!result.success) {
      const errs: FieldErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof FieldErrors;
        if (!errs[key]) errs[key] = t.errors[key as keyof typeof t.errors];
      }
      setFieldErrors(errs);
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({ ...result.data, form: "soggiorni" }),
        headers: { "Content-Type": "application/json" },
      });
      setStatus(res.ok ? "success" : "error");
      if (res.ok) formEl.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="mx-auto flex w-full max-w-4xl flex-col gap-4"
    >
      {/* Row 1: Nome + Email */}
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <input name="name" type="text" placeholder={t.name} className={inputClass} />
          {fieldErrors.name && <p className={errorClass}>{fieldErrors.name}</p>}
        </div>
        <div>
          <input name="email" type="email" placeholder={t.email} className={inputClass} />
          {fieldErrors.email && <p className={errorClass}>{fieldErrors.email}</p>}
        </div>
      </div>

      {/* Row 2: Città + Date + Persone */}
      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <input name="city" type="text" placeholder={t.city} className={inputClass} />
          {fieldErrors.city && <p className={errorClass}>{fieldErrors.city}</p>}
        </div>
        <div>
          <input name="dates" type="text" placeholder={t.dates} className={inputClass} />
          {fieldErrors.dates && <p className={errorClass}>{fieldErrors.dates}</p>}
        </div>
        <div>
          <input name="guests" type="text" placeholder={t.guests} className={inputClass} />
          {fieldErrors.guests && <p className={errorClass}>{fieldErrors.guests}</p>}
        </div>
      </div>

      {/* Row 3: Alloggio + Motivo */}
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <SelectField
            name="accommodation"
            placeholder={t.accommodation}
            options={ACCOMMODATION_OPTIONS[lang]}
          />
          {fieldErrors.accommodation && (
            <p className={errorClass}>{fieldErrors.accommodation}</p>
          )}
        </div>
        <div>
          <SelectField
            name="reason"
            placeholder={t.reason}
            options={REASON_OPTIONS[lang]}
          />
          {fieldErrors.reason && <p className={errorClass}>{fieldErrors.reason}</p>}
        </div>
      </div>

      {/* Row 4: Textarea */}
      <div>
        <textarea
          name="message"
          placeholder={t.message}
          className={`${inputClass} min-h-[160px] resize-none`}
        />
      </div>

      <div className="flex items-center justify-center gap-3 pt-2">
        <Button type="submit" variant="dark" disabled={status === "submitting"}>
          {status === "submitting" ? t.submitting : submitLabel || t.submit}
        </Button>
      </div>

      {status === "success" && (
        <p className="text-center text-sm text-green-700">{t.success}</p>
      )}
      {status === "error" && (
        <p className="text-center text-sm text-red-700">{t.error}</p>
      )}
    </form>
  );
};
