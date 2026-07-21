"use client";

import { FC, useCallback, useEffect, useRef, useState } from "react";
import type * as prismic from "@prismicio/client";
import { isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { CarouselArrow } from "@/components/ui/carousel-arrow";

type ServiceItem = {
  image: prismic.ImageField;
  label: prismic.KeyTextField;
  description: prismic.RichTextField;
};

type ServicesShowcaseSlice = prismic.SharedSlice<
  "services_showcase",
  prismic.SharedSliceVariation<
    "default",
    {
      title: prismic.RichTextField;
      body: prismic.RichTextField;
      services: prismic.GroupField<ServiceItem>;
    },
    never
  >
>;

export type ServicesShowcaseProps = SliceComponentProps<ServicesShowcaseSlice>;

const ServicesShowcase: FC<ServicesShowcaseProps> = ({ slice }) => {
  const { title, body, services } = slice.primary;
  const items = (services ?? []).filter((s) => s.image?.url || s.label);

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
      className="w-full bg-white"
    >
      {/* Header */}
      <div className="flex flex-col gap-3 px-6 pt-[80px] pb-[40px] md:px-[90px]">
        {isFilled.richText(title) && (
          <h2 className="font-serif text-[2.75rem] leading-tight font-extrabold text-primary md:text-[60px]">
            <PrismicRichText
              field={title}
              components={{ paragraph: ({ children }) => <>{children}</> }}
            />
          </h2>
        )}
        {isFilled.richText(body) && (
          <div className="max-w-[760px] text-[30px] text-foreground">
            <PrismicRichText field={body} />
          </div>
        )}
      </div>

      {/* Cards carousel */}
      <div className="relative">
        <div
          ref={scrollerRef}
          className="carousel-track overflow-x-auto px-6 pb-12 md:px-[89px] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="mx-auto flex w-max gap-[32px]">
            {items.map((service, i) => (
              <article
                key={i}
                className="flex w-[364px] shrink-0 flex-col gap-5"
              >
                {service.image?.url && (
                  <div className="relative h-[545px] w-full shrink-0 overflow-hidden rounded-[8px]">
                    <PrismicNextImage
                      field={service.image}
                      fill
                      fallbackAlt=""
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex flex-col gap-2">
                  {service.label && (
                    <span className="font-sans text-[20px] leading-[30px] font-bold tracking-[0.05em] text-foreground uppercase">
                      {service.label}
                    </span>
                  )}
                  {isFilled.richText(service.description) && (
                    <div className="font-sans text-[20px] leading-[30px] tracking-[0.05em] text-foreground italic">
                      <PrismicRichText field={service.description} />
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>

        {items.length > 1 && (
          <>
            <CarouselArrow
              direction="left"
              aria-label="Card precedente"
              onClick={() => scrollBy(-1)}
              disabled={atStart}
              className="absolute top-[272px] left-2 z-10 -translate-y-1/2 md:left-6"
            />
            <CarouselArrow
              direction="right"
              aria-label="Card successiva"
              onClick={() => scrollBy(1)}
              disabled={atEnd}
              className="absolute top-[272px] right-2 z-10 -translate-y-1/2 md:right-6"
            />
          </>
        )}
      </div>
    </section>
  );
};

export default ServicesShowcase;
