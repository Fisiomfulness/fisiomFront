import { cx } from "class-variance-authority";
import { DocCode, DocSyntax, DocTabs } from "../components";
import { twMerge } from "tailwind-merge";

const codeString = `import { twMerge } from "tailwind-merge";

const result = twMerge(
  "px-2 py-1 bg-red hover:bg-dark-red",
  "p-3 bg-[#B91C1C]",
  false && "text-green-100",
  true && ["p-2", false ? "leading-8" : "leading-7"],
)

console.log(result)
// hover:bg-dark-red bg-[#B91C1C] p-2 leading-7`;

const codeRender = `// Usando \`twMerge\`
<div className={twMerge(
  "w-24 h-24",
  "bg-red-500",
  "bg-green-500",
  "bg-blue-500",
)} // w-24 h-24 bg-blue-500
></div>

// Usando \`cx\`
<div className={cx(
  "w-24 h-24",
  "bg-red-500",
  "bg-green-500",
  "bg-blue-500",
)} // w-24 h-24 bg-red-500 bg-green-500 bg-blue-500
></div>`;

const previewRender = (
  <div className="flex gap-8 [&>div>div]:mx-auto [&>div]:text-center">
    <div>
      <p>
        Usando <DocCode>twMerge</DocCode>
      </p>
      <div
        className={twMerge(
          "w-24 h-24",
          "bg-red-500",
          "bg-green-500",
          "bg-blue-500",
        )}
      ></div>
    </div>
    <div>
      <p>
        Usando <DocCode>cx</DocCode>
      </p>
      <div
        className={cx("w-24 h-24", "bg-red-500", "bg-green-500", "bg-blue-500")}
      ></div>
    </div>
  </div>
);

export default function DocCn() {
  return (
    <>
      <p className="text-lg font-bold">twMerge</p>
      <p>
        Fusiona de manera eficiente las clases CSS de Tailwind en JS sin
        conflictos de estilo. Consultar{" "}
        <a
          href="https://github.com/dcastil/tailwind-merge#tailwind-merge"
          rel="noreferrer noopener"
          target="_blank"
          className="text-primary-700 font-bold"
        >
          twMerge
        </a>
        .
      </p>
      <DocSyntax>{codeString}</DocSyntax>
      <DocTabs previewRender={previewRender} codeRender={codeRender} />
    </>
  );
}
