import { pageMetadata, renderPage } from "@/lib/prismic-page";

export const generateMetadata = () => pageMetadata("property-manager", "it");

export default async function PropertyManagerPage() {
  return renderPage("property-manager", "it");
}
