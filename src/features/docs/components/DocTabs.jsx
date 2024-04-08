"use client";

import { useState } from "react";
import { DocPreview, DocSyntax } from ".";

const Step = Object.freeze({
  Preview: 0,
  Code: 1,
});

export default function DocTabs({ previewRender, codeRender }) {
  const [step, setStep] = useState(Step.Preview);

  return (
    <div>
      <ul className="flex">
        {["Preview", "Code"].map((title, index) => (
          <li
            key={index}
            className={[
              "px-2 py-1 hover:text-primary-700 cursor-pointer",
              index === step &&
                "underline underline-offset-4 decoration-4 decoration-primary font-bold",
            ].join(" ")}
            onClick={() => setStep(index)}
          >
            {title}
          </li>
        ))}
      </ul>
      {step === Step.Preview && <DocPreview>{previewRender}</DocPreview>}
      {step === Step.Code && <DocSyntax>{codeRender}</DocSyntax>}
    </div>
  );
}
