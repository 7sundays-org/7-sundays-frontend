import { COMPANY } from "@/lib/company";
import { SITE_URL } from "@/lib/pages";

const ORGANIZATION_ID = `${SITE_URL}/#organization`;

/** Renders a JSON-LD block. `<` is escaped so content can't close the tag. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

/** Site-wide Organization + WebSite structured data (rendered in the layout). */
export function SiteStructuredData() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization",
            "@id": ORGANIZATION_ID,
            name: "7Sundays",
            legalName: COMPANY.name,
            url: SITE_URL,
            vatID: `IT${COMPANY.vatNumber}`,
            address: {
              "@type": "PostalAddress",
              streetAddress: COMPANY.registeredOffice.street,
              postalCode: COMPANY.registeredOffice.postalCode,
              addressLocality: COMPANY.registeredOffice.city,
              addressRegion: COMPANY.registeredOffice.province,
              addressCountry: "IT",
            },
            email: COMPANY.email,
            telephone: COMPANY.phone,
            sameAs: COMPANY.socials,
          },
          {
            "@type": "WebSite",
            "@id": `${SITE_URL}/#website`,
            name: "7 Sundays",
            url: SITE_URL,
            inLanguage: ["it-IT", "en-US"],
            publisher: { "@id": ORGANIZATION_ID },
          },
        ],
      }}
    />
  );
}
