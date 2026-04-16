import React from 'react';
import { cn } from '@/lib/utils';
import { TABLE_STYLES } from '../constants/tableConstants';
import IconWrapper from './IconWrapper';

interface CardHeaderProps {
  title?: string;
  icon?: string | React.ReactNode;
}

export default function CardHeader({ title, icon }: CardHeaderProps) {
  return (
    <div className="flex justify-end gap-1 content-center h-[10%] min-h-[40px] pb-2">
      <h3
        className={cn(
          "text-center m-0 mt-[1px] font-black",
          TABLE_STYLES.chartTitleFontSize
        )}
      >
        {title}
      </h3>
      <div
        className="flex items-center justify-center rounded-full bg-[#F2F2F2] max-md:w-[1rem] max-md:h-[1rem] w-[1.5vw] h-[3vh]"
      >
        <IconWrapper 
          icon={icon || ''} 
          className="text-black max-md:w-[0.6rem] md:w-[1vw]" 
        />
      </div>
    </div>
  );
}
