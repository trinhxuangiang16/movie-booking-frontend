import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
        gradient:
          "bg-[linear-gradient(90deg,#ffccf2,#97dde8)] text-black hover:brightness-110",
        clipButton:
          "bg-gradient-to-r from-[#63eaff] to-[#ff88e1] bg-clip-text text-transparent",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        icon: "size-8",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);


const cinemaButtonVariants = {
  bannerCta:
    "group relative overflow-hidden bg-white px-9 py-4 text-xs font-bold uppercase tracking-[0.18em] text-black transition-all [clip-path:polygon(9px_0,100%_0,100%_calc(100%-9px),calc(100%-9px)_100%,0_100%,0_9px)] hover:tracking-[0.28em]",
  bannerRating:
    "flex items-center gap-2 px-6 py-4 text-xs font-bold tracking-wider transition-all [clip-path:polygon(9px_0,100%_0,100%_calc(100%-9px),calc(100%-9px)_100%,0_100%,0_9px)] border border-white/15 bg-[#0d1230]/60 text-white hover:border-[#63eaff]/50 hover:shadow-[0_0_22px_-6px_rgba(99,234,255,.5)]",
  bannerRatingActive:
    "flex items-center gap-2 px-6 py-4 text-xs font-bold tracking-wider transition-all [clip-path:polygon(9px_0,100%_0,100%_calc(100%-9px),calc(100%-9px)_100%,0_100%,0_9px)] bg-gradient-to-r from-[#63eaff] to-[#ff88e1] text-black shadow-[0_0_34px_-6px_rgba(192,132,252,.8)]",
  bannerTrailer:
    "group grid h-12 w-12 place-items-center transition-all [clip-path:polygon(9px_0,100%_0,100%_calc(100%-9px),calc(100%-9px)_100%,0_100%,0_9px)] border border-white/15 bg-[#0d1230]/60 text-white hover:border-[#ff88e1]/50 hover:shadow-[0_0_22px_-6px_rgba(255,136,225,.5)]",
  bannerTrailerActive:
    "group grid h-12 w-12 place-items-center transition-all [clip-path:polygon(9px_0,100%_0,100%_calc(100%-9px),calc(100%-9px)_100%,0_100%,0_9px)] bg-gradient-to-r from-[#63eaff] to-[#ff88e1] text-black shadow-[0_0_34px_-6px_rgba(192,132,252,.8)]",

  cardCta:
    "group relative inline-flex items-center overflow-hidden bg-gradient-to-r from-[#63eaff] to-[#ff88e1] px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#06101c] transition-all [clip-path:polygon(7px_0,100%_0,100%_calc(100%-7px),calc(100%-7px)_100%,0_100%,0_7px)] hover:shadow-[0_8px_24px_-6px_rgba(192,132,252,.7)] hover:tracking-[0.24em]",

  stepperMinus:
    "grid h-8 w-8 place-items-center border text-lg leading-none transition-all [clip-path:polygon(6px_0,100%_0,100%_calc(100%-6px),calc(100%-6px)_100%,0_100%,0_6px)] border-white/25 text-white/80 hover:border-[#ff88e1]/60 hover:text-[#ff88e1]",
  stepperMinusDisabled:
    "grid h-8 w-8 place-items-center border text-lg leading-none transition-all [clip-path:polygon(6px_0,100%_0,100%_calc(100%-6px),calc(100%-6px)_100%,0_100%,0_6px)] cursor-not-allowed border-white/[.08] text-white/20",
  stepperPlus:
    "grid h-8 w-8 place-items-center border text-lg leading-none transition-all [clip-path:polygon(6px_0,100%_0,100%_calc(100%-6px),calc(100%-6px)_100%,0_100%,0_6px)] border-white/25 text-white/80 hover:border-[#63eaff]/60 hover:text-[#7fefff] hover:shadow-[0_0_10px_-2px_rgba(99,234,255,.5)]",

  modalClose:
    "grid h-8 w-8 place-items-center border border-white/15 text-white/60 transition hover:border-[#ff88e1]/60 hover:text-[#ff88e1] [clip-path:polygon(5px_0,100%_0,100%_calc(100%-5px),calc(100%-5px)_100%,0_100%,0_5px)]",
  payMethod:
    "flex items-center gap-4 border px-4 py-3 text-left transition-all [clip-path:polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)] border-white/10 hover:border-white/25",
  payMethodActive:
    "flex items-center gap-4 border px-4 py-3 text-left transition-all [clip-path:polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)] border-transparent bg-white/[.05]",
  payRetry:
    "flex-1 border border-[#63eaff]/50 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[#7fefff] transition hover:bg-[#63eaff]/10 [clip-path:polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)]",
  payDismiss:
    "flex-1 border border-white/15 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white/60 transition hover:border-white/35 hover:text-white [clip-path:polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)]",


  payment:
    "group relative w-full overflow-hidden py-3.5 text-sm font-bold uppercase tracking-[0.22em] transition-all [clip-path:polygon(9px_0,100%_0,100%_calc(100%-9px),calc(100%-9px)_100%,0_100%,0_9px)] bg-gradient-to-r from-[#63eaff] to-[#ff88e1] text-[#06101c] hover:shadow-[0_10px_34px_-8px_rgba(192,132,252,.7)]",
  paymentDisabled:
    "group relative w-full overflow-hidden py-3.5 text-sm font-bold uppercase tracking-[0.22em] transition-all [clip-path:polygon(9px_0,100%_0,100%_calc(100%-9px),calc(100%-9px)_100%,0_100%,0_9px)] cursor-not-allowed bg-white/[.06] text-white/25",

  seatBooked:
    "relative flex h-8 w-8 items-center justify-center text-[10px] font-semibold tracking-wide transition-all duration-200 [clip-path:polygon(5px_0,100%_0,100%_calc(100%-5px),calc(100%-5px)_100%,0_100%,0_5px)] bg-white/[.04] text-white/20 border border-white/[.06] cursor-not-allowed",
  seatSelected:
    "relative flex h-8 w-8 items-center justify-center text-[10px] font-semibold tracking-wide transition-all duration-200 [clip-path:polygon(5px_0,100%_0,100%_calc(100%-5px),calc(100%-5px)_100%,0_100%,0_5px)] bg-gradient-to-b from-[#8ff3ff] to-[#4fc9e8] text-[#06202b] border border-transparent shadow-[0_0_14px_rgba(99,234,255,.65)] scale-[1.08]",
  seatVip:
    "relative flex h-8 w-8 items-center justify-center text-[10px] font-semibold tracking-wide transition-all duration-200 [clip-path:polygon(5px_0,100%_0,100%_calc(100%-5px),calc(100%-5px)_100%,0_100%,0_5px)] bg-[#e8c46a]/[.09] text-[#e8c46a] border border-[#e8c46a]/45 hover:bg-[#e8c46a]/25 hover:shadow-[0_0_10px_rgba(232,196,106,.4)]",
  seatCouple:
    "relative flex h-8 w-8 items-center justify-center text-[10px] font-semibold tracking-wide transition-all duration-200 [clip-path:polygon(5px_0,100%_0,100%_calc(100%-5px),calc(100%-5px)_100%,0_100%,0_5px)] bg-[#ff88e1]/[.09] text-[#ff9fe7] border border-[#ff88e1]/45 hover:bg-[#ff88e1]/25 hover:shadow-[0_0_10px_rgba(255,136,225,.4)]",
  seatStandard:
    "relative flex h-8 w-8 items-center justify-center text-[10px] font-semibold tracking-wide transition-all duration-200 [clip-path:polygon(5px_0,100%_0,100%_calc(100%-5px),calc(100%-5px)_100%,0_100%,0_5px)] bg-white/[.06] text-white/75 border border-white/20 hover:bg-white/[.16] hover:border-white/45",
} as const;

type CinemaButtonVariant = keyof typeof cinemaButtonVariants;

type ButtonVariant =
  | NonNullable<VariantProps<typeof buttonVariants>["variant"]>
  | CinemaButtonVariant;

function isCinemaVariant(
  variant: ButtonVariant | null | undefined,
): variant is CinemaButtonVariant {
  return variant != null && variant in cinemaButtonVariants;
}

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  Omit<VariantProps<typeof buttonVariants>, "variant"> & {
    variant?: ButtonVariant;
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  if (isCinemaVariant(variant)) {
    return (
      <Comp
        className={cn(cinemaButtonVariants[variant], className)}
        {...props}
      />
    );
  }

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants, cinemaButtonVariants };
export type { ButtonVariant, CinemaButtonVariant };
