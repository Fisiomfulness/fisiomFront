import { Textarea } from "@nextui-org/react";
import { mergeKeepValues } from "../../utils";
import { twMerge } from "tailwind-merge";

const CustomTextarea = (props) => {
  const { variant: _variant, color: _color, classNames, ...otherProps } = props;

  const errorMessage = otherProps.isInvalid ? "Requerido" : "";

  const defaultClassNames = {
    label: "m-0 font-normal text-base !text-inherit",
    input: "placeholder:!not-italic placeholder:text-gray-500 text-base flex-1",
    inputWrapper: twMerge(
      _variant === "flat" && "border-0 group-data-[focus=true]:border-1",
      otherProps.isInvalid && "!border-1 !border-danger",
      "!bg-zinc-200 border-gray-400 rounded-md whitespace-nowrap",
    ),
    innerWrapper: "justify-between",
    errorMessage: "text-sm",
  };

  return (
    <Textarea
      variant="bordered"
      labelPlacement="outside"
      placeholder=" "
      classNames={mergeKeepValues(defaultClassNames, classNames)}
      errorMessage={errorMessage}
      {...otherProps}
    />
  );
};

export default CustomTextarea;
