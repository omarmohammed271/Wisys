import React, { type ReactNode } from 'react';
import { useTheme } from '@/components/theme-provider';
import { cn } from '@/lib/utils';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <div className="overflow-hidden bg-black w-full flex justify-center items-center p-0">
      <div
        className={cn(
          "w-full flex justify-center items-center p-0 h-[calc(100vh-10vh)]",
          isDark ? "bg-[#000000ff]" : "bg-[#ffffff]"
        )}
      >
        <div
          className="grid w-full h-full p-0 m-0 gap-1 grid-cols-8"
          style={{
            gridTemplateRows: 'minmax(15vh, auto) minmax(38vh, auto) minmax(35vh, auto)',
            gridTemplateAreas: `
              "header header header header header header header header"  
              "contractsList contractsList contractsList contractsList ProgressChartCard ProgressChartCard SingleChartCard SingleChartCard"  
              "contractsList contractsList contractsList contractsList lineCharttime lineCharttime statusChart statusChart"
            `
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;