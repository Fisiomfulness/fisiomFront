import TreatmentCard from "./TreatmentCard";

const TreatmentCardContainer = ({ treats }) => {
  if (!treats.length) {
    return <h2>No hemos encontrado resultados.</h2>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
      {treats.map((treat, index) => (
        <div
          key={treat.id}
          className={`${index < 3 ? "md:col-span-2" : "md:col-span-3"}`}
        >
          <TreatmentCard treat={treat} />
        </div>
      ))}
    </div>
  );
};

export default TreatmentCardContainer;
