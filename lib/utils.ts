import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * The project's custom typography utilities (defined in globals.css) are all
 * named `text-*`, which tailwind-merge would otherwise treat as font-size/color
 * classes and silently drop when combined with a real `text-{color}`. Register
 * them in the `font-size` group so they survive alongside a color override and
 * still replace one another (only one type scale at a time).
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "h1",
            "h2",
            "h2-italic",
            "h3",
            "h4",
            "title",
            "subtitle",
            "button",
            "body",
            "body-title",
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
