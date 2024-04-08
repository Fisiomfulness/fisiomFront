import { DocColorPalette, DocRoutes } from "@/features/docs/components";

export const metadata = {
  title: "Only Development",
  description: "Esta pagina solo debe funcionar en desarrollo",
};

export default function OnlyDevelopmentLayout({ children }) {
  return (
    <div className="flex flex-col justify-center gap-4 max-w-6xl mx-auto">
      <p className="text-2xl font-bold underline text-center">
        Esta pagina solo funciona en desarrollo
      </p>
      <DocRoutes />
      <DocColorPalette />
      <div className="overflow-hidden">{children}</div>
    </div>
  );
}
