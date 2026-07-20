import { pageMetadata, renderPage } from "@/lib/prismic-page";

export const generateMetadata = () => pageMetadata("about", "it");

export default async function AboutPage() {
  return renderPage("about", "it");
}
