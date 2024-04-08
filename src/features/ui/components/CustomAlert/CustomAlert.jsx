import { AiOutlineQuestionCircle } from "react-icons/ai";
import {
  CustomModalBody,
  CustomModalFooter,
  CustomModalSmallContent,
  CustomButton,
  CustomModal,
} from "../..";

import { MdOutlineCached, MdOutlineCheckCircle } from "react-icons/md";
import { MdErrorOutline } from "react-icons/md";

const defaultIconMapping = {
  success: <MdOutlineCheckCircle className="w-10 h-10 text-primary mb-4" />,
  error: <MdErrorOutline className="w-10 h-10 text-red-500 mb-4" />,
  loading: (
    <MdOutlineCached className="w-10 h-10 text-primary mb-4 animate-reverse-spin" />
  ),
  question: (
    <AiOutlineQuestionCircle className="w-10 h-10 mb-4 text-primary-800" />
  ),
  info: <MdErrorOutline className="w-10 h-10 text-primary mb-4" />,
};

const Status = Object.freeze({
  Success: "success",
  Error: "error",
  Loading: "loading",
  Question: "question",
  Info: "info",
});

const CustomAlert = (props) => {
  const {
    className,
    isOpen,
    onOpenChange,
    onClose,
    status: _status,
    children,
    isDismissable = false,
    onAccept,
    onCancel,
  } = props;

  const status = _status || Status.Success;

  const buttons = {
    question: (
      <>
        <CustomButton className="mb-2" onPress={onAccept}>
          Aceptar
        </CustomButton>
        <CustomButton color="secondary" onPress={onCancel}>
          Cancelar
        </CustomButton>
      </>
    ),
    default: <CustomButton onPress={onClose}>Volver</CustomButton>,
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={isDismissable}
      className={className}
      hideCloseButton
    >
      <CustomModalSmallContent>
        <CustomModalBody>
          {defaultIconMapping[status]}
          {children}
        </CustomModalBody>
        <CustomModalFooter>
          {status !== Status.Loading
            ? buttons[status] || buttons.default
            : null}
        </CustomModalFooter>
      </CustomModalSmallContent>
    </CustomModal>
  );
};

export default CustomAlert;
