import { CustomLogo } from "@/features/ui";
import { DocTabs, DocCode } from "../components";

const codeRender = `// Dark
<CustomLogo
  color="dark"
  className={[
    "bg-gradient-to-b from-primary-100 to-primary-300",
    "p-2 rounded-md",
  ].join(" ")}
/>

// Light
<CustomLogo
  color="light"
  className={[
    "bg-gradient-to-b from-secondary-600 to-secondary-500",
    "p-2 rounded-md",
  ].join(" ")}
/>
`;

const previewRender = (
  <div className="flex flex-col gap-2 max-w-80">
    <p>Dark</p>
    <CustomLogo
      color="dark"
      className={[
        "bg-gradient-to-b from-primary-100 to-primary-300",
        "p-2 rounded-md",
      ].join(" ")}
    />
    <p>Light</p>
    <CustomLogo
      color="light"
      className={[
        "bg-gradient-to-b from-secondary-600 to-secondary-500",
        "p-2 rounded-md",
      ].join(" ")}
    />
  </div>
);

export default function DocCustomLogo() {
  return (
    <>
      <p className="text-lg font-bold">Custom Logo</p>
      <p>
        Acepta la prop <DocCode>color</DocCode> que puede ser{" "}
        <DocCode>light</DocCode> o <DocCode>dark</DocCode>, y las props de la
        etiqueta <DocCode>img</DocCode>.
      </p>

      <DocTabs previewRender={previewRender} codeRender={codeRender} />
    </>
  );
}
