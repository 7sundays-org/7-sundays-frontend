"use client";

import { FC, useState } from "react";
import { usePathname } from "next/navigation";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { langFromPathname } from "@/lib/i18n";

type Status = "idle" | "submitting" | "success" | "error";

const PROPERTY_OPTIONS = {
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

const STRINGS = {
  it: {
    name: "Nome e cognome *",
    email: "Email *",
    city: "In quale città e zona si trova l'immobile? *",
    propertyType: "Che tipologia di immobile possiedi? *",
    sqm: "Quanti mq è grande? *",
    beds: "Quanti posti letto può ospitare? *",
    photos: "Link WeTransfer o Google Drive con le foto *",
    photosPlaceholder: "https://wetransfer.com/... oppure https://drive.google.com/...",
    message: "Messaggio",
    submit: "Invia",
    submitting: "Invio…",
    success: "Messaggio inviato. Ti ricontatteremo a breve.",
    error: "Qualcosa è andato storto. Riprova.",
    errors: {
      name: "Inserisci il tuo nome (min. 2 caratteri)",
      email: "Inserisci un'email valida",
      city: "Indica la città e zona dell'immobile",
      propertyType: "Seleziona la tipologia di immobile",
      sqm: "Indica la metratura",
      beds: "Indica il numero di posti letto",
      photos: "Inserisci un link WeTransfer o Google Drive valido",
    },
  },
  en: {
    name: "Full name *",
    email: "Email *",
    city: "In which city and area is the property located? *",
    propertyType: "What type of property do you own? *",
    sqm: "How large is it (sqm)? *",
    beds: "How many guests can it accommodate? *",
    photos: "WeTransfer or Google Drive link with photos *",
    photosPlaceholder: "https://wetransfer.com/... or https://drive.google.com/...",
    message: "Message",
    submit: "Send",
    submitting: "Sending…",
    success: "Message sent. We'll get back to you shortly.",
    error: "Something went wrong. Please try again.",
    errors: {
      name: "Please enter your name (min. 2 characters)",
      email: "Please enter a valid email",
      city: "Please enter the property city and area",
      propertyType: "Please select a property type",
      sqm: "Please enter the property size",
      beds: "Please enter the number of beds",
      photos: "Please enter a valid WeTransfer or Google Drive link",
    },
  },
} as const;

const isValidPhotosLink = (url: string) => {
  try {
    const { hostname } = new URL(url);
    return (
      hostname === "wetransfer.com" ||
      hostname.endsWith(".wetransfer.com") ||
      hostname === "drive.google.com" ||
      hostname === "photos.google.com"
    );
  } catch {
    return false;
  }
};

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  city: z.string().min(1),
  propertyType: z.enum(["bilocale", "trilocale", "quadrilocale"]),
  sqm: z.string().min(1),
  beds: z.string().min(1),
  photos: z.string().refine(isValidPhotosLink),
  message: z.string().optional(),
});

type FieldErrors = Partial<Record<keyof z.infer<typeof schema>, string>>;

const inputClass =
  "w-full rounded-[6px] border border-lilac-ash bg-porcelain px-4 py-3 text-[14px] placeholder:text-placeholder focus:ring-2 focus:ring-ring/40 focus:outline-none";
const errorClass = "mt-1 text-xs text-red-600";

export const ProprietarioFormClient: FC<{ submitLabel?: string | null }> = ({
  submitLabel,
}) => {
  const [status, setStatus] = useState<Status>("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [propertySelected, setPropertySelected] = useState(false);
  const lang = langFromPathname(usePathname());
  const t = STRINGS[lang];
  const propertyOptions = PROPERTY_OPTIONS[lang];

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFieldErrors({});

    const formEl = e.currentTarget;
    const fd = new FormData(formEl);

    const raw = {
      name: fd.get("name") as string,
      email: fd.get("email") as string,
      city: fd.get("city") as string,
      propertyType: fd.get("propertyType") as string,
      sqm: fd.get("sqm") as string,
      beds: fd.get("beds") as string,
      photos: fd.get("photos") as string,
      message: (fd.get("message") as string) || undefined,
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
        body: JSON.stringify({ ...result.data, form: "proprietario" }),
        headers: { "Content-Type": "application/json" },
      });
      setStatus(res.ok ? "success" : "error");
      if (res.ok) {
        formEl.reset();
        setPropertySelected(false);
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="mx-auto flex w-full max-w-4xl flex-col gap-[42px]"
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

      {/* Row 2: Città + Tipologia */}
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <input name="city" type="text" placeholder={t.city} className={inputClass} />
          {fieldErrors.city && <p className={errorClass}>{fieldErrors.city}</p>}
        </div>
        <div>
          <div className="relative">
            <select
              name="propertyType"
              defaultValue=""
              onChange={() => setPropertySelected(true)}
              className={`${inputClass} appearance-none pr-10 ${propertySelected ? "text-foreground" : "text-placeholder"}`}
            >
              <option value="" disabled>{t.propertyType}</option>
              {propertyOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-placeholder">
              &#8964;
            </span>
          </div>
          {fieldErrors.propertyType && (
            <p className={errorClass}>{fieldErrors.propertyType}</p>
          )}
        </div>
      </div>

      {/* Row 3: mq + posti letto */}
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <input name="sqm" type="text" placeholder={t.sqm} className={inputClass} />
          {fieldErrors.sqm && <p className={errorClass}>{fieldErrors.sqm}</p>}
        </div>
        <div>
          <input name="beds" type="text" placeholder={t.beds} className={inputClass} />
          {fieldErrors.beds && <p className={errorClass}>{fieldErrors.beds}</p>}
        </div>
      </div>

      {/* Link foto */}
      <div>
        <label className="mb-1 block text-[13px] text-foreground/70">{t.photos}</label>
        <input
          name="photos"
          type="url"
          placeholder={t.photosPlaceholder}
          className={inputClass}
        />
        {fieldErrors.photos && <p className={errorClass}>{fieldErrors.photos}</p>}
      </div>

      {/* Textarea */}
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
