"use client";

import { FC, useState } from "react";
import { usePathname } from "next/navigation";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { langFromPathname } from "@/lib/i18n";

type Status = "idle" | "submitting" | "success" | "error";

const ROLE_OPTIONS = {
  it: [
    { value: "proprietario", label: "Proprietario di un immobile" },
    { value: "ospite", label: "Ospite" },
    { value: "altro", label: "Altro" },
  ],
  en: [
    { value: "proprietario", label: "Property owner" },
    { value: "ospite", label: "Guest" },
    { value: "altro", label: "Other" },
  ],
} as const;

const STRINGS = {
  it: {
    name: "Nome *",
    email: "Email *",
    role: "Sei un *",
    message: "Come possiamo aiutarti?",
    submit: "Invia",
    submitting: "Invio…",
    success: "Messaggio inviato. Ti ricontatteremo a breve.",
    error: "Qualcosa è andato storto. Riprova.",
    errors: {
      name: "Inserisci il tuo nome (min. 2 caratteri)",
      email: "Inserisci un'email valida",
      role: "Seleziona un'opzione",
    },
  },
  en: {
    name: "Name *",
    email: "Email *",
    role: "You are a *",
    message: "How can we help you?",
    submit: "Send",
    submitting: "Sending…",
    success: "Message sent. We'll get back to you shortly.",
    error: "Something went wrong. Please try again.",
    errors: {
      name: "Please enter your name (min. 2 characters)",
      email: "Please enter a valid email",
      role: "Please select an option",
    },
  },
} as const;

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  role: z.enum(["proprietario", "ospite", "altro"]),
  message: z.string().optional(),
});

type FieldErrors = Partial<Record<keyof z.infer<typeof schema>, string>>;

const inputClass =
  "w-full rounded-[6px] border border-lilac-ash bg-porcelain px-4 py-3 text-[14px] placeholder:text-placeholder focus:ring-2 focus:ring-ring/40 focus:outline-none";
const errorClass = "mt-1 text-xs text-red-600";

export const AboutFormClient: FC<{ submitLabel?: string | null }> = ({
  submitLabel,
}) => {
  const [status, setStatus] = useState<Status>("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [roleSelected, setRoleSelected] = useState(false);
  const lang = langFromPathname(usePathname());
  const t = STRINGS[lang];
  const roleOptions = ROLE_OPTIONS[lang];

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFieldErrors({});

    const formData = new FormData(e.currentTarget);
    const raw = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      role: formData.get("role") as string,
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
        body: JSON.stringify({ ...result.data, form: "about" }),
        headers: { "Content-Type": "application/json" },
      });
      setStatus(res.ok ? "success" : "error");
      if (res.ok) e.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="mx-auto flex w-full max-w-2xl flex-col gap-[42px]"
    >
      <div className="grid gap-4 md:grid-cols-3">
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
        <div>
          <div className="relative">
            <select
              name="role"
              defaultValue=""
              onChange={() => setRoleSelected(true)}
              className={`${inputClass} appearance-none pr-10 ${roleSelected ? "text-foreground" : "text-placeholder"}`}
            >
              <option value="" disabled>
                {t.role}
              </option>
              {roleOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-placeholder">
              &#8964;
            </span>
          </div>
          {fieldErrors.role && <p className={errorClass}>{fieldErrors.role}</p>}
        </div>
      </div>

      <div>
        <textarea
          name="message"
          placeholder={t.message}
          className={`${inputClass} min-h-[120px] resize-none`}
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
