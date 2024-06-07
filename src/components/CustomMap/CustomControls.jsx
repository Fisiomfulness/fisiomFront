"use client";

import { useAtom } from "jotai";
import { locationAtom } from "../Servicios/store/servicios";
import { TbFocusCentered } from "react-icons/tb";
import { ZoomControl, useMap } from "react-leaflet";
import Control from 'react-leaflet-custom-control';


const CustomControls = () => {
  const map = useMap();
  const [locations] = useAtom(locationAtom);
  
  const handleClick = () => {
    map.panTo(locations.user);
  };

  return (
    <>
      <ZoomControl position="topleft"/>
      <Custom position="topleft">
        <button onClick={handleClick}>
          <TbFocusCentered/>
        </button>
      </Custom>
    </>
  );
};

export default CustomControls;
