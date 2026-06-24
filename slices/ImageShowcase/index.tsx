"use client";

import { FC, useCallback, useEffect, useRef, useState } from "react";
import type * as prismic from "@prismicio/client";
import { isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { CarouselArrow } from "@/components/ui/carousel-arrow";

type ImageShowcaseSlide = {
  image: prismic.ImageField;
  caption: prismic.RichTextField;
  cta_label: prismic.KeyTextField;
  cta_link: prismic.LinkField;
};

type ImageShowcaseSlice = prismic.SharedSlice<
  "image_showcase",
  prismic.SharedSliceVariation<
    "default",
    {
      title: prismic.RichTextField;
      full_bleed: prismic.BooleanField;
      slides: prismic.GroupField<ImageShowcaseSlide>;
    },
    never
  >
>;

export type ImageShowcaseProps = SliceComponentProps<ImageShowcaseSlice>;

const ImageShowcase: FC<ImageShowcaseProps> = ({ slice }) => {
  const { title, slides, full_bleed } = slice.primary;
  const items = (slides ?? []).filter((s) => s.image?.url);
  const count = items.length;

  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const scrollToIndex = useCallback(
    (index: number) => {
      const scroller = scrollerRef.current;
      if (!scroller) return;
      const clamped = Math.max(0, Math.min(index, count - 1));
      scroller.scrollTo({
        left: clamped * scroller.clientWidth,
        behavior: "smooth",
      });
    },
    [count]
  );

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setActive(Math.round(scroller.scrollLeft / scroller.clientWidth));
      });
    };
    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      scroller.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  if (count === 0) return null;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={cn(
        "w-full",
        // Full bleed: immagine edge-to-edge senza padding/rounding (es. "Lasciati ispirare").
        // Default: inset + angoli arrotondati (es. "I preferiti").
        full_bleed ? "" : "px-6 py-8 md:px-[90px] md:py-[80px]"
      )}
    >
      <div
        className={cn(
          "relative isolate",
          full_bleed ? "" : "overflow-hidden rounded-[16px]"
        )}
      >
        <div
          ref={scrollerRef}
          className="flex snap-x snap-mandatory overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((slide, i) => (
            <div
              key={i}
              className="relative h-[80dvh] min-h-[440px] w-full shrink-0 snap-start"
            >
              <PrismicNextImage
                field={slide.image}
                fill
                fallbackAlt=""
                className="object-cover"
              />
              {/* Maschera per leggibilità del testo bianco */}
              <div className="absolute inset-0 bg-gun-metal/40" />

              {/* Elenco luoghi / didascalia, in basso a sinistra */}
              {isFilled.richText(slide.caption) && (
                <div className="absolute bottom-8 left-6 z-10 flex flex-col gap-2 font-sans text-[22px] leading-[1.4] font-bold text-porcelain italic md:bottom-[64px] md:left-[64px] md:text-[32px]">
                  <PrismicRichText
                    field={slide.caption}
                    components={{
                      paragraph: ({ children }) => <span>{children}</span>,
                    }}
                  />
                </div>
              )}

              {/* CTA, in basso a destra */}
              {isFilled.link(slide.cta_link) && (
                <PrismicNextLink
                  field={slide.cta_link}
                  className="absolute right-6 bottom-8 z-10 inline-flex items-center gap-2 font-sans text-[18px] font-bold text-porcelain transition-opacity hover:opacity-80 md:right-[64px] md:bottom-[64px] md:text-[22px]"
                >
                  {slide.cta_label || "Scopri di più"}
                  <ArrowUpRight className="size-5" />
                </PrismicNextLink>
              )}
            </div>
          ))}
        </div>

        {/* Titolo serif sovrapposto, centrato */}
        {isFilled.richText(title) && (
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-6 text-center font-serif text-[44px] leading-none font-extrabold text-porcelain md:text-[70px]">
            <PrismicRichText
              field={title}
              components={{ paragraph: ({ children }) => <>{children}</> }}
            />
          </div>
        )}

        {count > 1 && (
          <>
            <CarouselArrow
              direction="left"
              aria-label="Immagine precedente"
              onClick={() => scrollToIndex(active - 1)}
              disabled={active === 0}
              className="absolute top-1/2 left-4 z-20 -translate-y-1/2 md:left-8"
            />
            <CarouselArrow
              direction="right"
              aria-label="Immagine successiva"
              onClick={() => scrollToIndex(active + 1)}
              disabled={active === count - 1}
              className="absolute top-1/2 right-4 z-20 -translate-y-1/2 md:right-8"
            />
          </>
        )}
      </div>
    </section>
  );
};

export default ImageShowcase;
