import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "w-full inline-flex items-center justify-center gap-5 whitespace-nowrap rounded-[0.625rem] text-md font-bold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-black-600 text-white shadow-xs hover:bg-black-600/90",
        primary: "bg-primary text-white shadow-xs hover:bg-primary/90",
        secondary: "bg-black-200 text-white shadow-xs hover:bg-black-200/80",
        active:
          "border-3 border-solid border-primary bg-primary-light text-primary shadow-xs hover:bg-primary-light/90",
        inactive: "bg-gray-400 text-gray-900 shadow-xs hover:bg-gray-400/90",
        border:
          "border border-solid border-black-300 bg-white text-black-600 rounded-full shadow-xs hover:bg-white/90",
        kakao: "bg-kakao-yellow font-semibold text-kakao-black shadow-xs hover:bg-kakao-yellow/90",
        google: "bg-white font-semibold text-black-800 shadow-xs hover:bg-white/90",
        underline: "border-none bg-none text-black-200 underline",
        disabled: "bg-gray-800 text-white shadow-xs hover:bg-gray-800/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "max-w-[42.375rem] h-[7.5rem] pt-[2.625rem] pb-[2.625rem] has-[>svg]:p-[2.375rem] text-[2rem]",
        sm: "max-w-[20.625rem] h-[7.5rem] pt-[2.625rem] pb-[2.625rem] has-[>svg]:p-[2.375rem] text-[2rem]",
        md: "max-w-[27.75rem] h-[5.4375rem] pt-8 pd-8 has-[>svg]:px-[7.5rem] text-[2rem]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
