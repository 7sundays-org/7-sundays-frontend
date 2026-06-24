"use client";

import { FC, useCallback, useEffect, useRef, useState } from "react";
import type * as prismic from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { ChevronLeft, ChevronRight } from "lucide-react";

type GalleryImageItem = {
  image: prismic.ImageField;
  caption: prismic.KeyTextField;
};

type GallerySlice = prismic.SharedSlice<
  "gallery",
  prismic.SharedSliceVariation<
    "default",
    {
      title: prismic.RichTextField;
      layout: prismic.SelectField<"grid" | "masonry" | "carousel">;
      images: prismic.GroupField<GalleryImageItem>;
    },
    never
  >
>;

export type GalleryProps = SliceComponentProps<GallerySlice>;

const Gallery: FC<GalleryProps> = ({ slice }) => {
  const { title, layout, images } = slice.primary;
  const items = (images ?? []).filter((it) => it.image?.url);
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

  const isGrid = layout === "grid" || layout === "masonry";

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full"
    >
      {isGrid ? (
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-12">
          <div className="grid gap-4 md:grid-cols-3">
            {items.map((it, i) => (
              <div
                key={i}
                className="relative aspect-square overflow-hidden rounded-[16px]"
              >
                <PrismicNextImage
                  field={it.image}
                  fill
                  fallbackAlt=""
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          {title && (
            <div className="mt-6 text-right font-sans text-[2rem] leading-tight font-bold text-primary italic md:text-[45px] md:leading-[58px]">
              <PrismicRichText field={title} />
            </div>
          )}
        </div>
      ) : (
        <div className="relative">
          {/* Full-bleed carousel; section is exactly as tall as the image */}
          <div
            ref={scrollerRef}
            className="flex snap-x snap-mandatory overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {items.map((it, i) => (
              <div
                key={i}
                className="relative h-[80dvh] min-h-[440px] w-full shrink-0 snap-start"
              >
                <PrismicNextImage
                  field={it.image}
                  fill
                  fallbackAlt=""
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          {/* Caption overlaid on the image, bottom-right */}
          {title && (
            <div className="pointer-events-none absolute right-6 bottom-8 z-10 max-w-[748px] text-right font-sans text-[2rem] leading-tight font-bold text-primary italic md:right-12 md:bottom-12 md:text-[45px] md:leading-[58px]">
              <PrismicRichText field={title} />
            </div>
          )}

          {count > 1 && (
            <>
              <button
                type="button"
                aria-label="Immagine precedente"
                onClick={() => scrollToIndex(active - 1)}
                disabled={active === 0}
                className="absolute top-1/2 left-4 z-10 flex size-12 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white text-foreground shadow-sm transition hover:bg-white disabled:pointer-events-none disabled:opacity-0 md:left-8"
              >
                <ChevronLeft className="size-6" />
              </button>
              <button
                type="button"
                aria-label="Immagine successiva"
                onClick={() => scrollToIndex(active + 1)}
                disabled={active === count - 1}
                className="absolute top-1/2 right-4 z-10 flex size-12 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white text-foreground shadow-sm transition hover:bg-white disabled:pointer-events-none disabled:opacity-0 md:right-8"
              >
                <ChevronRight className="size-6" />
              </button>
            </>
          )}
        </div>
      )}
    </section>
  );
};

export default Gallery;
