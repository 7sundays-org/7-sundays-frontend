"use client";

import * as React from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Brand CTA button — ghost/text style shared across the slices: Plus Jakarta
 * Sans ExtraBold (22px), uppercase, with a trailing diagonal arrow (↗).
 * Only the text color changes between contexts, hence the `variant` prop.
 *
 * On hover a 44×44 peach circle fades in behind the label and follows the
 * cursor, the text gets underlined and the cursor becomes a pointer.
 */
const buttonVariants = cva(
  "relative isolate inline-flex shrink-0 cursor-pointer items-center gap-2 text-button uppercase outline-none transition-opacity hover:underline focus-visible:ring-2 focus-visible:ring-ring/40 disabled:pointer-events-none disabled:no-underline disabled:opacity-40",
  {
    variants: {
      variant: {
        /** White — on photos / dark backgrounds (Hero, ...). */
        white: "text-white",
        /** Dark — Gun Metal on light backgrounds (Contatti, ...). */
        dark: "text-foreground",
        /** Primary — Blue State, for accented CTAs on tinted backgrounds. */
        primary: "text-brand-primary",
      },
    },
    defaultVariants: {
      variant: "dark",
    },
  }
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    /** Render as the single child element (e.g. a link) instead of a <button>. */
    asChild?: boolean;
    /** Show the trailing diagonal arrow (↗). Defaults to true. */
    arrow?: boolean;
  };

function Button({
  className,
  variant,
  asChild = false,
  arrow = true,
  children,
  onMouseEnter,
  onMouseMove,
  onMouseLeave,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  const [active, setActive] = React.useState(false);
  const [pos, setPos] = React.useState({ x: 0, y: 0 });

  const track = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant }), className)}
      onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
        setActive(true);
        track(e);
        onMouseEnter?.(e);
      }}
      onMouseMove={(e: React.MouseEvent<HTMLButtonElement>) => {
        track(e);
        onMouseMove?.(e);
      }}
      onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
        setActive(false);
        onMouseLeave?.(e);
      }}
      {...props}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 -z-10 size-11 rounded-full bg-peach transition-opacity duration-200 ease-out"
        style={{
          transform: `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`,
          opacity: active ? 1 : 0,
        }}
      />
      <Slottable>{children}</Slottable>
      {arrow && <ArrowUpRight className="size-5 shrink-0" />}
    </Comp>
  );
}

export { Button, buttonVariants };
