import ServicioMainCard from "./ServicioMainCard";

const ServicioMainContainer = ({ profesionales }) => {
  return (
    <div className="flex flex-col ">
      {profesionales.length ? (
        profesionales?.map((profesional) => (
          <ServicioMainCard
            key={profesional.matricula}
            profesional={profesional}
          />
        ))
      ) : (
        <div>No hay servicios disponibles.</div>
      )}
    </div>
  );
};

export default ServicioMainContainer;
