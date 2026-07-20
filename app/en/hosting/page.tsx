import { pageMetadata, renderPage } from "@/lib/prismic-page";

export const generateMetadata = () => pageMetadata("hosting", "en");

export default async function HostingPageEn() {
  return renderPage("hosting", "en");
}
