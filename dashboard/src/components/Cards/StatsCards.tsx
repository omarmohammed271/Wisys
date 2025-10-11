'use client';

import { useResponsiveScalars } from '@/hooks/useResponsiveScalars';

interface StatCardProps {
  className?: string;
  title: string;
  icon: React.ReactNode;
  value: any;
}

export default function StatsCard(props: StatCardProps) {
  const { textScalar, iScalar } = useResponsiveScalars();

  return (
    <div
      className={`w-full p-3 flex flex-col justify-between h-fit bg-gradient-to-br from-card to-background ${props.className || ''}`}
    >
      <div className="flex justify-between items-center">
        <h2
          className="text-foreground/40 font-medium"
          style={{ fontSize: `${10 * textScalar}px` }}
        >
          {props.title}
        </h2>
        <span
          className={`text-foreground/40 *:size-full`}
          style={{ width: `${14 * textScalar}px` }}
        >
          {props.icon}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <h2
          className="font-bold"
          style={{ fontSize: `${15 * textScalar}px` }}
        >
          {props.value}
        </h2>
      </div>
    </div>
  );
}
