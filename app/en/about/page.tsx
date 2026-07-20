import { pageMetadata, renderPage } from "@/lib/prismic-page";

export const generateMetadata = () => pageMetadata("about", "en");

export default async function AboutPageEn() {
  return renderPage("about", "en");
}
