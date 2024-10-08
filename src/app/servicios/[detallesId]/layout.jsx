import ServicioAsideBar from "@/components/Servicios/ServicioAsideBar";

export const metadata = {
  title: "Perfil del Profesional",
  description:
    "Conoce más sobre nuestro profesional altamente calificado, sus habilidades, experiencia y los servicios de salud que ofrece.",
};

const Layout = ({ children }) => {
  return (
    <div className="min-h-[92dvh] w-full vstack mx-auto max-w-8xl lg:grid lg:grid-cols-[140px,auto] lg:gap-16 px-auto">
      <ServicioAsideBar />
      {children}
    </div>
  );
};

export default Layout;
