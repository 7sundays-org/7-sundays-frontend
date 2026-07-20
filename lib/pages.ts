import type { Lang } from "@/lib/i18n";

/**
 * Registry of the site's single-type pages. Each entry maps a route to its
 * Prismic custom type plus per-language metadata fallbacks (used only when the
 * corresponding Prismic field is empty).
 *
 * `path` is the canonical (Italian) path; the English route is the same path
 * under `/en`.
 */
export type PageKey =
  | "home"
  | "about"
  | "proprietario"
  | "hosting"
  | "property-manager";

export type PrismicPageType =
  | "home_page"
  | "about_page"
  | "proprietario_page"
  | "hosting_page"
  | "academy_page";

type Meta = { title: string; description: string };

export const PAGES: Record<
  PageKey,
  { type: PrismicPageType; path: string; h1: string; meta: Record<Lang, Meta> }
> = {
  home: {
    type: "home_page",
    path: "/",
    h1: "7 Sundays",
    meta: {
      it: {
        title: "7 Sundays",
        description: "Every detail. Every stay. Every Sunday.",
      },
      en: {
        title: "7 Sundays",
        description: "Every detail. Every stay. Every Sunday.",
      },
    },
  },
  about: {
    type: "about_page",
    path: "/about",
    h1: "About",
    meta: {
      it: {
        title: "About | 7 Sundays",
        description: "Chi siamo, cosa facciamo, perché diversi.",
      },
      en: {
        title: "About | 7 Sundays",
        description: "Who we are, what we do, why we're different.",
      },
    },
  },
  proprietario: {
    type: "proprietario_page",
    path: "/host",
    h1: "Proprietario",
    meta: {
      it: {
        title: "Proprietario | 7 Sundays",
        description: "Affida il tuo immobile a chi lo tratta come fosse suo.",
      },
      en: {
        title: "Owners | 7 Sundays",
        description:
          "Entrust your property to people who treat it as their own.",
      },
    },
  },
  hosting: {
    type: "hosting_page",
    path: "/hosting",
    h1: "Soggiorni",
    meta: {
      it: {
        title: "Soggiorni | 7 Sundays",
        description: "Soggiorni curati nei dettagli, ovunque tu sia.",
      },
      en: {
        title: "Stays | 7 Sundays",
        description: "Stays crafted down to the detail, wherever you are.",
      },
    },
  },
  "property-manager": {
    type: "academy_page",
    path: "/property-manager",
    h1: "Property Manager",
    meta: {
      it: {
        title: "Property Manager | 7 Sundays",
        description: "Il business dietro ogni grande soggiorno.",
      },
      en: {
        title: "Property Manager | 7 Sundays",
        description: "The business behind every great stay.",
      },
    },
  },
};
