import type { Metadata } from "next";
import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("about_page").catch(() => null);

  return {
    title: page?.data.meta_title || "About | 7 Sundays",
    description:
      page?.data.meta_description ||
      "Chi siamo, cosa facciamo, perché diversi.",
    openGraph: {
      images: page?.data.meta_image?.url
        ? [{ url: page.data.meta_image.url }]
        : [],
    },
  };
}

export default async function AboutPage() {
  const client = createClient();
  const page = await client.getSingle("about_page").catch(() => null);

  if (!page) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
        <h1 className="text-4xl font-semibold">About</h1>
        <p className="text-sm text-muted-foreground">
          Crea il documento &ldquo;about_page&rdquo; su Prismic.
        </p>
      </main>
    );
  }

  return <SliceZone slices={page.data.slices} components={components} />;
}
