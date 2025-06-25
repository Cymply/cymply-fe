import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "w-full aspect-[5/1] inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[0.625rem] text-md transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-black-600 text-white shadow-xs hover:bg-black-600/90",
        primary: "bg-primary text-white shadow-xs hover:bg-primary/90",
        active:
          "border-3 border-solid border-primary bg-primary-light text-primary shadow-xs hover:bg-primary-light/90",
        inactive: "bg-gray-400 text-gray-900 shadow-xs hover:bg-gray-400/90",
        border:
          "border border-solid border-black-300 bg-white text-black-600 rounded-full shadow-xs hover:bg-white/90",
        kakao: "bg-kakao-yellow text-kakao-black shadow-xs hover:bg-kakao-yellow/90",
        google: "bg-white text-black-800 shadow-xs hover:bg-white/90",
        underline: "border-none bg-none text-black-200 underline",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "max-w-[42.375rem] h-[7.5rem] p-[2.625rem] has-[>svg]:p-[2.375rem] text-[2rem]",
        sm: "max-w-[20.625rem] h-[7.5rem] p-[2.625rem] has-[>svg]:p-[2.375rem] text-[2rem]",
        md: "max-w-[27.75rem] h-[5.4375rem] p-8 has-[>svg]:px-[7.5rem] text-[2rem]",
        icon: "size-[3.125rem]",
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
