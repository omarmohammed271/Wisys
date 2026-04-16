import React from 'react';
import type { SummaryStats } from '../api/mockdata';

export const Summary = ({ Titlelable, SecondTitle, color, Value, icon }: SummaryStats & { icon: React.ReactNode }) => {
    // CSS color-mix for alpha blending
    const bgGradient = `linear-gradient(90deg, color-mix(in srgb, ${color} 20%, transparent) 50%, color-mix(in srgb, ${color} 30%, transparent) 100%)`;
    const RadiusResposive = 'clamp(0.5rem, 0.4vw, 5rem)';
    const resposvietitle = 'clamp(1rem, 1.5vw, 15rem)';
    const resposviesubtitle = 'clamp(0.8rem, 0.8vw, 15rem)';

    return (
        <div
            className="relative w-full flex flex-col items-end justify-end h-full"
            style={{
                borderRadius: RadiusResposive,
                background: bgGradient,
                padding: RadiusResposive
            }}
        >
            <div className="w-[20%] h-full absolute top-[5px] left-[10px]">
                {icon}
            </div>
            <div className="flex flex-col h-full justify-around items-end">
                <span className="font-[900]" style={{ fontSize: resposvietitle }}>
                    {Titlelable}
                </span>
                <span className="font-semibold" style={{ fontSize: resposviesubtitle }}>
                    {SecondTitle}
                </span>
                <span className="font-bold pr-2 text-[1.2rem]">
                    {Value}
                </span>
            </div>
        </div>
    );
};
