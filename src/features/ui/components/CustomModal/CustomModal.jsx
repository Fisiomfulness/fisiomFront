// @ts-check
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import { twMerge } from "tailwind-merge";

/**
 * @typedef {import("@nextui-org/react").ModalBodyProps} ModalBodyProps
 * @typedef {import("@nextui-org/react").ModalFooterProps} ModalFooterProps
 * @typedef {import("@nextui-org/react").ModalHeaderProps} ModalHeaderProps
 * @typedef {import("@nextui-org/react").ModalProps} ModalProps
 */

/**
 * @type {React.FC<ModalProps>}
 */
const CustomModal = (props) => {
  const { children, className, ...otherProps } = props;

  return (
    <Modal
      placement="center"
      className={twMerge("!rounded-md max-w-fit !mx-4", className)}
      classNames={{
        closeButton: "p-1.5",
      }}
      {...otherProps}
    >
      <ModalContent className="rounded-md p-6 overflow-x-auto">
        <div className="overflow-x-auto">{children}</div>
      </ModalContent>
    </Modal>
  );
};

/**
 * @type {React.FC<React.HTMLAttributes<HTMLDivElement>>}
 */
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

/**
 * @type {React.FC<ModalHeaderProps>}
 */
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

/**
 * @type {React.FC<ModalBodyProps>}
 */
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

/**
 * @type {React.FC<ModalFooterProps>}
 */
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
