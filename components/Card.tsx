import React from "react";

export type CardProps = {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
};

export function Card({ title, subtitle, children, className }: CardProps) {
  return (
    <section
      className={[
        "rounded-lg border border-neutral-200/60 dark:border-neutral-800/60 bg-white dark:bg-neutral-950 shadow-sm",
        "p-4 sm:p-6",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <header className="mb-3">
        <h2 className="text-base font-semibold leading-tight text-foreground">
          {title}
        </h2>
        {subtitle ? (
          <p className="text-sm text-neutral-500 dark:text-neutral-400">{subtitle}</p>
        ) : null}
      </header>
      {children}
    </section>
  );
}

export default Card;


