"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { dict, langFromPathname, localizeHref } from "@/lib/i18n";
import { PRIVACY_POLICY_PATH } from "@/lib/pages";

/**
 * Short privacy notice shown above the submit button of every contact form
 * (first layer of the GDPR art. 13 information). Opens the full policy in a
 * new tab so the user doesn't lose what they typed.
 */
export function PrivacyNotice() {
  const lang = langFromPathname(usePathname());
  const t = dict[lang].privacyNotice;

  return (
    <p className="text-center text-xs text-foreground/60">
      {t.text}{" "}
      <Link
        href={localizeHref(PRIVACY_POLICY_PATH, lang)}
        target="_blank"
        className="underline transition-colors hover:text-foreground"
      >
        {t.link}
      </Link>
      .
    </p>
  );
}
