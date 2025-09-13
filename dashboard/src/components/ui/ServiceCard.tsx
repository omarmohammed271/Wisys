import { ChevronRight } from "lucide-react";
import React from "react";

interface Details {
  icon: React.ReactNode,
  title: string,
  description: string
}

const ServiceCard: React.FC<Details> = ({ icon, title, description }) => {
  return (
    <div className="max-lg:mx-10 mt-6 text-start p-4 border border-muted bg-gradient-to-br from-background/60 backdrop-blur-md
     to-accent rounded-lg shadow-[0_4px_20px_#171716FF] hover:translate-y-3 transition-all duration-500">
        <div className="*:size-7 mt-2 mb-4 text-muted-foreground bg-background w-fit p-2 rounded-md border border-muted">
            {icon}
        </div>
      <div className="flex justify-between">
        <div className="">
            <h2 className="text-3xl font-bold">{title}</h2>
        </div>
        <div>
            <ChevronRight />
        </div>
      </div>

    </div>
  );
};

export default ServiceCard;
