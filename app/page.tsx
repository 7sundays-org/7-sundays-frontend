import { pageMetadata, renderPage } from "@/lib/prismic-page";

export const generateMetadata = () => pageMetadata("home", "it");

export default async function HomePage() {
  return renderPage("home", "it");
}
