import { FC } from "react";
import type * as prismic from "@prismicio/client";
import { isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

type LearningStepItem = {
  label: prismic.KeyTextField;
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
  const items = (steps ?? []).filter((s) => s.label);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full border-t border-black bg-white px-6 py-[80px] md:px-[81px] md:py-[120px]"
    >
      {/* Header */}
      <div className="mb-12 flex flex-col gap-4 md:mb-[80px]">
        {isFilled.richText(title) && (
          <h2 className="font-sans text-[2rem] leading-tight font-bold text-primary italic md:text-[45px]">
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

      {/* Colonne numerate */}
      {items.length > 0 && (
        <div className="overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex w-max gap-0">
            {items.map((step, i) => (
              <div
                key={i}
                className="relative flex w-[200px] shrink-0 flex-col border-l-[3px] border-primary md:w-[313px]"
              >
                {/* Numero con contorno arancione, vicino al bordo sinistro e un po' tagliato */}
                <div className="relative h-[280px] shrink-0 overflow-hidden md:h-[380px]">
                  <span
                    aria-hidden
                    className="absolute top-1/2 left-[-28px] -translate-y-1/2 font-serif leading-none font-extrabold text-transparent [-webkit-text-stroke:2px_var(--color-sandy-clay)] md:left-[-45px] md:[-webkit-text-stroke:3px_var(--color-sandy-clay)]"
                    style={{ fontSize: "clamp(200px, 15vw, 320px)" }}
                  >
                    {i + 1}
                  </span>
                </div>

                {/* Etichetta verticale specchiata (va a capo se lunga) */}
                <div className="flex h-[260px] items-start pl-4 md:h-[380px] md:pl-6">
                  <span className="max-h-full [writing-mode:vertical-rl] [text-orientation:sideways] font-serif text-[24px] leading-[1.05] font-extrabold text-primary md:text-[40px] md:leading-[45px]">
                    {step.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default LearningSteps;
