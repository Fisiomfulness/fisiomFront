import React from "react";

export const Group = ({ className }) => {
  return (
    <div className={`w-[186px] h-[65px] ${className}`}>
      <div className="relative h-[64px]">
        <img
          className="relative w-[40px] h-[40px] top-2 left-[72px] object-cover"
          alt="Logo"
          src="https://c.animaapp.com/lrtxPsMD/img/logo-1@2x.png"
        />
        <div className="title-container flex items-center justify-center">
        <div className="relative  [font-family:'Open_Sans',Helvetica] font-extrabold text-[#3daadd] text-[20px] tracking-[0] leading-[normal]">
          Fisiom
        </div>
        <div className="relative left-1 [font-family:'Raleway',Helvetica] font-extrabold text-[#565454] text-[20px] tracking-[0] leading-[normal] whitespace-nowrap">
          fulness
        </div>
        </div>
        <p className="relative [font-family:'Raleway',Helvetica] font-medium italic text-[#5f5f5f] text-[10px] tracking-[0] leading-[normal] whitespace-nowrap">
          Cuidamos tu cuerpo y sanamos tu mente
        </p>
      </div>
    </div>
  );
};