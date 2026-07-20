import { pageMetadata, renderPage } from "@/lib/prismic-page";

export const generateMetadata = () => pageMetadata("home", "en");

export default async function HomePageEn() {
  return renderPage("home", "en");
}
