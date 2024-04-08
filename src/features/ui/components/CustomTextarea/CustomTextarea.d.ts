import { TextAreaProps } from "@nextui-org/react";
import { FC } from "react";

interface Props extends Omit<TextAreaProps, "color" | "variant"> {
  variant?: "flat" | "bordered";
}

const CustomTextarea: FC<Props>;

export default CustomTextarea;
