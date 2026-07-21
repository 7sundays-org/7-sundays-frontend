"use client";

import { FC, useState } from "react";
import { usePathname } from "next/navigation";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { langFromPathname } from "@/lib/i18n";

type Status = "idle" | "submitting" | "success" | "error";

const STRINGS = {
  it: {
    name: "Nome e cognome *",
    email: "Email *",
    message: "Messaggio",
    submit: "Invia",
    submitting: "Invio…",
    success: "Messaggio inviato. Ti ricontatteremo a breve.",
    error: "Qualcosa è andato storto. Riprova.",
    errors: {
      name: "Inserisci il tuo nome (min. 2 caratteri)",
      email: "Inserisci un'email valida",
    },
  },
  en: {
    name: "Full name *",
    email: "Email *",
    message: "Message",
    submit: "Send",
    submitting: "Sending…",
    success: "Message sent. We'll get back to you shortly.",
    error: "Something went wrong. Please try again.",
    errors: {
      name: "Please enter your name (min. 2 characters)",
      email: "Please enter a valid email",
    },
  },
} as const;

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().optional(),
});

type FieldErrors = Partial<Record<keyof z.infer<typeof schema>, string>>;

const inputClass =
  "w-full rounded-[6px] border border-lilac-ash bg-porcelain px-4 py-3 text-[14px] placeholder:text-placeholder focus:ring-2 focus:ring-ring/40 focus:outline-none";
const errorClass = "mt-1 text-xs text-red-600";

export const ContactFormClient: FC<{ submitLabel?: string | null }> = ({
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
        body: JSON.stringify({ ...result.data, form: "contatti" }),
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
