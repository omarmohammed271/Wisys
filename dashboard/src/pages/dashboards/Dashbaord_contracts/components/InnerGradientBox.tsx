import React, { CSSProperties } from "react";

type InnerVariant = "first" | "second";

interface InnerGradientBoxProps {
  variant?: InnerVariant;
  children?: React.ReactNode;
  style?: CSSProperties;
  className?: string;
}

const innerStylesByVariant: Record<InnerVariant, CSSProperties> = {
  first: {
    borderRadius: "16px",
    background: `
      linear-gradient(88deg, rgba(147, 1, 145, 0.10) -0.58%, rgba(0, 0, 0, 0.04) 50.32%),
      linear-gradient(88deg, rgba(0, 0, 0, 0.04) 49.09%, rgba(147, 1, 145, 0.10) 100%)
    `,
  },
  second: {
    borderRadius: "20px",
    background: `
      linear-gradient(88deg, rgba(147, 1, 145, 0.10) -0.58%, rgba(0, 0, 0, 0.04) 50.32%),
      linear-gradient(88deg, rgba(0, 0, 0, 0.04) 49.09%, rgba(147, 1, 145, 0.10) 100%)
    `,
  },
};

export default function InnerGradientBox({
  variant = "first",
  children,
  style,
  className = "",
}: InnerGradientBoxProps) {
  return (
    <div
      className={className}
      style={{
        width: "100%",
        height: "100%",
        boxSizing: "border-box",
        ...innerStylesByVariant[variant],
        ...style,
      }}
    >
      {children}
    </div>
  );
}
