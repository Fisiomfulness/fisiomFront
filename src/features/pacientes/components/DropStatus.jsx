"use client";

import { useState } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { twMerge } from "tailwind-merge";

export default function DropStatus({ defaultItems, placeholder }) {
  const [status, setStatus] = useState(placeholder);

  return (
    <Autocomplete
      defaultItems={defaultItems}
      placeholder={placeholder}
      labelPlacement={"outside"}
      variant="underlined"
      aria-label={placeholder}
      size="sm"
      classNames={{
        clearButton: "!text-inherit",
      }}
      inputProps={{
        classNames: {
          base: twMerge(
            "px-2 py-1",
            status === "En Proceso" && "bg-cyan-600",
            status === "Finalizada" && "bg-sky-800",
            status === "Reprogramada" && "bg-lime-500",
          ),
          innerWrapper: "!border-none !shadow-none px-2",
          inputWrapper: "!border-none !shadow-none after:!hidden",
          input: twMerge(
            "placeholder:!not-italic placeholder:text-inherit placeholder:font-bold",
            "!border-none max-w-[120px] !p-0 !font-bold",
            "uppercase !text-white",
            status === "Reprogramada" && "!text-black",
          ),
        },
      }}
      popoverProps={{
        radius: "sm",
        shadow: "sm",
        size: "sm",
        offset: 2,
        classNames: {
          content: "p-0 uppercase",
        },
      }}
      listboxProps={{
        itemClasses: {
          base: "!rounded-md",
        },
        color: "primary",
      }}
      onInputChange={(value) => setStatus(value || placeholder)}
    >
      {(item) => (
        <AutocompleteItem key={item.value}>{item.value}</AutocompleteItem>
      )}
    </Autocomplete>
  );
}
