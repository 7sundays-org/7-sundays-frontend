import type { MetadataRoute } from "next";
import { LANGS, localizeHref } from "@/lib/i18n";
import { getPage } from "@/lib/prismic-page";
import {
  PAGES,
  PRIVACY_POLICY_PATH,
  SITE_URL,
  type PageKey,
} from "@/lib/pages";

/** Absolute URLs of a canonical path in every language (hreflang pairs). */
function languageUrls(path: string) {
  return Object.fromEntries(
    LANGS.map((lang) => [lang, `${SITE_URL}${localizeHref(path, lang)}`])
  );
}

/**
 * Generated from the page registry, so new Prismic single types show up once
 * they're added to `PAGES`. `lastModified` is the Prismic publication date of
 * each language version.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const prismicEntries = await Promise.all(
    (Object.keys(PAGES) as PageKey[]).flatMap((key) =>
      LANGS.map(async (lang) => {
        const page = await getPage(key, lang);
        const { path } = PAGES[key];
        return {
          url: `${SITE_URL}${localizeHref(path, lang)}`,
          lastModified: page?.last_publication_date,
          alternates: { languages: languageUrls(path) },
        };
      })
    )
  );

  const staticEntries = LANGS.map((lang) => ({
    url: `${SITE_URL}${localizeHref(PRIVACY_POLICY_PATH, lang)}`,
    alternates: { languages: languageUrls(PRIVACY_POLICY_PATH) },
  }));

  return [...prismicEntries, ...staticEntries];
}
