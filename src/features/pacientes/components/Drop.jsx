"use client";

import { Autocomplete, AutocompleteItem } from "@nextui-org/react";

export default function Drop({ defaultItems, placeholder }) {
  return (
    <Autocomplete
      defaultItems={defaultItems}
      labelPlacement={"outside"}
      placeholder={placeholder}
      variant="underlined"
      aria-label={placeholder}
      size="sm"
      inputProps={{
        classNames: {
          base: "px-2 py-1 bg-white",
          innerWrapper: "!border-none !shadow-none px-2",
          inputWrapper: "!border-none !shadow-none after:!hidden",
          input: [
            "placeholder:!not-italic placeholder:text-inherit",
            "!border-none max-w-[130px] !p-0",
          ],
        },
      }}
      popoverProps={{
        radius: "sm",
        shadow: "sm",
        size: "sm",
        offset: 2,
        classNames: {
          content: "p-0",
        },
      }}
      listboxProps={{
        itemClasses: {
          base: "!rounded-md",
        },
        color: "primary",
      }}
    >
      {(item) => (
        <AutocompleteItem key={item.value}>{item.value}</AutocompleteItem>
      )}
    </Autocomplete>
  );
}
