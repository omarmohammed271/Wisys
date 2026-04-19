import React, { CSSProperties } from "react";

type CardVariant = "first" | "second";

interface GradientCardProps {
  variant?: CardVariant;
  children?: React.ReactNode;
  style?: CSSProperties;
  className?: string;
}

const baseRadius = "10px";

const stylesByVariant: Record<CardVariant, CSSProperties> = {
  first: {
    borderRadius: baseRadius,
    background: `
      linear-gradient(
        88deg,
        rgba(147, 1, 145, 0.30) -0.58%,
        rgba(0, 0, 0, 0.12) 30.37%
      )
    `,
  },
  second: {
    borderRadius: baseRadius,
    background: `
      linear-gradient(
        88deg,
        rgba(0, 0, 0, 0.12) 69.05%,
        rgba(147, 1, 145, 0.30) 100%
      )
    `,
    boxShadow: `
      0 7.777px 2.222px 0 rgba(0, 0, 0, 0.00),
      0 5.555px 2.222px 0 rgba(0, 0, 0, 0.01),
      0 3.333px 2.222px 0 rgba(0, 0, 0, 0.05),
      0 1.111px 1.111px 0 rgba(0, 0, 0, 0.09),
      0 0 1.111px 0 rgba(0, 0, 0, 0.10)
    `,
  },
};

export default function GradientCard({
  variant = "first",
  children,
  style,
  className = "",
}: GradientCardProps) {
  return (
    <div
      className={className}
      style={{
        padding: "16px",
        height: "100%",
        width: "100%",
        boxSizing: "border-box",
        ...stylesByVariant[variant],
        ...style,
      }}
    >
      {children}
    </div>
  );
}
