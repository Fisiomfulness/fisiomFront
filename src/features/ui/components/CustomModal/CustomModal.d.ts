import {
  ModalBodyProps,
  ModalFooterProps,
  ModalHeaderProps,
  ModalProps,
} from "@nextui-org/react";
import { FC, HTMLAttributes } from "react";

const CustomModal: FC<ModalProps>;
const CustomModalSmallContent: FC<HTMLAttributes<HTMLDivElement>>;
const CustomModalHeader: FC<ModalHeaderProps>;
const CustomModalBody: FC<ModalBodyProps>;
const CustomModalFooter: FC<ModalFooterProps>;

export {
  CustomModal,
  CustomModalSmallContent,
  CustomModalHeader,
  CustomModalBody,
  CustomModalFooter,
};
