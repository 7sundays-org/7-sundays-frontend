"use client";

import { FC, useCallback, useEffect, useRef, useState } from "react";
import type * as prismic from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { CarouselArrow } from "@/components/ui/carousel-arrow";

type ProcessStepItem = {
  image: prismic.ImageField;
  label: prismic.KeyTextField;
  description: prismic.RichTextField;
};

type ProcessStepsSlice = prismic.SharedSlice<
  "process_steps",
  prismic.SharedSliceVariation<
    "default",
    {
      eyebrow: prismic.KeyTextField;
      title: prismic.RichTextField;
      steps: prismic.GroupField<ProcessStepItem>;
    },
    never
  >
>;

export type ProcessStepsProps = SliceComponentProps<ProcessStepsSlice>;

const ProcessSteps: FC<ProcessStepsProps> = ({ slice }) => {
  const { eyebrow, title, steps } = slice.primary;
  const items = (steps ?? []).filter((s) => s.image?.url || s.label);

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
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const isMobile = window.innerWidth < 768;
    scroller.scrollBy({ left: dir * (isMobile ? scroller.clientWidth : 396), behavior: "smooth" });
  };

  if (items.length === 0) return null;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative w-full border-b border-black/50 bg-white"
    >
      {/* Rosa band behind the header and the upper part of the cards */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[686px] bg-dusty-rose"
      />

      <div className="relative">
        {/* Header */}
        <div className="flex flex-col gap-2 px-6 pt-10 pb-8 md:px-[90px] md:pt-[80px] md:pb-[40px]">
          {eyebrow && (
            <span className="font-sans text-[18px] leading-[28px] font-semibold tracking-[0.05em] text-primary italic md:text-[25px] md:leading-[32px]">
              {eyebrow}
            </span>
          )}
          {title && (
            <h2 className="font-sans text-[40px] leading-tight font-extrabold text-primary md:text-[40px] md:leading-[48px]">
              <PrismicRichText
                field={title}
                components={{ paragraph: ({ children }) => <>{children}</> }}
              />
            </h2>
          )}
        </div>

        {/* Cards carousel */}
        <div className="relative">
          <div
            ref={scrollerRef}
            className="carousel-track flex snap-x snap-mandatory overflow-x-auto pb-12 [-ms-overflow-style:none] [scrollbar-width:none] md:snap-none md:gap-[32px] md:px-[89px] [&::-webkit-scrollbar]:hidden"
          >
            {items.map((step, i) => (
              <article
                key={i}
                className="flex w-full shrink-0 snap-start flex-col md:w-[364px] md:gap-5"
              >
                {/* Mobile: label sopra l'immagine, sul fondo rosato */}
                {step.label && (
                  <div className="px-6 pb-3 pt-1 md:hidden">
                    <span className="font-sans text-[20px] leading-[30px] font-semibold text-primary">
                      {step.label}
                    </span>
                  </div>
                )}

                {/* Immagine — con padding laterale su mobile */}
                {step.image?.url && (
                  <div className="px-6 md:px-0">
                    <div className="relative h-[502px] w-full overflow-hidden rounded-[8px] bg-neutral-200 md:h-[540px]">
                      <PrismicNextImage
                        field={step.image}
                        fill
                        fallbackAlt=""
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}

                {/* Label (solo desktop) + descrizione */}
                <div className="mt-4 flex flex-col gap-2 px-6 md:mt-0 md:px-0">
                  {step.label && (
                    <span className="hidden font-sans text-[25px] leading-[30px] font-bold tracking-[0.05em] text-foreground uppercase md:block">
                      {step.label}
                    </span>
                  )}
                  {step.description && (
                    <div className="font-sans text-[20px] leading-[30px] tracking-[0.05em] text-foreground italic">
                      <PrismicRichText field={step.description} />
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
                className="absolute top-[270px] left-2 z-10 -translate-y-1/2 md:left-6"
              />
              <CarouselArrow
                direction="right"
                aria-label="Card successiva"
                onClick={() => scrollBy(1)}
                disabled={atEnd}
                className="absolute top-[270px] right-2 z-10 -translate-y-1/2 md:right-6"
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;
