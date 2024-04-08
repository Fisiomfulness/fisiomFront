import { FC, ImgHTMLAttributes } from "react";

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  color?: "light" | "dark";
}

const CustomLogo: FC<Props>;

export default CustomLogo;
