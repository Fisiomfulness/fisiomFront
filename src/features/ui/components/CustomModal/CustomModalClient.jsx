"use client";

import { useLayoutEffect } from "react";

const CustomModalClient = (props) => {
  const { children, isOpen } = props;

  useLayoutEffect(() => {
    const docElement = document.documentElement;
    const nav = document.querySelector("nav");
    const footer = document.querySelector("footer");

    const originalDocElementStyle = window.getComputedStyle(docElement);

    const originalDocElementOverflow = originalDocElementStyle.overflow;
    const originalDocElementPaddingRight = originalDocElementStyle.paddingRight;

    if (isOpen) {
      docElement.style.overflow = "hidden";
      docElement.style.paddingRight = "0.6rem";
      footer.style.width = "100vw";
      footer.style.paddingRight = "0.6rem";
      nav.style.width = "100vw";
      nav.style.paddingRight = "0.6rem";
    }

    return () => {
      if (isOpen) {
        docElement.style.overflow = originalDocElementOverflow;
        docElement.style.paddingRight = originalDocElementPaddingRight;
        footer.style.width = "";
        footer.style.paddingRight = "";
        nav.style.width = "";
        nav.style.paddingRight = "";
      }
    };
  }, [isOpen]);

  return <>{children}</>;
};

export { CustomModalClient };
