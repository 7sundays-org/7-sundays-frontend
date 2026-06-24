"use client";

import { FC, useCallback, useEffect, useRef, useState } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type Cards = Content.CategoryShowcaseSliceDefaultPrimary["cards"];

export const CategoryCarousel: FC<{ cards: Cards }> = ({ cards }) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const count = cards.length;

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

  // Keep the active index in sync with manual scrolling / swiping.
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

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {cards.map((card, i) => (
          <article
            key={i}
            style={{
              backgroundColor:
                card.background_color || "var(--color-dusty-rose)",
            }}
            className="flex h-[70vh] min-h-[832px] w-full shrink-0 snap-start"
          >
            <div className="flex flex-1 items-center px-12 md:px-20">
              <div className="flex h-[672px] w-[425px] max-w-full shrink-0 flex-col items-start justify-between gap-[136px]">
                <div className="flex flex-col">
                  {card.eyebrow && (
                    <span className="font-sans text-[30px] leading-[58px] font-semibold tracking-[0.05em] text-blue-ink italic">
                      {card.eyebrow}
                    </span>
                  )}
                  {card.title && (
                    <h2 className="font-sans text-[55px] leading-[58px] font-bold text-blue-ink italic">
                      <PrismicRichText
                        field={card.title}
                        components={{
                          paragraph: ({ children }) => <>{children}</>,
                        }}
                      />
                    </h2>
                  )}
                </div>
                {card.link && (
                  <Button
                    asChild
                    variant="primary"
                    className="h-[58px] w-fit leading-[58px] tracking-[0.03em] text-blue-ink"
                  >
                    <PrismicNextLink field={card.link}>
                      {card.cta_label || "Scopri di più"}
                    </PrismicNextLink>
                  </Button>
                )}
              </div>
            </div>
            {card.image?.url && (
              <div className="flex shrink-0 items-center justify-center p-8 md:p-12">
                <div className="relative aspect-[971/672] h-full max-h-[672px] w-auto overflow-hidden rounded-[16px]">
                  <PrismicNextImage
                    field={card.image}
                    fill
                    fallbackAlt=""
                    className="object-cover"
                  />
                </div>
              </div>
            )}
          </article>
        ))}
      </div>

      {count > 1 && (
        <>
          <button
            type="button"
            aria-label="Card precedente"
            onClick={() => scrollToIndex(active - 1)}
            disabled={active === 0}
            className="absolute top-1/2 left-4 z-10 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur transition hover:bg-black/50 disabled:pointer-events-none disabled:opacity-0 md:left-6"
          >
            <ChevronLeft className="size-6" />
          </button>
          <button
            type="button"
            aria-label="Card successiva"
            onClick={() => scrollToIndex(active + 1)}
            disabled={active === count - 1}
            className="absolute top-1/2 right-4 z-10 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur transition hover:bg-black/50 disabled:pointer-events-none disabled:opacity-0 md:right-6"
          >
            <ChevronRight className="size-6" />
          </button>
        </>
      )}
    </div>
  );
};
