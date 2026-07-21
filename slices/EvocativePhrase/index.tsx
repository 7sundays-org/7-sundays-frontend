import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { cn } from "@/lib/utils";

export type EvocativePhraseProps =
  SliceComponentProps<Content.EvocativePhraseSlice>;

const bgClasses: Record<string, string> = {
  light: "bg-white text-foreground",
  dark: "bg-neutral-900 text-white",
  primary: "bg-primary text-white",
  orange: "bg-orange text-[#433f4d]",
};

const EvocativePhrase: FC<EvocativePhraseProps> = ({ slice }) => {
  const variant = slice.primary.background_color ?? "light";
  const bg = bgClasses[variant] ?? bgClasses.light;
  // H3 evocative phrase: Primary su light, blu scuro su orange, bianco su dark/primary.
  const phraseColor =
    variant === "light"
      ? "text-foreground"
      : variant === "orange"
        ? "text-[#433f4d]"
        : "text-white";

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={cn(
        "w-full px-6 py-10 md:py-28 lg:py-[140px] lg:pr-[88px] lg:pl-[223px]",
        bg
      )}
    >
      <div className="flex flex-col gap-10">
        <div
          className={cn(
            "font-sans text-[1.875rem] leading-[40px] font-bold italic md:text-[40px] md:leading-[48px]",
            phraseColor
          )}
        >
          <PrismicRichText field={slice.primary.phrase} />
        </div>
        {slice.primary.subtitle && (
          <div className="text-body">
            <PrismicRichText field={slice.primary.subtitle} />
          </div>
        )}
      </div>
    </section>
  );
};

export default EvocativePhrase;
