export default function CustomTableBody({ items }) {
  return (
    <tbody className="whitespace-nowrap text-center">
      {items.map((item) => (
        <tr
          key={item.key}
          className="odd:bg-[#D1E7F1] even:bg-[#E7F0F4] border-t-4 border-white"
        >
          <th className="px-8 py-3 font-medium flex flex-row items-center gap-0 min-h-fit">
            {/* eslint-disable-next-line */}
            <img
              src={item.img}
              alt={item.name}
              className="min-w-[40px] h-10 object-cover object-bottom rounded-full"
            />
            <p className="w-full px-8 pr-4">{item.name}</p>
          </th>
          <td className="px-8 py-3">{item.ticket}</td>
          <td className="px-12 py-3">$ {item.price}</td>
        </tr>
      ))}
    </tbody>
  );
}
