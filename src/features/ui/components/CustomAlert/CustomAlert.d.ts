import { ButtonProps, ModalProps } from "@nextui-org/react";
import { FC, HTMLAttributes } from "react";

interface Props
  extends HTMLAttributes<HTMLDivElement>,
    Pick<ModalProps, "isOpen" | "onOpenChange" | "onClose" | "isDismissable"> {
  status?: "success" | "error" | "loading" | "question" | "info";
  onAccept?: Pick<ButtonProps, "onPress">;
  onCancel?: Pick<ButtonProps, "onPress">;
}

const CustomAlert: FC<Props>;

export default CustomAlert;
