import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { Button } from "@/components/ui/button";

export type AboutTeaserProps = SliceComponentProps<Content.AboutTeaserSlice>;

const AboutTeaser: FC<AboutTeaserProps> = ({ slice }) => {
  const { eyebrow, title, paragraph, image, cta_text, cta_link } =
    slice.primary;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full bg-white px-6 py-16 md:px-[90px] md:pt-[120px] md:pb-10"
    >
      <div className="flex flex-col gap-2.5">
        {image?.url && (
          <div className="relative aspect-[16/7] w-full overflow-hidden rounded-[16px] bg-neutral-200">
            <PrismicNextImage
              field={image}
              fill
              fallbackAlt=""
              className="object-cover"
            />
          </div>
        )}

        <div className="flex flex-col gap-2.5">
          {eyebrow && (
            <span className="text-button text-brand-primary uppercase">
              {eyebrow}
            </span>
          )}

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-10">
            {title && (
              <div className="font-sans text-[2rem] leading-tight font-bold text-foreground md:text-[45px] md:leading-[58px]">
                <PrismicRichText field={title} />
              </div>
            )}

            {cta_link && (
              <Button
                asChild
                variant="primary"
                className="self-start md:self-auto"
              >
                <PrismicNextLink field={cta_link}>
                  {cta_text || "Conosciamoci"}
                </PrismicNextLink>
              </Button>
            )}
          </div>

          {paragraph && (
            <div className="text-body text-foreground/70">
              <PrismicRichText field={paragraph} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutTeaser;
