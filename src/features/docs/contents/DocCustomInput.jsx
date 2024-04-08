import { CustomInput } from "@/features/ui";
import { DocTabs, DocCode } from "../components";

const codeRender = `{["flat", "bordered"].map((variant) => (
  <CustomInput
    variant={variant}
    key={variant}
    placeholder={variant}
  />
))}

<CustomInput
  label="Con placeholder"
  placeholder="placeholder ..."
  isInvalid
  isRequired
/>

<CustomInput
  label="Sin placeholder"
  placeholder=""
  isInvalid
  isRequired
/>
`;

const previewRender = (
  <div className="flex flex-col gap-2">
    <p>Variants</p>
    <div
      className={[
        "grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))]",
        "gap-1 max-w-[530px] pb-2",
      ].join(" ")}
    >
      {["flat", "bordered"].map((variant) => (
        <CustomInput variant={variant} key={variant} placeholder={variant} />
      ))}
    </div>
    <div
      className={[
        "grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))]",
        "gap-1 max-w-[530px] pb-2",
      ].join(" ")}
    >
      <CustomInput
        label="Con placeholder"
        placeholder="placeholder..."
        isInvalid
        isRequired
      />
      <CustomInput
        label="Sin placeholder"
        placeholder=""
        isInvalid
        isRequired
      />
    </div>
  </div>
);

export default function DocCustomInput() {
  return (
    <>
      <p className="text-lg font-bold">Custom Input</p>
      <p>
        Acepta las mismas props del componente Input de NextUI, excepto{" "}
        <DocCode>color</DocCode> y solo accepta las variantes{" "}
        <DocCode>flat</DocCode> y <DocCode>bordered</DocCode>. Consultar{" "}
        <a
          href="https://nextui.org/docs/components/input#api"
          rel="noreferrer noopener"
          target="_blank"
          className="text-primary-700 font-bold"
        >
          Input | NextUI
        </a>
        .
      </p>
      <DocTabs previewRender={previewRender} codeRender={codeRender} />
    </>
  );
}
