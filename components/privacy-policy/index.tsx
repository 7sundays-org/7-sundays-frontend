import type { Metadata } from "next";
import { localizeHref, type Lang } from "@/lib/i18n";
import { PRIVACY_POLICY_PATH } from "@/lib/pages";
import { PrivacyPolicyIt } from "./it";
import { PrivacyPolicyEn } from "./en";

/** Per-language copy around the policy text. Update `updated` with the text. */
const COPY = {
  it: {
    subtitle:
      "Informativa sul trattamento dei dati personali ai sensi dell'art. 13 del Regolamento (UE) 2016/679",
    updated: "Ultimo aggiornamento: 24 novembre 2026",
    description:
      "Come 7 Sundays tratta i dati personali di chi visita il sito.",
    Content: PrivacyPolicyIt,
  },
  en: {
    subtitle:
      "Information on the processing of personal data pursuant to Article 13 of Regulation (EU) 2016/679",
    updated: "Last updated: 24 November 2026",
    description: "How 7 Sundays processes the personal data of its visitors.",
    Content: PrivacyPolicyEn,
  },
} as const;

export function privacyPolicyMetadata(lang: Lang): Metadata {
  return {
    title: "Privacy Policy | 7 Sundays",
    description: COPY[lang].description,
    alternates: {
      canonical: localizeHref(PRIVACY_POLICY_PATH, lang),
      languages: {
        it: PRIVACY_POLICY_PATH,
        en: localizeHref(PRIVACY_POLICY_PATH, "en"),
      },
    },
  };
}

export function PrivacyPolicy({ lang }: { lang: Lang }) {
  const { subtitle, updated, Content } = COPY[lang];

  return (
    <main className="w-full bg-white px-6 pt-40 pb-20 md:px-[90px] md:pt-52 md:pb-28">
      <article className="mx-auto max-w-3xl">
        <header className="flex flex-col gap-4">
          <h1 className="text-h4 text-primary md:text-h1">Privacy Policy</h1>
          <p className="text-subtitle text-foreground">{subtitle}</p>
          <p className="text-sm text-foreground/60">{updated}</p>
        </header>

        {/* The policy text is plain HTML so it can be swapped for the
            lawyer-approved version without touching the styling. */}
        <div className="mt-12 flex flex-col gap-10 text-base leading-relaxed text-foreground/80 [&_a]:underline [&_a:hover]:text-foreground [&_h2]:mb-3 [&_h2]:text-body-title [&_h2]:text-foreground [&_li]:pl-1 [&_p+p]:mt-3 [&_p+ul]:mt-3 [&_strong]:font-semibold [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_ul+p]:mt-3">
          <Content />
        </div>
      </article>
    </main>
  );
}
