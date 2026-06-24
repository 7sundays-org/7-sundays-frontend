import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { CategoryCarousel } from "./CategoryCarousel";

export type CategoryShowcaseProps =
  SliceComponentProps<Content.CategoryShowcaseSlice>;

const CategoryShowcase: FC<CategoryShowcaseProps> = ({ slice }) => {
  const { cards } = slice.primary;

  if (!cards?.length) return null;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full"
    >
      <CategoryCarousel cards={cards} />
    </section>
  );
};

export default CategoryShowcase;
