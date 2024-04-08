import { CustomTable, CustomTableBody, CustomTableHeader } from "@/features/ui";

const headers = ["Profesional", "Ticket n° 1", "Precio"];

const products = new Array(4 * 10).fill().map((_, index) => ({
  key: index + 1,
  name: `Dra. María Mercedez Guerrero ${index + 1}`,
  price: 100,
  img: "/DraMariaMercedezGuerrero.jpg",
  ticket: "000-000-000".replace(/0/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & ((15 - 6) >> (c / 4)))
    ).toString(16),
  ),
}));

function TablaCompras() {
  return (
    <CustomTable>
      <CustomTableHeader headers={headers} />
      <CustomTableBody items={products} />
    </CustomTable>
  );
}

export default function MisComprasPage() {
  return (
    <div className="p-8 w-full m-auto">
      <TablaCompras />
    </div>
  );
}
