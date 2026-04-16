import React, { type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/components/theme-provider';

interface GradientCardProps {
  children: ReactNode;
  className?: string;
  variant?: string;
}

export default function GradientCard({ children, className }: GradientCardProps) {
  const { theme } = useTheme();
  // Using custom variant dark logic from theme provider via body class
  // Let's rely on tailwind's dark: variant instead of JS evaluation if possible

  return (
    <div
      className={cn(
        "rounded-[clamp(0.5rem,0.4vw,5rem)] overflow-hidden transition-all duration-300 ease-in-out w-full h-full",
        "hover:-translate-y-1 hover:shadow-lg hover:shadow-black/10",
        "bg-white border border-gray-200 dark:bg-black dark:border-white/10",
        className
      )}
    >
      {children}
    </div>
  );
}
