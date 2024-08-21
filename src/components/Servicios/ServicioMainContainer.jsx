import ServicioMainCard from './ServicioMainCard';

const ServicioMainContainer = ({ profesionales }) => {
  return (
    <div className="w-full flex flex-col items-center gap-4 p-1 lg:px-2">
      {profesionales.length ? (
        profesionales?.map((profesional) => (
          <ServicioMainCard key={profesional._id} profesional={profesional} />
        ))
      ) : (
        <div>No hay servicios disponibles.</div>
      )}
    </div>
  );
};

export default ServicioMainContainer;
