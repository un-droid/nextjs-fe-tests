"use client";

import React from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  isLoading?: boolean;
};

const baseClasses =
  "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";

const variantToClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-black text-white hover:bg-neutral-800 focus-visible:ring-black ring-offset-background",
  secondary:
    "bg-white text-black border border-neutral-200 hover:bg-neutral-100 focus-visible:ring-neutral-500 ring-offset-background",
  ghost:
    "bg-transparent text-foreground hover:bg-neutral-100/60 dark:hover:bg-neutral-900/60 focus-visible:ring-neutral-500 ring-offset-background",
};

export function Button({
  className,
  variant = "primary",
  isLoading = false,
  children,
  ...props
}: ButtonProps) {
  const classes = [baseClasses, variantToClasses[variant], className]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} {...props}>
      {isLoading ? (
        <span className="inline-flex items-center gap-2">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-300 border-t-transparent" />
          Loading
        </span>
      ) : (
        children
      )}
    </button>
  );
}

export default Button;


