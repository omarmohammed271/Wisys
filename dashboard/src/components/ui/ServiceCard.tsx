import { ChevronRight } from "lucide-react";
import React from "react";

interface Details {
  icon: React.ReactNode,
  title: string,
  description: string
}

const ServiceCard: React.FC<Details> = ({ icon, title, description }) => {
  return (
    <div className="max-lg:mx-10 mt-6 text-start bg-gradient-to-br from-primary to-secondary p-[1px] backdrop-blur-md
      rounded-lg dark:shadow-[0_4px_20px_#171716FF] hover:scale-105 transition-all duration-500">
      <div className="flex rounded-lg items-center justify-between w-full h-full p-4 bg-gradient-to-br from-background to-accent">
        <div className="*:size-7 text-muted-foreground bg-background w-fit p-2 rounded-md border border-border">
            {icon}
        </div>
        <div className="">
            <h2 className="text-xl font-medium">{title}</h2>
        </div>
        <div>
            <ChevronRight />
        </div>
      </div>

    </div>
  );
};

export default ServiceCard;
