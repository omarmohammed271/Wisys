import React from "react";

interface Details {
  icon: React.ReactNode,
  title: string,
  description: string
}

const ServiceCard: React.FC<Details> = ({ icon, title, description }) => {
  return (
    <div className="max-lg:mx-10 mt-6 text-start p-4 border border-secondary bg-gradient-to-br from-background/60 backdrop-blur-md
     to-accent rounded-lg shadow-[0_4px_20px_#171716FF] hover:translate-y-3 transition-all duration-500">

      <div className="*:size-7 mt-2 mb-4 text-slate-600 bg-background w-fit p-2 rounded-md border border-secondary">{icon}</div>
      <div className="">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="mt-2 text-slate-300">{description}</p>
      </div>

    </div>
  );
};

export default ServiceCard;
