import type { Metadata } from "next";
import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("home_page").catch(() => null);

  return {
    title: page?.data.meta_title || "7 Sundays",
    description:
      page?.data.meta_description || "Every detail. Every stay. Every Sunday.",
    openGraph: {
      images: page?.data.meta_image?.url
        ? [{ url: page.data.meta_image.url }]
        : [],
    },
  };
}

export default async function HomePage() {
  const client = createClient();
  const page = await client.getSingle("home_page").catch(() => null);

  if (!page) {
    return (
      <main className="flex min-h-[100vh] flex-col items-center justify-center gap-4 p-8 bg-white">
        <h1 className="text-4xl font-semibold">7 Sundays</h1>
        <p className="text-muted-foreground">
          Every detail. Every stay. Every Sunday.
        </p>
      </main>
    );
  }

  return <SliceZone slices={page.data.slices} components={components} />;
}
