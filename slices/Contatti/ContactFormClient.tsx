"use client";

import { FC, FormEvent, useState } from "react";
import { usePathname } from "next/navigation";
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
  },
  en: {
    name: "Full name *",
    email: "Email *",
    message: "Message",
    submit: "Send",
    submitting: "Sending…",
    success: "Message sent. We'll get back to you shortly.",
    error: "Something went wrong. Please try again.",
  },
} as const;

export const ContactFormClient: FC<{ submitLabel?: string | null }> = ({
  submitLabel,
}) => {
  const [status, setStatus] = useState<Status>("idle");
  const t = STRINGS[langFromPathname(usePathname())];

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(formData)),
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
      className="mx-auto flex w-full max-w-2xl flex-col gap-[42px]"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <input
          required
          name="name"
          type="text"
          placeholder={t.name}
          className="rounded-[6px] border border-lilac-ash bg-porcelain px-4 py-3 text-[14px] placeholder:text-placeholder focus:ring-2 focus:ring-ring/40 focus:outline-none"
        />
        <input
          required
          name="email"
          type="email"
          placeholder={t.email}
          className="rounded-[6px] border border-lilac-ash bg-porcelain px-4 py-3 text-[14px] placeholder:text-placeholder focus:ring-2 focus:ring-ring/40 focus:outline-none"
        />
      </div>
      <textarea
        name="message"
        placeholder={t.message}
        className="min-h-[120px] resize-none rounded-[6px] border border-lilac-ash bg-porcelain px-4 py-3 text-[14px] placeholder:text-placeholder focus:ring-2 focus:ring-ring/40 focus:outline-none"
      />

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
