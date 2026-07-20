import type { Metadata } from "next";
import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { PRISMIC_LOCALE, localizeHref, type Lang } from "@/lib/i18n";
import { PAGES, type PageKey } from "@/lib/pages";

/**
 * Fetches a single-type page in the requested language. During the IT→it-it
 * migration (or before a given page has been translated into English) the
 * requested locale may not exist yet, so we fall back to the master document
 * to avoid rendering an empty page.
 */
async function getPage(key: PageKey, lang: Lang) {
  const client = createClient();
  const { type } = PAGES[key];
  const page = await client
    .getSingle(type, { lang: PRISMIC_LOCALE[lang] })
    .catch(() => null);
  if (page) return page;
  return client.getSingle(type).catch(() => null);
}

/** Builds `<head>` metadata (title, description, hreflang alternates, OG image). */
export async function pageMetadata(
  key: PageKey,
  lang: Lang
): Promise<Metadata> {
  const cfg = PAGES[key];
  const page = await getPage(key, lang);
  const fallback = cfg.meta[lang];

  return {
    title: page?.data.meta_title || fallback.title,
    description: page?.data.meta_description || fallback.description,
    alternates: {
      canonical: localizeHref(cfg.path, lang),
      languages: {
        it: cfg.path,
        en: localizeHref(cfg.path, "en"),
      },
    },
    openGraph: {
      images: page?.data.meta_image?.url
        ? [{ url: page.data.meta_image.url }]
        : [],
    },
  };
}

/** Renders a page's Prismic slices (with a graceful fallback when missing). */
export async function renderPage(key: PageKey, lang: Lang) {
  const page = await getPage(key, lang);

  if (!page) {
    return (
      <main className="flex min-h-dvh flex-col items-center justify-center gap-4 p-8">
        <h1 className="text-4xl font-semibold">{PAGES[key].h1}</h1>
      </main>
    );
  }

  return <SliceZone slices={page.data.slices} components={components} />;
}
