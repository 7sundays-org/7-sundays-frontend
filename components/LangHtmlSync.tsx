"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { langFromPathname } from "@/lib/i18n";

/**
 * Keeps `<html lang>` in sync with the active route. The root layout renders a
 * static `lang="it"`; on `/en` routes this updates it client-side (hreflang
 * alternates in each page's metadata cover the SEO signal).
 */
export function LangHtmlSync() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.lang = langFromPathname(pathname);
  }, [pathname]);

  return null;
}
