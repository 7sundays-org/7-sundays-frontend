import { pageMetadata, renderPage } from "@/lib/prismic-page";

export const generateMetadata = () => pageMetadata("proprietario", "it");

export default async function ProprietarioPage() {
  return renderPage("proprietario", "it");
}
