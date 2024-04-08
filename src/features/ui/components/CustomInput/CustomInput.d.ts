import { InputProps } from "@nextui-org/react";
import { FC } from "react";

interface Props extends Omit<InputProps, "color" | "variant"> {
  variant?: "flat" | "bordered";
}

const CustomInput: FC<Props>;

export default CustomInput;
