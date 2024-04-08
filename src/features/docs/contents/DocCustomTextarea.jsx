import { CustomTextarea } from "@/features/ui";
import { DocTabs, DocCode } from "../components";

const codeRender = `{["flat", "bordered"].map((variant) => (
  <CustomTextarea
    variant={variant}
    key={variant}
    placeholder={variant}
  />
))}

<CustomTextarea
  label="Con placeholder"
  placeholder="placeholder ..."
  isInvalid
  isRequired
/>

<CustomTextarea
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
        <CustomTextarea variant={variant} key={variant} placeholder={variant} />
      ))}
    </div>
    <div
      className={[
        "grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))]",
        "gap-1 max-w-[530px] pb-2",
      ].join(" ")}
    >
      <CustomTextarea
        label="Con placeholder"
        placeholder="placeholder..."
        isInvalid
        isRequired
      />
      <CustomTextarea
        label="Sin placeholder"
        placeholder=""
        isInvalid
        isRequired
      />
    </div>
  </div>
);

export default function DocCustomTextarea() {
  return (
    <>
      <p className="text-lg font-bold">Custom Textarea</p>
      <p>
        Acepta las mismas props del componente Textarea de NextUI, excepto{" "}
        <DocCode>color</DocCode>, y solo accepta las variantes{" "}
        <DocCode>flat</DocCode> y <DocCode>bordered</DocCode>. Consultar{" "}
        <a
          href="https://nextui.org/docs/components/textarea#api"
          rel="noreferrer noopener"
          target="_blank"
          className="text-primary-700 font-bold"
        >
          Textarea | NextUI
        </a>
        .
      </p>
      <DocTabs previewRender={previewRender} codeRender={codeRender} />
    </>
  );
}
