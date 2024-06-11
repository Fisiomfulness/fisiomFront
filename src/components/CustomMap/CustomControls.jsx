"use client";

import { useAtom } from "jotai";
import { locationAtom } from "../Servicios/store/servicios";
import { TbFocusCentered } from "react-icons/tb";
import { ZoomControl, useMap } from "react-leaflet";
import Control from "react-leaflet-custom-control";

const CustomControls = () => {
  const map = useMap();
  const [locations] = useAtom(locationAtom);

  const handleClick = () => {
    map.panTo(locations.user);
  };

  return (
    <>
      <ZoomControl position="topleft" />
      {locations.user && (
        <Control position="topleft">
          <div>
            <button
              className="w-[30px] h-[30px] ml-[2px] mt-[-5px] bg-gray-50 border-1 rounded-[4px] border-gray-500 drop-shadow-sm flex justify-center items-center"
              onClick={handleClick}
            >
              <TbFocusCentered className="text-xl" />
            </button>
          </div>
        </Control>
      )}
    </>
  );
};

export default CustomControls;
