// components/ui/radio-group.tsx
"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const radioGroupVariants = cva("grid gap-2", {
  variants: {
    orientation: {
      vertical: "flex flex-col",
      horizontal: "flex flex-row",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
});

const radioItemVariants = cva(
  "inline-flex items-center justify-center px-4 py-4 rounded-md border transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: [
          "border border-gray-300 text-gray-700 hover:bg-gray-50",
          "data-[state=checked]:bg-primary-light data-[state=checked]:text-primary-accent data-[state=checked]:!border-[1px] data-[state=checked]:!border-solid data-[state=checked]:!border-primary-accent data-[state=checked]:font-bold",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> &
    VariantProps<typeof radioGroupVariants>
>(({ className, orientation, ...props }, ref) => (
  <RadioGroupPrimitive.Root
    ref={ref}
    className={cn(radioGroupVariants({ orientation }), className)}
    {...props}
  />
));
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> &
    VariantProps<typeof radioItemVariants>
>(({ className, variant, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    className={cn(radioItemVariants({ variant }), className)}
    {...props}
  >
    {props.children}
    <RadioGroupPrimitive.Indicator className="flex items-center justify-center"></RadioGroupPrimitive.Indicator>
  </RadioGroupPrimitive.Item>
));
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem, radioItemVariants };
