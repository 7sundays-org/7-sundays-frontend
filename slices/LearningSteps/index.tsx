import { FC } from "react";
import type * as prismic from "@prismicio/client";
import { isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { LearningStepsCarousel } from "./LearningStepsCarousel";

type LearningStepItem = {
  label: prismic.KeyTextField;
  image: prismic.ImageField;
  description: prismic.RichTextField;
};

type LearningStepsSlice = prismic.SharedSlice<
  "learning_steps",
  prismic.SharedSliceVariation<
    "default",
    {
      title: prismic.RichTextField;
      subtitle: prismic.RichTextField;
      steps: prismic.GroupField<LearningStepItem>;
    },
    never
  >
>;

export type LearningStepsProps = SliceComponentProps<LearningStepsSlice>;

const LearningSteps: FC<LearningStepsProps> = ({ slice }) => {
  const { title, subtitle, steps } = slice.primary;
  const items = (steps ?? [])
    .filter((s) => s.label)
    .map((s) => ({
      label: s.label as string,
      image: s.image ?? null,
      description: s.description ?? null,
    }));

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full overflow-x-hidden border-t border-black bg-white px-6 py-[80px] md:px-[81px] md:py-[120px]"
    >
      {/* Header */}
      <div className="mb-12 flex flex-col gap-4 md:mb-[80px]">
        {isFilled.richText(title) && (
          <h2 className="font-sans text-[2rem] leading-tight font-bold text-primary italic md:text-[40px]">
            <PrismicRichText
              field={title}
              components={{ paragraph: ({ children }) => <>{children}</> }}
            />
          </h2>
        )}
        {isFilled.richText(subtitle) && (
          <div className="max-w-[1037px] text-subtitle text-primary not-italic">
            <PrismicRichText field={subtitle} />
          </div>
        )}
      </div>

      {items.length > 0 && <LearningStepsCarousel items={items} />}
    </section>
  );
};

export default LearningSteps;
