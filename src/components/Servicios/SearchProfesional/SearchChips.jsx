"use client";
import { Chip } from "@nextui-org/react";
import { useAtom } from "jotai";
import { filtersAtom } from "../store/servicios";

export default function SearchChips() {
  const [filters, setFilters] = useAtom(filtersAtom);

  return (
    <div className="flex gap-1 px-5">
      {filters.search.map((chip, index) => (
        chip ?
        (<Chip
          key={index}
          size="md"
          radius="sm"
          color="primary"
          onClose={() =>
            setFilters((filters) => ({
              ...filters,
              search: filters.search.filter((c) => c !== chip),
              page: 1,
            }))
          }
        >
          {chip}
        </Chip>) : null
      ))}
    </div>
  );
}
