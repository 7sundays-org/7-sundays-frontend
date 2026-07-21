import { FC } from "react";
import type * as prismic from "@prismicio/client";
import { isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

type BenefitCard = {
  title: prismic.KeyTextField;
  description: prismic.RichTextField;
};

type BenefitsGridSlice = prismic.SharedSlice<
  "benefits_grid",
  prismic.SharedSliceVariation<
    "default",
    {
      title: prismic.RichTextField;
      body: prismic.RichTextField;
      image: prismic.ImageField;
      cards: prismic.GroupField<BenefitCard>;
    },
    never
  >
>;

export type BenefitsGridProps = SliceComponentProps<BenefitsGridSlice>;

const BenefitsGrid: FC<BenefitsGridProps> = ({ slice }) => {
  const { title, body, image, cards } = slice.primary;
  const items = (cards ?? []).filter(
    (c) => c.title || isFilled.richText(c.description)
  );

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full bg-white px-6 py-[80px] md:px-[86px] md:py-[120px]"
    >
      <div className="flex flex-col gap-12 lg:flex-row lg:gap-[32px]">
        {/* Colonna sinistra: titolo + testo + immagine */}
        <div className="flex flex-col gap-10 lg:w-[427px] lg:shrink-0">
          <div className="flex flex-col gap-6">
            {isFilled.richText(title) && (
              <h2 className="font-sans text-[2.25rem] leading-tight font-extrabold text-primary md:text-[40px] md:leading-[48px]">
                <PrismicRichText
                  field={title}
                  components={{ paragraph: ({ children }) => <>{children}</> }}
                />
              </h2>
            )}
            {isFilled.richText(body) && (
              <div className="text-body text-primary/80">
                <PrismicRichText field={body} />
              </div>
            )}
          </div>

          {isFilled.image(image) && (
            <div className="relative aspect-[467/652] w-full overflow-hidden rounded-[8px]">
              <PrismicNextImage
                field={image}
                fill
                fallbackAlt=""
                className="object-cover"
              />
            </div>
          )}
        </div>

        {/* Colonna destra: griglia 2x2 di card */}
        {items.length > 0 && (
          <div className="grid flex-1 gap-[32px] sm:grid-cols-2">
            {items.map((card, i) => (
              <article
                key={i}
                className="flex min-h-[324px] flex-col gap-5 rounded-[16px] bg-porcelain p-8 shadow-[0_4px_4px_rgba(0,0,0,0.25)] md:min-h-[528px] md:p-10"
              >
                {card.title && (
                  <h3 className="font-sans text-[26px] leading-[40px] font-extrabold text-primary italic md:text-[35px]">
                    {card.title}
                  </h3>
                )}
                {isFilled.richText(card.description) && (
                  <div className="font-sans text-[18px] leading-[26px] text-primary/80">
                    <PrismicRichText field={card.description} />
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BenefitsGrid;
