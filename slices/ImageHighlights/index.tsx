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
  // Autoplay continuo, attivo solo da desktop (impostato dopo il mount).
  const [autoplay, setAutoplay] = useState(false);
  // In pausa durante hover/focus: ref così il loop rAF legge il valore corrente
  // senza doversi ri-registrare a ogni cambio.
  const pausedRef = useRef(false);

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

  const scrollBy = useCallback((dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    // Misura il passo reale (larghezza card + gap) così è corretto a ogni viewport.
    const cards = el.children;
    const step =
      cards.length > 1
        ? (cards[1] as HTMLElement).offsetLeft -
          (cards[0] as HTMLElement).offsetLeft
        : el.clientWidth;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  }, []);

  // Scorrimento automatico continuo (marquee) — SOLO desktop.
  // Fluido a ogni frame invece che a scatti; loop senza salti grazie alla
  // seconda copia delle card. In pausa su hover/focus e con prefers-reduced-motion.
  useEffect(() => {
    if (items.length <= 1) return;
    const desktop = window.matchMedia("(min-width: 768px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const SPEED = 60; // px al secondo

    let raf = 0;
    let last = 0;

    const step = (time: number) => {
      const el = scrollerRef.current;
      if (el && !pausedRef.current && last) {
        const cards = el.children;
        // Distanza tra l'inizio della prima copia e l'inizio della seconda:
        // è la larghezza esatta di un ciclo, con cui riavvolgere senza salti.
        const stride =
          cards.length > items.length
            ? (cards[items.length] as HTMLElement).offsetLeft -
              (cards[0] as HTMLElement).offsetLeft
            : 0;
        const min = cards.length ? (cards[0] as HTMLElement).offsetLeft : 0;
        let next = el.scrollLeft + (SPEED * (time - last)) / 1000;
        if (stride > 0 && next >= min + stride) next -= stride;
        el.scrollLeft = next;
      }
      last = time;
      raf = requestAnimationFrame(step);
    };

    const sync = () => {
      cancelAnimationFrame(raf);
      last = 0;
      const on = desktop.matches && !reduce.matches;
      setAutoplay(on);
      if (on) raf = requestAnimationFrame(step);
    };

    sync();
    desktop.addEventListener("change", sync);
    reduce.addEventListener("change", sync);
    return () => {
      cancelAnimationFrame(raf);
      desktop.removeEventListener("change", sync);
      reduce.removeEventListener("change", sync);
    };
  }, [items.length]);

  if (items.length === 0) return null;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full bg-white py-16 md:py-[80px]"
    >
      <div
        className="relative"
        onMouseEnter={() => (pausedRef.current = true)}
        onMouseLeave={() => (pausedRef.current = false)}
        onFocusCapture={() => (pausedRef.current = true)}
        onBlurCapture={() => (pausedRef.current = false)}
      >
        <div
          ref={scrollerRef}
          className="carousel-track flex gap-[40px] overflow-x-auto px-6 md:px-[90px] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {(autoplay ? [...items, ...items] : items).map((it, i) => (
            <article
              key={i}
              aria-hidden={i >= items.length}
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
              disabled={!autoplay && atStart}
              className="absolute top-[150px] left-3 z-10 -translate-y-1/2 md:top-[233px] md:left-12"
            />
            <CarouselArrow
              direction="right"
              aria-label="Card successiva"
              onClick={() => scrollBy(1)}
              disabled={!autoplay && atEnd}
              className="absolute top-[150px] right-3 z-10 -translate-y-1/2 md:top-[233px] md:right-12"
            />
          </>
        )}
      </div>
    </section>
  );
};

export default ImageHighlights;
