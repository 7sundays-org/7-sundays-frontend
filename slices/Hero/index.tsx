import { FC, Fragment } from "react";
import type * as prismic from "@prismicio/client";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { Button } from "@/components/ui/button";

type HeroButton = {
  button_text: prismic.KeyTextField;
  button_href: prismic.LinkField;
  variant: "primary" | "ghost" | null;
};

export type HeroProps = SliceComponentProps<Content.HeroSlice>;

const Hero: FC<HeroProps> = ({ slice }) => {
  const { title_1, title_2, paragraph, hero_image, buttons } = slice.primary;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative isolate flex min-h-dvh w-full items-center justify-center overflow-hidden text-white bg-white"
    >
      {hero_image?.url && (
        <PrismicNextImage
          field={hero_image}
          fill
          priority
          fallbackAlt=""
          className="absolute inset-0 -z-20 object-cover"
        />
      )}
      {/* Maschera per leggibilità del testo sopra la foto */}
      <div className="absolute inset-0 -z-10" />

      <div className="mx-auto flex max-w-[1028px] flex-col items-center gap-13 px-6 text-center">
        <h1 className="text-h4 uppercase md:text-h1">
          {title_1}
          {title_2 && (
            <>
              <br />
              {title_2}
            </>
          )}
        </h1>

        {paragraph && (
          <div className="max-w-2xl text-subtitle text-white">
            <PrismicRichText field={paragraph} />
          </div>
        )}

        {buttons && buttons.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center justify-center gap-6">
            {buttons.map((btn: HeroButton, i: number) => (
              <Fragment key={i}>
                {i > 0 && (
                  <span aria-hidden className="text-button text-white/60">
                    |
                  </span>
                )}
                <Button asChild variant="white" className="tracking-wider">
                  <PrismicNextLink field={btn.button_href}>
                    {btn.button_text}
                  </PrismicNextLink>
                </Button>
              </Fragment>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
