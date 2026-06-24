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
};

const EvocativePhrase: FC<EvocativePhraseProps> = ({ slice }) => {
  const bg =
    bgClasses[slice.primary.background_color ?? "light"] ?? bgClasses.light;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={cn(
        "w-full px-6 py-20 md:py-28 lg:py-[140px] lg:pr-[88px] lg:pl-[224px]",
        bg
      )}
    >
      <div className="flex flex-col gap-10">
        <div className="font-sans text-[2rem] leading-tight font-bold md:text-[45px] md:leading-[58px]">
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
