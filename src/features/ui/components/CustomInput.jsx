// @ts-check
import { Input } from "@nextui-org/input";
import { mergeKeepValues } from "../utils";
import { twMerge } from "tailwind-merge";

/**
 * @typedef {import("@nextui-org/react").InputProps} InputProps
 * @typedef {{
 *   variant?: "flat" | "bordered";
 * } & Omit<InputProps, "color" | "variant">} Props
 */

/**
 * @type {React.FC<Props>}
 * @returns {React.ReactNode}
 */
const CustomInput = (props) => {
  const { variant: _variant, classNames, ...otherProps } = props;

  const errorMessage = otherProps.isInvalid ? "Requerido" : "";

  const defaultClassNames = {
    label: "m-0 font-normal text-base !text-inherit",
    base: twMerge(_variant === "bordered" && otherProps.label && "!mt-8"),
    input:
      "placeholder:!not-italic placeholder:text-gray-500 " +
      "text-base flex-1 !w-auto overflow-hidden",
    inputWrapper: twMerge(
      _variant === "flat" && "border-0 group-data-[focus=true]:border-1",
      otherProps.isInvalid && "!border-1 !border-danger",
      "!bg-zinc-200 border-zinc-400 rounded-md whitespace-nowrap",
    ),
    innerWrapper: "justify-between",
    errorMessage: "text-sm",
  };

  return (
    <Input
      variant="bordered"
      labelPlacement="outside"
      placeholder=" "
      classNames={mergeKeepValues(defaultClassNames, classNames)}
      errorMessage={errorMessage}
      {...otherProps}
    />
  );
};

export default CustomInput;
