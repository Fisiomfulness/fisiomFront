import TreatmentCardContainer from "@/components/Tratamientos/TreatmentCardContainer";
import data from "@/components/Tratamientos/data/treatmentsList.json";

const TreatmentsPage = () => {
  return (
    <div className="container mx-auto w-fit p-4 pb-4">
      <TreatmentCardContainer treats={data.treatments} />
    </div>
  );
};

export default TreatmentsPage;
