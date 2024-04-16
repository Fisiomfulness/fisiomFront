// @ts-check
import { Button } from "@nextui-org/button";
import { twMerge } from "tailwind-merge";

/**
 * @typedef {import("@nextui-org/react").ButtonProps} ButtonProps
 *
 * @type {React.FC<ButtonProps>} props
 * @returns {React.ReactNode}
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
