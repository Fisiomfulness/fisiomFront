import { CustomTable, CustomTableHeader } from "@/features/ui";
import { RxTrash } from "react-icons/rx";
import { HiOutlinePencil } from "react-icons/hi2";

const items = new Array(20).fill().map((_, index) => ({
  key: index + 1,
  name: `Servicio ${index + 1}`,
  price: 100,
  descripcion:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod " +
    "tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim " +
    "veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea " +
    "commodo consequat. Duis aute irure dolor in reprehenderit in voluptate " +
    "velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint " +
    "occaecat cupidatat non proident, sunt in culpa qui officia deserunt " +
    "mollit anim id est laborum.",
}));

function CustomTableBody({}) {
  return (
    <tbody className="whitespace-nowrap text-center">
      {items.map((item) => (
        <tr
          key={item.key}
          className="odd:bg-[#D1E7F1] even:bg-[#E7F0F4] border-t-4 border-white"
        >
          <td className="px-8 py-3 font-medium flex flex-row items-center gap-0 min-h-fit">
            <p className="w-full px-4">{item.name}</p>
          </td>
          <td className="px-8 py-3">
            <p className="line-clamp-6 whitespace-break-spaces max-w-xl text-justify">
              {item.descripcion}
            </p>
          </td>
          <td className="px-12 py-3 align-top">$ {item.price}</td>
          <td className="px-12 py-3">
            <div className="flex flex-row gap-8">
              <RxTrash className="text-primary text-2xl" />
              <HiOutlinePencil className="text-primary text-2xl" />
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
}

function MisServiciosPage() {
  return (
    <div className="p-6 overflow-hidden m-auto w-full">
      <CustomTable>
        <CustomTableHeader
          headers={["Servicio", "Descripción", "Precio", ""]}
        />
        <CustomTableBody />
      </CustomTable>
    </div>
  );
}
export default MisServiciosPage;
