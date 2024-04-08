import CalendarioMain from "@/components/Servicios/Calendario/CalendarioMain";
import ServicioMain from "@/components/Servicios/ServicioMain";
import data from "@/components/Servicios/data/profesionales.json"

const ServiciosPage = () => {
  
  return (
    <>
      <ServicioMain data={data.profesionales}/>
     {/*  <CalendarioMain /> */}
    </>
  );
};

export default ServiciosPage;
