"use client";
import { PopupButton } from "react-calendly";
import { useEffect, useState } from "react";

export default function CalendlyButton({ calendlyLink }) {
  const [rootElement, setRootElement] = useState(null);

  useEffect(() => {
    // Wait for the component to be mounted before setting the rootElement
    if (typeof window !== "undefined") {
      setRootElement(document.getElementById("main"));
    }
  }, []);

  if (!rootElement) return null;

  return (
    <div className="cal_div">
      <PopupButton
        disabled
        className="rounded-md bg-secondary py-4 px-8 text-sm font-semibold text-white duration-300 ease-in-out hover:bg-secondary/80"
        url={calendlyLink}
        rootElement={rootElement}
        text="Agenda una consulta"
      />
    </div>
  );
}
