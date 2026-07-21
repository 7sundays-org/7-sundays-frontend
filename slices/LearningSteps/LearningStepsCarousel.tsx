"use client";

import { useEffect, useRef, useState } from "react";
import type * as prismic from "@prismicio/client";
import { isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import { CarouselArrow } from "@/components/ui/carousel-arrow";

interface Step {
  label: string;
  image: prismic.ImageField | null;
  description: prismic.RichTextField | null;
}

interface Props {
  items: Step[];
  visibleDesktop?: number;
  visibleMobile?: number;
}

const NORMAL_W = { mobile: 200, desktop: 313 };
const EXPANDED_W = { mobile: 320, desktop: 620 };

export function LearningStepsCarousel({
  items,
  visibleDesktop = 5,
  visibleMobile = 2,
}: Props) {
  const [index, setIndex] = useState(0);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  const normalW = isMobile ? NORMAL_W.mobile : NORMAL_W.desktop;
  const expandedW = isMobile ? EXPANDED_W.mobile : EXPANDED_W.desktop;

  const visible = isMobile ? visibleMobile : visibleDesktop;
  const maxIndex = Math.max(0, items.length - visible);
  const canPrev = index > 0;
  const canNext = index < maxIndex;

  const getTranslate = () => {
    let offset = index * normalW;
    // if the expanded item is before the current viewport start, shift left by the extra width
    if (activeStep !== null && activeStep < index) {
      offset += expandedW - normalW;
    }
    return offset;
  };

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(maxIndex, i + 1));

  const handleStepClick = (i: number) =>
    setActiveStep((prev) => (prev === i ? null : i));

  return (
    <div className="relative">
      {/* Track */}
      <div className="carousel-track overflow-hidden">
        <div
          className="flex gap-0 transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${getTranslate()}px)` }}
        >
          {items.map((step, i) => {
            const isActive = activeStep === i;
            const hasDetail =
              isFilled.image(step.image) || isFilled.richText(step.description);

            return (
              <div
                key={i}
                onClick={() => handleStepClick(i)}
                aria-expanded={isActive}
                style={{ width: isActive ? expandedW : normalW }}
                className={[
                  "flex shrink-0 cursor-pointer flex-col overflow-hidden border-l-[3px] transition-[width,border-color] duration-500 ease-in-out",
                  isActive ? "border-sandy-clay" : "border-primary",
                ].join(" ")}
              >
                {/* Numero decorativo */}
                <div className="relative h-[280px] shrink-0 overflow-hidden md:h-[380px]">
                  <span
                    aria-hidden
                    className={`absolute top-1/2 left-[-28px] -translate-y-1/2 font-serif leading-none font-extrabold text-transparent md:left-[-45px] ${isActive ? "[-webkit-text-stroke:2px_var(--color-primary)] md:[-webkit-text-stroke:3px_var(--color-primary)]" : "[-webkit-text-stroke:2px_var(--color-sandy-clay)] md:[-webkit-text-stroke:3px_var(--color-sandy-clay)]"}`}
                    style={{ fontSize: "clamp(200px, 15vw, 320px)" }}
                  >
                    {i + 1}
                  </span>
                </div>

                {/* Etichetta verticale — collassata quando espanso */}
                <div
                  className={[
                    "flex items-start overflow-hidden pl-4 transition-[max-height,opacity] duration-300 md:pl-6",
                    isActive
                      ? "max-h-0 opacity-0"
                      : "max-h-[380px] opacity-100",
                  ].join(" ")}
                >
                  <span className="[writing-mode:vertical-rl] [text-orientation:sideways] font-serif text-[24px] leading-[1.05] font-extrabold text-primary md:text-[40px] md:leading-[45px]">
                    {step.label}
                  </span>
                </div>

                {/* Contenuto espanso — immagine full-bleed + testo con padding */}
                <div
                  className={[
                    "flex flex-col overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out",
                    isActive
                      ? "max-h-[600px] opacity-100 delay-150"
                      : "max-h-0 opacity-0",
                  ].join(" ")}
                >
                  {isFilled.image(step.image) && (
                    <div className="px-4 md:px-6">
                      <PrismicNextImage
                        field={step.image}
                        width={388}
                        height={248}
                        fallbackAlt=""
                        className="w-full rounded-2xl object-cover"
                        style={{ height: "248px" }}
                      />
                    </div>
                  )}

                  {/* Titolo e descrizione */}
                  <div className="flex flex-col gap-3 px-4 pt-4 pb-6 md:px-6">
                    <h3 className="font-serif text-[22px] font-extrabold text-primary md:text-[28px]">
                      {step.label}
                    </h3>
                    {isFilled.richText(step.description) && (
                      <div className="text-[13px] leading-[1.5] text-foreground/80 md:text-[15px]">
                        <PrismicRichText field={step.description} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Frecce in overlay */}
      {items.length > visibleDesktop && (
        <>
          <CarouselArrow
            direction="left"
            aria-label="Precedente"
            onClick={prev}
            disabled={!canPrev}
            className="absolute top-[calc(50%-theme(spacing.10))] left-2 -translate-y-1/2 md:left-4"
          />
          <CarouselArrow
            direction="right"
            aria-label="Successivo"
            onClick={next}
            disabled={!canNext}
            className="absolute top-[calc(50%-theme(spacing.10))] right-2 -translate-y-1/2 md:right-4"
          />

          {/* Pallini */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Vai al gruppo ${i + 1}`}
                className={`size-2 rounded-full transition-colors ${
                  i === index ? "bg-primary" : "bg-primary/30"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
