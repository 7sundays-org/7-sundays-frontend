import { FC } from "react";
import type * as prismic from "@prismicio/client";
import { isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      className="w-full bg-white px-6 py-20 md:px-[90px] md:py-[120px]"
    >
      <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
        {/* FAQ column */}
        <div className="flex flex-1 flex-col gap-10">
          {title && (
            <h2 className="font-serif text-[2.75rem] leading-tight font-extrabold text-primary md:text-[70px]">
              <PrismicRichText
                field={title}
                components={{ paragraph: ({ children }) => <>{children}</> }}
              />
            </h2>
          )}

          <div className="flex flex-col">
            {faqs.map((item, i) => (
              <details key={i} className="group border-b border-black/15">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-body text-foreground marker:hidden [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <ChevronDown className="size-5 shrink-0 text-foreground/60 transition-transform duration-300 group-open:rotate-180" />
                </summary>
                {isFilled.richText(item.answer) && (
                  <div className="pb-5 text-body text-foreground/70">
                    <PrismicRichText field={item.answer} />
                  </div>
                )}
              </details>
            ))}
          </div>
        </div>

        {/* Immagine laterale (variante Host) — ha priorità sul box CTA */}
        {hasSideImage ? (
          <div className="lg:w-[38%] lg:shrink-0">
            <div className="relative aspect-[624/802] w-full shrink-0 overflow-hidden rounded-[8px]">
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
                  <div className="font-sans text-[35px] leading-[42px] font-semibold text-primary">
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
