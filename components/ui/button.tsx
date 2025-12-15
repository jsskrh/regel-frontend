import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "font-normal text-base text-center flex relative items-center border-[0.5px] justify-center relative transition-all inline-flex items-center justify-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 transition-all",
  {
    variants: {
      variant: {
        // default: "text-primary-foreground border-transparent",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "text-primary-foreground border-black",
        "outline-fill": "text-primary-foreground border-black bg-white",
        primary: "bg-primary border-primary hover:bg-primary/80 text-white",
        secondary:
          "bg-gradient-to-r from-default to-secondary border-transparent hover:bg-linear-to-r/80",
        default:
          "bg-gradient-to-r from-[#2B5EA9] to-[#2BAF75] border-transparent hover:bg-linear-to-r/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        white: "bg-white hover:bg-white border-0",
        black:
          "bg-black text-white hover:bg-[#383838] disabled:text-neutral-600 disabled:bg-neutral-200",
        link: "text-default underline-offset-4 hover:underline outline-none shadow-none",
        themed: "text-white bg-default rounded-none",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 px-4 py-2",
        lg: "h-14 rounded-lg px-9",
        xl: "h-12 px-2 rounded-lg text-base",
        none: "p-0",
        icon: "h-9 w-9",
        "themed-default": "py-3 md:py-4 px-5 md:px-7",
        "themed-sm": "pt-[0.78125rem] px-[1.05rem] pb-[0.885625rem]",
      },
      behaviour: {
        default:
          "before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-default-light before:[transform:scaleX(0)] before:transition-all before:origin-left hover:before:[transform:scaleX(1)] before:duration-300 after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-default-dark after:[transform:scaleX(0)] after:transition-all after:origin-left hover:after:[transform:scaleX(1)] after:delay-150 after:duration-300",
        none: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      behaviour: "none",
    },
  }
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        <div className="z-10 flex items-center justify-center gap-x-2">
          {props.children}
        </div>
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
