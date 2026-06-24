"use client";

import { FC, useCallback, useEffect, useRef, useState } from "react";
import type * as prismic from "@prismicio/client";
import { isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { CarouselArrow } from "@/components/ui/carousel-arrow";

type ImageHighlightItem = {
  image: prismic.ImageField;
  title: prismic.KeyTextField;
  description: prismic.RichTextField;
};

type ImageHighlightsSlice = prismic.SharedSlice<
  "image_highlights",
  prismic.SharedSliceVariation<
    "default",
    {
      items: prismic.GroupField<ImageHighlightItem>;
    },
    never
  >
>;

export type ImageHighlightsProps = SliceComponentProps<ImageHighlightsSlice>;

const ImageHighlights: FC<ImageHighlightsProps> = ({ slice }) => {
  const items = (slice.primary.items ?? []).filter((it) => it.image?.url);

  const scrollerRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const scrollBy = (dir: 1 | -1) => {
    scrollerRef.current?.scrollBy({ left: dir * 670, behavior: "smooth" });
  };

  if (items.length === 0) return null;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full bg-white py-16 md:py-[80px]"
    >
      <div className="relative">
        <div
          ref={scrollerRef}
          className="flex gap-[40px] overflow-x-auto px-6 md:px-[90px] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((it, i) => (
            <article
              key={i}
              className="flex w-[85vw] max-w-[630px] shrink-0 flex-col gap-6"
            >
              <div className="relative h-[300px] w-full shrink-0 overflow-hidden rounded-[8px] md:h-[466px]">
                <PrismicNextImage
                  field={it.image}
                  fill
                  fallbackAlt=""
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-3">
                {it.title && (
                  <h3 className="font-sans text-[28px] leading-tight font-bold text-foreground italic md:text-[40px]">
                    {it.title}
                  </h3>
                )}
                {isFilled.richText(it.description) && (
                  <div className="text-body text-foreground/70">
                    <PrismicRichText field={it.description} />
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        {items.length > 1 && (
          <>
            <CarouselArrow
              direction="left"
              aria-label="Card precedente"
              onClick={() => scrollBy(-1)}
              disabled={atStart}
              className="absolute top-[150px] left-3 z-10 -translate-y-1/2 md:top-[233px] md:left-12"
            />
            <CarouselArrow
              direction="right"
              aria-label="Card successiva"
              onClick={() => scrollBy(1)}
              disabled={atEnd}
              className="absolute top-[150px] right-3 z-10 -translate-y-1/2 md:top-[233px] md:right-12"
            />
          </>
        )}
      </div>
    </section>
  );
};

export default ImageHighlights;
