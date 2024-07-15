import CalendarioMain from "@/components/Servicios/Calendario/CalendarioMain";
import ServicioMain from "@/components/Servicios/ServicioMain";

export const metadata = {
  title: 'Servicios',
  description: 'Descubre nuestra diversidad de servicios de salud ofrecidos por profesionales altamente calificados. Encuentra el servicio que mejor se adapte a tus necesidades y contrata a tu profesional de salud de manera sencilla y segura.',
};

const ServiciosPage = () => {
  return (
    <>
      <ServicioMain />
    </>
  );
};

export default ServiciosPage;
