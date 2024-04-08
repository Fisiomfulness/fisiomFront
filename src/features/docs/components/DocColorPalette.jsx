const primary = [
  "bg-primary-50",
  "bg-primary-100",
  "bg-primary-200",
  "bg-primary-300",
  "bg-primary-400",
  "bg-primary-500",
  "bg-primary-600",
  "bg-primary-700",
  "bg-primary-800 text-white",
  "bg-primary-900 text-white",
  "bg-primary-950 text-white",
];

const alter = [
  "bg-alter-50",
  "bg-alter-100",
  "bg-alter-200",
  "bg-alter-300",
  "bg-alter-400",
  "bg-alter-500",
  "bg-alter-600",
  "bg-alter-700",
  "bg-alter-800 text-white",
  "bg-alter-900 text-white",
  "bg-alter-950 text-white",
];

const aqua = [
  "bg-aqua-50",
  "bg-aqua-100",
  "bg-aqua-200",
  "bg-aqua-300",
  "bg-aqua-400",
  "bg-aqua-500",
  "bg-aqua-600",
  "bg-aqua-700",
  "bg-aqua-800 text-white",
  "bg-aqua-900 text-white",
  "bg-aqua-950 text-white",
];

const secondary = [
  "bg-secondary-50",
  "bg-secondary-100",
  "bg-secondary-200",
  "bg-secondary-300",
  "bg-secondary-400 text-white",
  "bg-secondary-500 text-white",
  "bg-secondary-600 text-white",
  "bg-secondary-700 text-white",
  "bg-secondary-800 text-white",
  "bg-secondary-900 text-white",
  "bg-secondary-950 text-white",
];

const colors = [primary, alter, aqua, secondary];

const palette = [
  { cn: "font-bold underline", name: "Figma Palette" },
  { cn: "bg-palette-100 text-white", name: "secondary-500" },
  { cn: "bg-palette-200 text-white", name: "primary-700-800" },
  { cn: "bg-palette-300", name: "primary-600" },
  { cn: "bg-palette-400", name: "primary-500" },
  { cn: "bg-palette-500", name: "alter-500" },
  { cn: "bg-palette-600", name: "descartado" },
  { cn: "bg-palette-700", name: "descartado" },
  { cn: "bg-palette-800", name: "aqua-500" },
  { cn: "bg-palette-900", name: "white" },
];

export default function DocColorPalette() {
  return (
    <div>
      <p className="text-lg font-bold underline">Paleta de colores</p>
      <p>Generado con https://www.tints.dev/</p>
      <div className="flex flex-row pt-2 overflow-auto">
        {colors.map((color, index) => (
          <div key={index}>
            {color.map((item) => (
              <div className={`text-center w-40 h-8 ${item}`} key={item}>
                {item.split(" ")[0]}
              </div>
            ))}
          </div>
        ))}
        <div>
          {palette.map((item, index) => (
            <div className={`text-center w-40 h-8 ${item.cn}`} key={index}>
              {item.name || item.cn.split(" ")[0]}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
