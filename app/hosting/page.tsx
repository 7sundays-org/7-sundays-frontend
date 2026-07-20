import { pageMetadata, renderPage } from "@/lib/prismic-page";

export const generateMetadata = () => pageMetadata("hosting", "it");

export default async function HostingPage() {
  return renderPage("hosting", "it");
}
