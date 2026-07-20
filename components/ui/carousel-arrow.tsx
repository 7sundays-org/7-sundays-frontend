import { ButtonHTMLAttributes, FC } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type CarouselArrowProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  direction: "left" | "right";
};

/**
 * Freccia standard dei caroselli: cerchio porcelain semi-trasparente (pieno
 * all'hover) con ombra leggera (0 2px 3px / 25%) e freccia Primary. È responsive
 * (44px su mobile, 64px da md). Il posizionamento (absolute, top/left,
 * translate…) va passato dal singolo carosello tramite `className`.
 */
export const CarouselArrow: FC<CarouselArrowProps> = ({
  direction,
  className,
  type,
  "aria-label": ariaLabel,
  ...props
}) => {
  const Icon = direction === "left" ? ArrowLeft : ArrowRight;
  return (
    <button
      type={type ?? "button"}
      aria-label={
        ariaLabel ?? (direction === "left" ? "Precedente" : "Successivo")
      }
      className={cn(
        "flex size-11 shrink-0 items-center justify-center rounded-full bg-porcelain/40 text-primary shadow-[0_2px_3px_rgba(0,0,0,0.25)] backdrop-blur-sm transition-colors hover:bg-porcelain disabled:pointer-events-none disabled:invisible md:size-16",
        className
      )}
      {...props}
    >
      <Icon className="size-5 md:size-7" strokeWidth={2.5} />
    </button>
  );
};
