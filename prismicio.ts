import {
  type ClientConfig,
  createClient as baseCreateClient,
  type Route,
} from "@prismicio/client";
import { enableAutoPreviews } from "@prismicio/next";
import sm from "./slicemachine.config.json";

/**
 * The project's Prismic repository name.
 */
export const repositoryName =
  process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT || sm.repositoryName;

/**
 * A list of Route Resolver objects that define how a document's `url` field is resolved.
 *
 * {@link https://prismic.io/docs/route-resolver#route-resolver}
 */
// Locale-aware routes. Italian is the master locale (`it-it`) and is served at
// the root; English (`en-us`) is served under `/en`. The `lang`-scoped routes
// make Prismic resolve each document's `url` to the correct localized path.
const routes: Route[] = [
  // Italian (master locale) — no prefix.
  { type: "home_page", lang: "it-it", path: "/" },
  { type: "proprietario_page", lang: "it-it", path: "/host" },
  { type: "hosting_page", lang: "it-it", path: "/hosting" },
  { type: "about_page", lang: "it-it", path: "/about" },
  { type: "academy_page", lang: "it-it", path: "/property-manager" },
  // English — under /en.
  { type: "home_page", lang: "en-us", path: "/en" },
  { type: "proprietario_page", lang: "en-us", path: "/en/host" },
  { type: "hosting_page", lang: "en-us", path: "/en/hosting" },
  { type: "about_page", lang: "en-us", path: "/en/about" },
  { type: "academy_page", lang: "en-us", path: "/en/property-manager" },
];

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config - Configuration for the Prismic client.
 */
export const createClient = (config: ClientConfig = {}) => {
  const client = baseCreateClient(repositoryName, {
    routes,
    fetchOptions:
      process.env.NODE_ENV === "production"
        ? { next: { tags: ["prismic"] }, cache: "force-cache" }
        : { next: { revalidate: 5 } },
    ...config,
  });

  enableAutoPreviews({ client });

  return client;
};
