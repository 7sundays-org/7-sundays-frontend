import { FC } from "react";
import type * as prismic from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { isFilled } from "@prismicio/client";

type TeamPhotoSlice = prismic.SharedSlice<
  "team_photo",
  prismic.SharedSliceVariation<
    "default",
    {
      title: prismic.RichTextField;
      paragraph: prismic.RichTextField;
      group_photo: prismic.ImageField;
    },
    never
  >
>;

export type TeamPhotoProps = SliceComponentProps<TeamPhotoSlice>;

const TeamPhoto: FC<TeamPhotoProps> = ({ slice }) => {
  const { title, paragraph, group_photo } = slice.primary;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full bg-white px-6 pt-20 pb-16 md:px-[90px] md:pt-[120px] md:pb-[80px]"
    >
      <div className="flex flex-col gap-8">
        {(isFilled.richText(title) || isFilled.richText(paragraph)) && (
          <div className="flex flex-col gap-4">
            {isFilled.richText(title) && (
              <div className="font-sans text-[2rem] leading-tight font-bold text-foreground md:text-[45px] md:leading-[58px]">
                <PrismicRichText field={title} />
              </div>
            )}
            {isFilled.richText(paragraph) && (
              <div className="max-w-2xl text-body text-foreground/80">
                <PrismicRichText field={paragraph} />
              </div>
            )}
          </div>
        )}

        {group_photo?.url && (
          <div className="relative h-[75dvh] min-h-[420px] w-full overflow-hidden rounded-[16px] bg-neutral-200">
            <PrismicNextImage
              field={group_photo}
              fill
              fallbackAlt=""
              className="object-cover"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default TeamPhoto;
