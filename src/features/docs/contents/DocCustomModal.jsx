"use client";

import {
  CustomButton,
  CustomModal,
  CustomModalBody,
  CustomModalFooter,
  CustomModalHeader,
  CustomModalSmallContent,
} from "@/features/ui";
import { useDisclosure } from "@nextui-org/react";
import { DocCode, DocTabs } from "../components";

const codeRender = `// Custom Modal
<CustomButton onPress={onOpen}>Custom Modal</CustomButton>
<CustomModal isOpen={isOpen} onOpenChange={onOpenChange}>
  <CustomModalHeader className="bg-red-400">
    Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
    cillum sint consectetur cupidatat.
  </CustomModalHeader>
  <CustomModalBody className="bg-blue-400">
    Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
    cillum sint consectetur cupidatat.
  </CustomModalBody>
  <CustomModalFooter className="bg-green-400">
    Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
    cillum sint consectetur cupidatat.
  </CustomModalFooter>
</CustomModal>

// Small Content
<CustomButton onPress={onOpen2}>Small Content</CustomButton>
<CustomModal isOpen={isOpen2} onOpenChange={onOpenChange2}>
  <CustomModalSmallContent>
    <CustomModalHeader className="bg-red-400">Header</CustomModalHeader>
    <CustomModalBody className="bg-blue-400">Body</CustomModalBody>
    <CustomModalFooter className="bg-green-400">
      Footer
    </CustomModalFooter>
  </CustomModalSmallContent>
</CustomModal>
`;

const PreviewRender = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onOpenChange: onOpenChange2,
  } = useDisclosure();

  return (
    <div className="flex gap-2">
      <CustomButton onPress={onOpen}>Custom Modal</CustomButton>
      <CustomModal isOpen={isOpen} onOpenChange={onOpenChange}>
        <CustomModalHeader className="bg-red-400">
          Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
          cillum sint consectetur cupidatat.
        </CustomModalHeader>
        <CustomModalBody className="bg-blue-400">
          Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
          cillum sint consectetur cupidatat.
        </CustomModalBody>
        <CustomModalFooter className="bg-green-400">
          Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
          cillum sint consectetur cupidatat.
        </CustomModalFooter>
      </CustomModal>
      <CustomButton onPress={onOpen2}>Small Content</CustomButton>
      <CustomModal isOpen={isOpen2} onOpenChange={onOpenChange2}>
        <CustomModalSmallContent>
          <CustomModalHeader className="bg-red-400">Header</CustomModalHeader>
          <CustomModalBody className="bg-blue-400">Body</CustomModalBody>
          <CustomModalFooter className="bg-green-400">Footer</CustomModalFooter>
        </CustomModalSmallContent>
      </CustomModal>
    </div>
  );
};

export default function DocCustomModal() {
  return (
    <>
      <p className="text-lg font-bold">Custom Modal</p>
      <div>
        <p>
          Acepta las mismas props del componente Modal de NextUI. La composicion
          es la siguiente:
        </p>
        <div className="py-2">
          <p>
            <DocCode>ModalHeader</DocCode> {"-->"}{" "}
            <DocCode>CustomModalHeader</DocCode>
          </p>
          <p>
            <DocCode>ModalBody</DocCode> {"-->"}{" "}
            <DocCode>CustomModalBody</DocCode>
          </p>
          <p>
            <DocCode>ModalFooter</DocCode> {"-->"}{" "}
            <DocCode>CustomModalFooter</DocCode>
          </p>
        </div>
        <p>
          Ya no es necesario el uso de <DocCode>ModalContent</DocCode>, en su
          lugar use un <DocCode>div</DocCode>. Si necesita crear una
          notificacion puede usar <DocCode>CustomModalSmallContent</DocCode>.
        </p>
        Consultar{" "}
        <a
          href="https://nextui.org/docs/components/modal#modal-props"
          rel="noreferrer noopener"
          target="_blank"
          className="text-primary-700 font-bold"
        >
          Modal | NextUI
        </a>
        .
      </div>
      <DocTabs previewRender={PreviewRender()} codeRender={codeRender} />
    </>
  );
}
