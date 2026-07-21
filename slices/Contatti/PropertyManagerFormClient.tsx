"use client";

import { FC, useState } from "react";
import { usePathname } from "next/navigation";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { langFromPathname } from "@/lib/i18n";

type Status = "idle" | "submitting" | "success" | "error";

const CONSULTING_OPTIONS = {
  it: [
    { value: "mandati-gestione", label: "Mandati di gestione" },
    { value: "valutazione-immobiliare", label: "Valutazione immobiliare" },
    { value: "compliance-normativa", label: "Compliance e normativa" },
    { value: "revenue-management", label: "Revenue management" },
    { value: "canali-vendita", label: "Canali di vendita" },
    { value: "operations-ospitalita", label: "Operations e ospitalità" },
    { value: "corporate-management", label: "Corporate management" },
  ],
  en: [
    { value: "mandati-gestione", label: "Management mandates" },
    { value: "valutazione-immobiliare", label: "Property valuation" },
    { value: "compliance-normativa", label: "Compliance & regulations" },
    { value: "revenue-management", label: "Revenue management" },
    { value: "canali-vendita", label: "Sales channels" },
    { value: "operations-ospitalita", label: "Operations & hospitality" },
    { value: "corporate-management", label: "Corporate management" },
  ],
} as const;

const GOAL_OPTIONS = {
  it: [
    { value: "aumentare-occupazioni", label: "Aumentare le occupazioni" },
    { value: "ottimizzare-ricavi", label: "Ottimizzare i ricavi" },
    { value: "delegare-gestione", label: "Delegare completamente la gestione" },
    { value: "migliorare-ospiti", label: "Migliorare la qualità degli ospiti" },
    { value: "espandere-portfolio", label: "Espandere il portfolio" },
  ],
  en: [
    { value: "aumentare-occupazioni", label: "Increase occupancy" },
    { value: "ottimizzare-ricavi", label: "Optimise revenue" },
    { value: "delegare-gestione", label: "Fully delegate management" },
    { value: "migliorare-ospiti", label: "Improve guest quality" },
    { value: "espandere-portfolio", label: "Expand the portfolio" },
  ],
} as const;

const STRINGS = {
  it: {
    name: "Nome e cognome *",
    email: "Email *",
    consulting: "A che tipo di consulenza sei interessato? *",
    goal: "Qual è il tuo obiettivo principale? *",
    message: "Raccontaci brevemente la tua situazione",
    submit: "Invia",
    submitting: "Invio…",
    success: "Messaggio inviato. Ti ricontatteremo a breve.",
    error: "Qualcosa è andato storto. Riprova.",
    errors: {
      name: "Inserisci il tuo nome (min. 2 caratteri)",
      email: "Inserisci un'email valida",
      consulting: "Seleziona un tipo di consulenza",
      goal: "Seleziona un obiettivo",
    },
  },
  en: {
    name: "Full name *",
    email: "Email *",
    consulting: "What type of consulting are you interested in? *",
    goal: "What is your main goal? *",
    message: "Tell us briefly about your situation",
    submit: "Send",
    submitting: "Sending…",
    success: "Message sent. We'll get back to you shortly.",
    error: "Something went wrong. Please try again.",
    errors: {
      name: "Please enter your name (min. 2 characters)",
      email: "Please enter a valid email",
      consulting: "Please select a consulting type",
      goal: "Please select a goal",
    },
  },
} as const;

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  consulting: z.string().min(1),
  goal: z.string().min(1),
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

export const PropertyManagerFormClient: FC<{ submitLabel?: string | null }> = ({
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
      consulting: formData.get("consulting") as string,
      goal: formData.get("goal") as string,
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
        body: JSON.stringify({ ...result.data, form: "property-manager" }),
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
      className="mx-auto flex w-full max-w-2xl flex-col gap-4"
    >
      {/* Row 1: Nome + Email */}
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <input
            name="name"
            type="text"
            placeholder={t.name}
            className={inputClass}
          />
          {fieldErrors.name && <p className={errorClass}>{fieldErrors.name}</p>}
        </div>
        <div>
          <input
            name="email"
            type="email"
            placeholder={t.email}
            className={inputClass}
          />
          {fieldErrors.email && (
            <p className={errorClass}>{fieldErrors.email}</p>
          )}
        </div>
      </div>

      {/* Row 2: Consulenza + Obiettivo */}
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <SelectField
            name="consulting"
            placeholder={t.consulting}
            options={CONSULTING_OPTIONS[lang]}
          />
          {fieldErrors.consulting && (
            <p className={errorClass}>{fieldErrors.consulting}</p>
          )}
        </div>
        <div>
          <SelectField
            name="goal"
            placeholder={t.goal}
            options={GOAL_OPTIONS[lang]}
          />
          {fieldErrors.goal && (
            <p className={errorClass}>{fieldErrors.goal}</p>
          )}
        </div>
      </div>

      {/* Row 3: Textarea */}
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
