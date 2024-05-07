import ServicioAsideBar from "@/components/Servicios/ServicioAsideBar";

export const metadata = {
  title: 'Perfil del Profesional',
  description: 'Conoce más sobre nuestro profesional altamente calificado, sus habilidades, experiencia y los servicios de salud que ofrece.',
};

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col lg:flex-row justify-around p-2">
      <div>
        <ServicioAsideBar />
      </div>
      {children}
    </div>
  );
};

export default Layout;
