import React, { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface InnerGradientBoxProps {
  children: ReactNode;
  className?: string;
  variant?: string;
}

export default function InnerGradientBox({ children, className }: InnerGradientBoxProps) {
  return (
    <div
      className={cn(
        "rounded-lg p-1 w-full h-full",
        "bg-gradient-to-r from-gray-50 to-gray-100",
        "dark:bg-gradient-to-r dark:from-[#ffffff0a] dark:to-[#ffffff1a]",
        className
      )}
    >
      {children}
    </div>
  );
}
