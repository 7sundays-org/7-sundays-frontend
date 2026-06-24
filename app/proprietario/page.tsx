import type { Metadata } from "next";
import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("proprietario_page").catch(() => null);

  return {
    title: page?.data.meta_title || "Proprietario | 7 Sundays",
    description:
      page?.data.meta_description ||
      "Affida il tuo immobile a chi lo tratta come fosse suo.",
    openGraph: {
      images: page?.data.meta_image?.url
        ? [{ url: page.data.meta_image.url }]
        : [],
    },
  };
}

export default async function ProprietarioPage() {
  const client = createClient();
  const page = await client.getSingle("proprietario_page").catch(() => null);

  if (!page) {
    return (
      <main className="flex min-h-dvh flex-col items-center justify-center gap-4 p-8">
        <h1 className="text-4xl font-semibold">Proprietario</h1>
        <p className="text-sm text-muted-foreground">
          Crea il documento &ldquo;proprietario_page&rdquo; su Prismic.
        </p>
      </main>
    );
  }

  return <SliceZone slices={page.data.slices} components={components} />;
}
