import { FC } from "react";
import type * as prismic from "@prismicio/client";
import { isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { Button } from "@/components/ui/button";
import { FaqAccordion } from "./FaqAccordion";


type FaqItem = {
  question: prismic.KeyTextField;
  answer: prismic.RichTextField;
};

type FaqSlice = prismic.SharedSlice<
  "faq",
  prismic.SharedSliceVariation<
    "default",
    {
      title: prismic.RichTextField;
      items: prismic.GroupField<FaqItem>;
      cta_title: prismic.RichTextField;
      cta_label: prismic.KeyTextField;
      cta_link: prismic.LinkField;
      side_image: prismic.ImageField;
    },
    never
  >
>;

export type FaqProps = SliceComponentProps<FaqSlice>;

const Faq: FC<FaqProps> = ({ slice }) => {
  const { title, items, cta_title, cta_label, cta_link, side_image } =
    slice.primary;
  const faqs = (items ?? []).filter((i) => i.question);
  const hasSideImage = isFilled.image(side_image);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full border-t border-black/50 bg-white px-8 py-10 md:border-0 md:px-[90px] md:py-[120px]"
    >
      <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
        {/* FAQ column */}
        <div className="flex flex-1 flex-col gap-10">
          {title && (
            <h2 className="font-serif text-[1.875rem] leading-tight font-extrabold text-primary md:text-[60px]">
              <PrismicRichText
                field={title}
                components={{ paragraph: ({ children }) => <>{children}</> }}
              />
            </h2>
          )}

          <FaqAccordion items={faqs} />
        </div>

        {/* Immagine laterale (variante Host) — ha priorità sul box CTA */}
        {hasSideImage ? (
          <div className="lg:w-[38%] lg:shrink-0">
            <div className="relative aspect-[624/802] w-full max-h-[480px] overflow-hidden rounded-[16px] shadow-[-20px_0_40px_-12px_rgba(0,0,0,0.35)]">
              <PrismicNextImage
                field={side_image}
                fill
                fallbackAlt=""
                className="object-cover"
              />
            </div>
          </div>
        ) : (
          /* CTA box — bottom-aligned alla fine dell'accordion, più alto */
          (isFilled.richText(cta_title) || isFilled.link(cta_link)) && (
            <div className="flex flex-col lg:w-[38%] lg:shrink-0 lg:pt-[88px]">
              <div className="flex flex-col items-center justify-center gap-8 rounded-[32px] bg-dusty-rose px-10 py-16 text-center md:px-[92px] md:py-[140px]">
                {isFilled.richText(cta_title) && (
                  <div className="font-sans text-[1.5rem] leading-tight font-semibold text-primary md:text-[35px] md:leading-[42px]">
                    <PrismicRichText field={cta_title} />
                  </div>
                )}
                {isFilled.link(cta_link) && (
                  <Button asChild variant="primary">
                    <PrismicNextLink field={cta_link}>
                      {cta_label || "Contattaci"}
                    </PrismicNextLink>
                  </Button>
                )}
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Faq;
