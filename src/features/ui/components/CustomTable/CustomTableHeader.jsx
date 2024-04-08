export default function CustomTableHeader({ headers }) {
  return (
    <thead className="text-white bg-primary text-center">
      <tr>
        {headers.map((header) => (
          <th
            key={header}
            className={[
              "px-6 py-3 border-white even:bg-[#2984AE]",
              "border-r-2 last:border-r-0 font-normal",
            ].join(" ")}
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
}
