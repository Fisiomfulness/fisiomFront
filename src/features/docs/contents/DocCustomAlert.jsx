"use client";

import { CustomAlert, CustomButton } from "@/features/ui";
import { DocCode, DocTabs } from "../components";
import { useDisclosure } from "@nextui-org/react";
import { Fragment } from "react";

const codeRender = `// constantes
const items = [
  { status: "success", color: "success" },
  { status: "error", color: "danger" },
  { status: "loading", color: "default" },
  { status: "question", color: "warning" },
  { status: "info", color: "primary" },
];

// componentes
<div
  className={
    "grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] " +
    "gap-1 max-w-[530px]"
  }
>
  {items.map(function PreviewCustomAlert({ status, color }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    return (
      <Fragment key={status}>
        <CustomButton onPress={onOpen} color={color}>
          {status}
        </CustomButton>
        <CustomAlert
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          status={status}
          onClose={onOpenChange}
          isDismissable
          onAccept={onOpenChange}
          onCancel={onOpenChange}
        >
          {status}
        </CustomAlert>
      </Fragment>
    );
  })}
</div>
`;

const PreviewRender = () => {
  const items = [
    { status: "success", color: "success" },
    { status: "error", color: "danger" },
    { status: "loading", color: "default" },
    { status: "question", color: "warning" },
    { status: "info", color: "primary" },
  ];

  return (
    <div
      className={
        "grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] " +
        "gap-1 max-w-[530px]"
      }
    >
      {items.map(function PreviewCustomAlert({ status, color }) {
        const { isOpen, onOpen, onOpenChange } = useDisclosure();
        return (
          <Fragment key={status}>
            <CustomButton onPress={onOpen} color={color}>
              {status}
            </CustomButton>
            <CustomAlert
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              status={status}
              onClose={onOpenChange}
              isDismissable
              onAccept={onOpenChange}
              onCancel={onOpenChange}
            >
              {status}
            </CustomAlert>
          </Fragment>
        );
      })}
    </div>
  );
};

export default function DocCustomButton() {
  return (
    <>
      <p className="text-lg font-bold">Custom Alert</p>
      <div>
        <p>
          Acepta las mismas props que un <DocCode>div</DocCode>, excepto su
          referencia. Hereda las props <DocCode>isDismissable</DocCode>,{" "}
          <DocCode>isOpen</DocCode>, <DocCode>onClose</DocCode> y{" "}
          <DocCode>onOpenChange</DocCode> de CustomModal. Tambien acepta la prop{" "}
          <DocCode>status</DocCode> que puede ser{" "}
          <DocCode>{`"success"`}</DocCode> | <DocCode>{`"error"`}</DocCode> |{" "}
          <DocCode>{`"loading"`}</DocCode> | <DocCode>{`"question"`}</DocCode> |{" "}
          <DocCode>{`"info"`}</DocCode>, y las prop <DocCode>onAccept</DocCode>{" "}
          y <DocCode>onCancel</DocCode> cuando el status es {'"question"'}.
        </p>
      </div>
      <DocTabs previewRender={PreviewRender()} codeRender={codeRender} />
    </>
  );
}
