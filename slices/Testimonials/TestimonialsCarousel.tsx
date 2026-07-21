"use client";

import { FC, useCallback, useEffect, useRef, useState } from "react";
import { Content, isFilled } from "@prismicio/client";
import { PrismicLink, PrismicRichText } from "@prismicio/react";
import { Star } from "lucide-react";
import { CarouselArrow } from "@/components/ui/carousel-arrow";

export type TestimonialData =
  Content.TestimonialsSliceDefaultPrimaryTestimonialsItem;

type Source = "airbnb" | "booking" | "google" | "manuale" | null | undefined;

const SOURCE_LABELS: Record<NonNullable<Source>, string> = {
  airbnb: "Airbnb",
  booking: "Booking.com",
  google: "Google",
  manuale: "",
};

const SourceBadge: FC<{ source: Source }> = ({ source }) => {
  if (!source || source === "manuale") return null;
  return (
    <span className="inline-block rounded-full border border-white/30 px-3 py-1 text-xs font-semibold text-white/70 uppercase tracking-wider">
      {SOURCE_LABELS[source]}
    </span>
  );
};

export const Stars: FC<{ count?: number }> = ({ count = 5 }) => (
  <div className="flex items-center gap-1.5">
    {Array.from({ length: Math.min(Math.max(count, 1), 5) }).map((_, i) => (
      <Star key={i} className="size-[22px] fill-sandy-clay text-sandy-clay" />
    ))}
  </div>
);

export const TestimonialCard: FC<{ data: TestimonialData }> = ({ data }) => (
  <article className="flex flex-col gap-[42px]">
    <div className="flex items-center gap-4">
      <Stars count={data.stars ?? 5} />
      <SourceBadge source={data.source} />
    </div>
    {data.title && (
      <p className="text-subtitle font-bold text-white/80 uppercase tracking-wider">
        {data.title}
      </p>
    )}
    <div className="line-clamp-3 font-sans text-[1.875rem] leading-[1.4] font-bold italic text-white md:text-[45px] md:leading-[58px] md:not-italic">
      <PrismicRichText field={data.quote} />
    </div>
    <div className="flex flex-col gap-2">
      {data.author_name && (
        <p className="text-subtitle text-white uppercase">
          {data.author_name}
          {data.author_role && (
            <span className="text-white/60"> · {data.author_role}</span>
          )}
        </p>
      )}
      {isFilled.link(data.reference_link) && (
        <PrismicLink
          field={data.reference_link}
          className="text-xs text-white/50 underline underline-offset-2 hover:text-white/80 transition-colors"
        >
          Leggi la recensione completa →
        </PrismicLink>
      )}
    </div>
  </article>
);

export const TestimonialsCarousel: FC<{ items: TestimonialData[] }> = ({
  items,
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const count = items.length;

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

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((data, i) => (
          <div key={i} className="w-full shrink-0 snap-start">
            <TestimonialCard data={data} />
          </div>
        ))}
      </div>

      {count > 1 && (
        <>
          {/* Dots — mobile only */}
          <div className="mt-8 flex items-center gap-2.5 md:hidden">
            {items.map((_, i) => (
              <button
                key={i}
                aria-label={`Testimonianza ${i + 1}`}
                onClick={() => scrollToIndex(i)}
                className={`size-[6px] rounded-full transition-colors ${i === active ? "bg-white" : "bg-white/40"}`}
              />
            ))}
          </div>

          <CarouselArrow
            direction="left"
            aria-label="Testimonianza precedente"
            onClick={() => scrollToIndex(active - 1)}
            disabled={active === 0}
            className="absolute top-1/2 -left-6 z-10 -translate-y-1/2 lg:-left-[200px]"
          />
          <CarouselArrow
            direction="right"
            aria-label="Testimonianza successiva"
            onClick={() => scrollToIndex(active + 1)}
            disabled={active === count - 1}
            className="absolute top-1/2 -right-6 z-10 -translate-y-1/2 lg:-right-[200px]"
          />
        </>
      )}
    </div>
  );
};
