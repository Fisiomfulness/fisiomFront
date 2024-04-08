import { Button } from "@nextui-org/react";
import { twMerge } from "tailwind-merge";

const CustomButton = (props) => {
  const { children, className, ...otherProps } = props;

  return (
    <Button
      color="primary"
      className={twMerge(
        "h-auto py-2.5",
        "rounded-md font-bold text-sm uppercase",
        className,
      )}
      {...otherProps}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
