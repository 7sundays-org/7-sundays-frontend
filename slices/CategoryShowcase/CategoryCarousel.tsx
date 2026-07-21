"use client";

import { FC, useCallback, useEffect, useRef, useState } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { Button } from "@/components/ui/button";
import { CarouselArrow } from "@/components/ui/carousel-arrow";

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
        className="carousel-track flex snap-x snap-mandatory overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {cards.map((card, i) => (
          <article
            key={i}
            style={{
              backgroundColor:
                card.background_color || "var(--color-dusty-rose)",
            }}
            className="flex min-h-[80dvh] w-full shrink-0 snap-start"
          >
            <div className="flex flex-1 items-center px-8 py-10 md:px-20 md:py-12">
              <div className="flex h-full max-h-[672px] w-full max-w-[425px] shrink-0 flex-col items-start justify-between gap-16 md:gap-[136px]">
                <div className="flex flex-col gap-4 md:gap-6">
                  {card.eyebrow && (
                    <span className="font-sans text-[22px] leading-tight font-semibold tracking-[0.05em] text-blue-ink uppercase italic md:text-[30px] md:leading-[58px]">
                      {card.eyebrow}
                    </span>
                  )}
                  {card.title && (
                    <h2 className="font-sans text-[2rem] leading-tight font-bold text-blue-ink italic md:text-[55px] md:leading-[58px]">
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
              <div className="hidden shrink-0 items-center justify-center p-8 md:flex md:p-12">
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
          <CarouselArrow
            direction="left"
            aria-label="Card precedente"
            onClick={() => scrollToIndex(active - 1)}
            disabled={active === 0}
            className="absolute top-1/2 left-4 z-10 -translate-y-1/2 md:left-6"
          />
          <CarouselArrow
            direction="right"
            aria-label="Card successiva"
            onClick={() => scrollToIndex(active + 1)}
            disabled={active === count - 1}
            className="absolute top-1/2 right-4 z-10 -translate-y-1/2 md:right-6"
          />
        </>
      )}
    </div>
  );
};
