/**
 * Bilingual (IT / EN) configuration.
 *
 * Italian is the default language and is served without a URL prefix (root).
 * English is served under `/en`. On Prismic these map to the `it-it` (master)
 * and `en-us` locales respectively.
 */

export const LANGS = ["it", "en"] as const;
export type Lang = (typeof LANGS)[number];

/** The default language, served without a URL prefix. */
export const DEFAULT_LANG: Lang = "it";

/** Maps a URL language to its Prismic locale code. */
export const PRISMIC_LOCALE: Record<Lang, string> = {
  it: "it-it",
  en: "en-us",
};

/** Derives the active language from a pathname (client-side helper). */
export function langFromPathname(pathname: string): Lang {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "it";
}

/** Strips the `/en` prefix to get the canonical (Italian) path. */
function canonicalPath(pathname: string): string {
  if (pathname === "/en") return "/";
  if (pathname.startsWith("/en/")) return pathname.slice(3);
  return pathname;
}

/**
 * Prefixes a root-relative href for the given language. The default language
 * (Italian) is unprefixed; English lives under `/en`. External links,
 * `mailto:`, `tel:` and bare `#anchor` hrefs are returned untouched.
 */
export function localizeHref(href: string, lang: Lang): string {
  if (lang === DEFAULT_LANG) return href;
  if (!href.startsWith("/")) return href; // external, mailto:, tel:, #anchor
  if (href === "/") return "/en";
  if (href.startsWith("/#")) return `/en${href.slice(1)}`; // "/#contatti" -> "/en#contatti"
  return `/en${href}`;
}

/** Builds the href of the current page in `to` (used by the language switcher). */
export function switchLangHref(pathname: string, to: Lang): string {
  return localizeHref(canonicalPath(pathname), to);
}

/** Static UI copy that does not live in Prismic (site chrome). */
export const dict = {
  it: {
    nav: {
      home: "Home",
      about: "About",
      owners: "Proprietari",
      pm: "Property Manager",
      stays: "Soggiorni",
    },
    menu: { open: "Apri menu", close: "Chiudi menu" },
    footer: {
      about: "Chi siamo",
      owners: "Proprietari",
      pm: "Property manager",
      stays: "Soggiorni",
      contact: "Contatti",
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      owners: "Owners",
      pm: "Property Manager",
      stays: "Stays",
    },
    menu: { open: "Open menu", close: "Close menu" },
    footer: {
      about: "About us",
      owners: "Owners",
      pm: "Property manager",
      stays: "Stays",
      contact: "Contact",
    },
  },
} as const;
