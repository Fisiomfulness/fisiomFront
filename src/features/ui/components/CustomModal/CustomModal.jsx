import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { CustomModalClient } from "./CustomModalClient";
import { twMerge } from "tailwind-merge";

const CustomModal = (props) => {
  const { children, className, ...otherProps } = props;

  const content =
    typeof children === "function" ? (
      (onClose) => <div className="overflow-x-auto">{children(onClose)}</div>
    ) : (
      <div className="overflow-x-auto">{children}</div>
    );

  return (
    <CustomModalClient isOpen={otherProps.isOpen}>
      <Modal
        placement="center"
        className={twMerge("!rounded-md max-w-fit !mx-4", className)}
        classNames={{
          closeButton: "p-1.5",
        }}
        {...otherProps}
      >
        <ModalContent className="rounded-md p-6 overflow-x-auto">
          {content}
        </ModalContent>
      </Modal>
    </CustomModalClient>
  );
};

const CustomModalSmallContent = (props) => {
  const { children, className, ...otherProps } = props;

  return (
    <div
      className={twMerge("h-72 w-56", "flex flex-col", className)}
      {...otherProps}
    >
      {children}
    </div>
  );
};

const CustomModalHeader = (props) => {
  const { children, className, ...otherProps } = props;

  return (
    <ModalHeader
      className={twMerge("flex text-base font-normal p-0 gap-0", className)}
      {...otherProps}
    >
      {children}
    </ModalHeader>
  );
};

const CustomModalBody = (props) => {
  const { children, className, ...otherProps } = props;

  return (
    <ModalBody
      className={twMerge(
        "flex flex-1 flex-col justify-center items-center",
        "p-0 gap-0",
        className,
      )}
      {...otherProps}
    >
      {children}
    </ModalBody>
  );
};

const CustomModalFooter = (props) => {
  const { children, className, ...otherProps } = props;

  return (
    <ModalFooter
      className={twMerge("flex flex-col", "p-0 gap-0", className)}
      {...otherProps}
    >
      {children}
    </ModalFooter>
  );
};

export {
  CustomModal,
  CustomModalSmallContent,
  CustomModalHeader,
  CustomModalBody,
  CustomModalFooter,
};
