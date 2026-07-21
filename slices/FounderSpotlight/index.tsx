import { FC } from "react";
import type * as prismic from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

type FounderSpotlightSlice = prismic.SharedSlice<
  "founder_spotlight",
  prismic.SharedSliceVariation<
    "default",
    {
      image: prismic.ImageField;
      name: prismic.KeyTextField;
      role: prismic.KeyTextField;
      story: prismic.RichTextField;
    },
    never
  >
>;

export type FounderSpotlightProps = SliceComponentProps<FounderSpotlightSlice>;

const FounderSpotlight: FC<FounderSpotlightProps> = ({ slice }) => {
  const { image, name, role, story } = slice.primary;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full bg-white px-6 py-16 md:px-[90px] md:py-24"
    >
      <div className="flex flex-col gap-10 md:flex-row md:items-center md:gap-[10px]">
        {image?.url && (
          <div className="relative aspect-[892/988] w-full shrink-0 overflow-hidden rounded-[16px] bg-neutral-200 md:w-[45%]">
            <PrismicNextImage
              field={image}
              fill
              fallbackAlt=""
              className="object-cover"
            />
          </div>
        )}

        <div className="flex flex-1 flex-col gap-[45px] md:px-[90px]">
          {name && (
            <h2 className="font-serif text-[2.75rem] leading-[1.04] font-extrabold tracking-[-0.02em] text-primary md:text-[60px]">
              {name}
            </h2>
          )}
          {role && (
            <span className="text-button text-brand-primary uppercase">
              {role}
            </span>
          )}
          {story && (
            <div className="flex max-w-[586px] flex-col gap-6 font-sans text-[1.5rem] leading-snug font-medium text-foreground md:text-[30px] md:leading-[42px]">
              <PrismicRichText field={story} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FounderSpotlight;
