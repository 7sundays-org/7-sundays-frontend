"use client";

import { useState } from "react";
import { isFilled } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { ChevronDown } from "lucide-react";
import type * as prismic from "@prismicio/client";

type FaqItem = {
  question: prismic.KeyTextField;
  answer: prismic.RichTextField;
};

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="flex flex-col">
      {items.map((item, i) => (
        <div key={i} className="border-b border-black/50">
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left text-body text-foreground"
          >
            <span>{item.question}</span>
            <ChevronDown
              className={`size-5 shrink-0 text-foreground/60 transition-transform duration-300 ${
                open === i ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Grid-rows trick: anima l'altezza senza conoscerne il valore */}
          <div
            className={`grid transition-[grid-template-rows] duration-300 ease-out ${
              open === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div className="overflow-hidden">
              {isFilled.richText(item.answer) && (
                <div className="pb-5 text-body text-foreground/70">
                  <PrismicRichText field={item.answer} />
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
