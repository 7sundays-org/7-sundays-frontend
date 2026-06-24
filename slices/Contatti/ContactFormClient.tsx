"use client";

import { FC, FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";

type Status = "idle" | "submitting" | "success" | "error";

export const ContactFormClient: FC<{ submitLabel?: string | null }> = ({
  submitLabel,
}) => {
  const [status, setStatus] = useState<Status>("idle");

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
      className="mx-auto flex w-full max-w-2xl flex-col gap-4"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <input
          required
          name="name"
          type="text"
          placeholder="Nome e cognome *"
          className="rounded-[6px] border border-lilac-ash bg-porcelain px-4 py-3 text-[14px] placeholder:text-placeholder focus:ring-2 focus:ring-ring/40 focus:outline-none"
        />
        <input
          required
          name="email"
          type="email"
          placeholder="Email *"
          className="rounded-[6px] border border-lilac-ash bg-porcelain px-4 py-3 text-[14px] placeholder:text-placeholder focus:ring-2 focus:ring-ring/40 focus:outline-none"
        />
      </div>
      <textarea
        name="message"
        placeholder="Messaggio"
        className="min-h-[120px] resize-none rounded-[6px] border border-lilac-ash bg-porcelain px-4 py-3 text-[14px] placeholder:text-placeholder focus:ring-2 focus:ring-ring/40 focus:outline-none"
      />

      <div className="flex items-center justify-center gap-3 pt-2">
        <Button type="submit" variant="dark" disabled={status === "submitting"}>
          {status === "submitting" ? "Invio…" : submitLabel || "Invia"}
        </Button>
      </div>

      {status === "success" && (
        <p className="text-center text-sm text-green-700">
          Messaggio inviato. Ti ricontatteremo a breve.
        </p>
      )}
      {status === "error" && (
        <p className="text-center text-sm text-red-700">
          Qualcosa è andato storto. Riprova.
        </p>
      )}
    </form>
  );
};
