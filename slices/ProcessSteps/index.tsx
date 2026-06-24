"use client";

import { FC, useCallback, useEffect, useRef, useState } from "react";
import type * as prismic from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    scrollerRef.current?.scrollBy({ left: dir * 396, behavior: "smooth" });
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
        <div className="flex flex-col gap-2 px-6 pt-[80px] pb-[40px] md:px-[90px]">
          {eyebrow && (
            <span className="font-sans text-[30px] leading-[47px] font-semibold tracking-[0.05em] text-primary italic">
              {eyebrow}
            </span>
          )}
          {title && (
            <h2 className="font-sans text-[2.5rem] leading-tight font-extrabold text-primary md:text-[55px] md:leading-[58px]">
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
            className="flex gap-[32px] overflow-x-auto px-6 pb-12 md:px-[89px] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {items.map((step, i) => (
              <article
                key={i}
                className="flex w-[364px] shrink-0 flex-col gap-5"
              >
                {step.image?.url && (
                  <div className="relative h-[540px] w-full overflow-hidden rounded-[8px] bg-neutral-200">
                    <PrismicNextImage
                      field={step.image}
                      fill
                      fallbackAlt=""
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex flex-col gap-1">
                  {step.label && (
                    <span className="font-sans text-[25px] leading-[30px] font-bold tracking-[0.05em] text-foreground uppercase">
                      {step.label}
                    </span>
                  )}
                  {step.description && (
                    <div className="font-sans text-[25px] leading-[30px] font-semibold tracking-[0.05em] text-foreground italic">
                      <PrismicRichText field={step.description} />
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>

          {items.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Card precedente"
                onClick={() => scrollBy(-1)}
                disabled={atStart}
                className="absolute top-[270px] left-2 z-10 flex size-12 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white text-foreground shadow-sm transition hover:bg-white disabled:pointer-events-none disabled:opacity-0 md:left-6"
              >
                <ChevronLeft className="size-6" />
              </button>
              <button
                type="button"
                aria-label="Card successiva"
                onClick={() => scrollBy(1)}
                disabled={atEnd}
                className="absolute top-[270px] right-2 z-10 flex size-12 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white text-foreground shadow-sm transition hover:bg-white disabled:pointer-events-none disabled:opacity-0 md:right-6"
              >
                <ChevronRight className="size-6" />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;
