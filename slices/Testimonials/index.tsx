import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { TestimonialCard, TestimonialsCarousel } from "./TestimonialsCarousel";

export type TestimonialsProps = SliceComponentProps<Content.TestimonialsSlice>;

const Testimonials: FC<TestimonialsProps> = ({ slice }) => {
  const { title, display_mode, testimonials } = slice.primary;

  const items = testimonials ?? [];

  if (items.length === 0) return null;

  const isGrid = display_mode === "grid";

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full bg-primary px-8 pt-[62px] pb-[31px] md:py-28 md:px-6 lg:py-[121px] lg:px-[248px]"
    >
      {title && (
        <div className="mb-10 text-h4 text-white">
          <PrismicRichText field={title} />
        </div>
      )}

      {isGrid ? (
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <TestimonialCard key={i} data={item} />
          ))}
        </div>
      ) : (
        <TestimonialsCarousel items={items} />
      )}
    </section>
  );
};

export default Testimonials;
