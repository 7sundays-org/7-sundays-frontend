import { pageMetadata, renderPage } from "@/lib/prismic-page";

export const generateMetadata = () => pageMetadata("property-manager", "en");

export default async function PropertyManagerPageEn() {
  return renderPage("property-manager", "en");
}
