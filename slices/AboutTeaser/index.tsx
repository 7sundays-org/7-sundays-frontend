import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { Button } from "@/components/ui/button";

export type AboutTeaserProps = SliceComponentProps<Content.AboutTeaserSlice>;

const AboutTeaser: FC<AboutTeaserProps> = ({ slice }) => {
  const { eyebrow, title, image, cta_text, cta_link } = slice.primary;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full bg-white px-6 pt-4 pb-20 md:px-[90px] md:pt-[16px] md:pb-[120px]"
    >
      <div className="flex flex-col gap-10">
        {image?.url && (
          <div className="relative aspect-[16/7] w-full overflow-hidden rounded-[16px] bg-neutral-200">
            <PrismicNextImage
              field={image}
              fill
              fallbackAlt=""
              className="object-cover"
            />
          </div>
        )}

        {/* Riga testo: blocco "CHI SIAMO + titolo" a sinistra, CTA a destra,
            allineati in alto (flex-start) */}
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-10">
          <div className="flex flex-col">
            {eyebrow && (
              <span className="font-sans text-[30px] leading-[58px] font-semibold tracking-[0.05em] text-blue-ink italic">
                {eyebrow}
              </span>
            )}
            {title && (
              <h2 className="font-sans text-[55px] leading-[58px] font-extrabold text-blue-ink">
                <PrismicRichText
                  field={title}
                  components={{
                    paragraph: ({ children }) => <>{children}</>,
                  }}
                />
              </h2>
            )}
          </div>

          {cta_link && (
            <Button
              asChild
              variant="primary"
              className="h-[58px] w-fit shrink-0 leading-[58px] tracking-[0.03em] text-blue-ink"
            >
              <PrismicNextLink field={cta_link}>
                {cta_text || "Conosciamoci"}
              </PrismicNextLink>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutTeaser;
