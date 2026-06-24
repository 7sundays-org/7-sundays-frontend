"use client";

import { FC, useCallback, useEffect, useRef, useState } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

export type TestimonialData = Content.TestimonialDocument["data"];

export const Stars: FC<{ count?: number }> = ({ count = 5 }) => (
  <div className="flex items-center gap-1.5">
    {Array.from({ length: count }).map((_, i) => (
      <Star key={i} className="size-[22px] fill-sandy-clay text-sandy-clay" />
    ))}
  </div>
);

export const TestimonialCard: FC<{ data: TestimonialData }> = ({ data }) => (
  <article className="flex flex-col gap-[42px]">
    <Stars />
    <div className="font-sans text-[2rem] leading-tight font-bold text-white md:text-[45px] md:leading-[58px]">
      <PrismicRichText field={data.quote} />
    </div>
    {data.author_name && (
      <p className="text-subtitle text-white uppercase">
        {data.author_name}
        {data.author_role && (
          <span className="text-white/60"> · {data.author_role}</span>
        )}
      </p>
    )}
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
          <button
            type="button"
            aria-label="Testimonianza precedente"
            onClick={() => scrollToIndex(active - 1)}
            disabled={active === 0}
            className="absolute top-1/2 -left-6 z-10 flex size-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur transition hover:bg-white/20 disabled:pointer-events-none disabled:opacity-0 lg:-left-16"
          >
            <ChevronLeft className="size-6" />
          </button>
          <button
            type="button"
            aria-label="Testimonianza successiva"
            onClick={() => scrollToIndex(active + 1)}
            disabled={active === count - 1}
            className="absolute top-1/2 -right-6 z-10 flex size-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur transition hover:bg-white/20 disabled:pointer-events-none disabled:opacity-0 lg:-right-24"
          >
            <ChevronRight className="size-6" />
          </button>
        </>
      )}
    </div>
  );
};
