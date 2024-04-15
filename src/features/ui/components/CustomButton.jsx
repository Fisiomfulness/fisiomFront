// @ts-check
import { Button } from "@nextui-org/react";
import { twMerge } from "tailwind-merge";

/**
 * @type {React.FC<import("@nextui-org/react").ButtonProps>} props
 */
const CustomButton = (props) => {
  const { children, className, ...otherProps } = props;

  return (
    <Button
      color="primary"
      className={twMerge(
        "h-auto py-2.5",
        "rounded-md font-bold text-sm capitalize",
        className,
      )}
      {...otherProps}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
