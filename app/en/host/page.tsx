import { pageMetadata, renderPage } from "@/lib/prismic-page";

export const generateMetadata = () => pageMetadata("proprietario", "en");

export default async function ProprietarioPageEn() {
  return renderPage("proprietario", "en");
}
