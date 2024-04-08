import { CustomButton } from "@/features/ui";
import { DocTabs } from "../components";

const codeRender = `// colors
<div>
  {["default", "danger", "primary",
    "secondary", "success", "warning",
  ].map((color) => (
    <CustomButton color={color} key={color}>
      {color}
    </CustomButton>
  ))}
</div>

// variants
<div>
  {["solid", "bordered", "light",
    "flat", "faded", "shadow",
    "ghost",
  ].map((variant) => (
    <CustomButton variant={variant} key={variant}>
      {variant}
    </CustomButton>
  ))}
</div>`;

const previewRender = (
  <div className="flex flex-col gap-4">
    <div>
      <p>Colors</p>
      <div
        className={[
          "grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))]",
          "gap-1 max-w-[530px]",
        ].join(" ")}
      >
        {[
          "default",
          "danger",
          "primary",
          "secondary",
          "success",
          "warning",
        ].map((color) => (
          <CustomButton color={color} key={color}>
            {color}
          </CustomButton>
        ))}
      </div>
    </div>
    <div>
      <p>Variants</p>
      <div
        className={[
          "grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))]",
          "gap-1 max-w-[530px]",
        ].join(" ")}
      >
        {["solid", "bordered", "light", "flat", "faded", "shadow", "ghost"].map(
          (variant) => (
            <CustomButton variant={variant} key={variant}>
              {variant}
            </CustomButton>
          ),
        )}
      </div>
    </div>
  </div>
);

export default function DocCustomButton() {
  return (
    <>
      <p className="text-lg font-bold">Custom Button</p>
      <p>
        Acepta las mismas props del componente Button de NextUI. Consultar{" "}
        <a
          href="https://nextui.org/docs/components/button#api"
          rel="noreferrer noopener"
          target="_blank"
          className="text-primary-700 font-bold"
        >
          Button | NextUI
        </a>
        .
      </p>
      <DocTabs previewRender={previewRender} codeRender={codeRender} />
    </>
  );
}
