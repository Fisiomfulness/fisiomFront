import TreatmentCardContainer from "@/components/Tratamientos/TreatmentCardContainer";
import data from "@/components/Tratamientos/data/treatmentsList.json";

const TreatmentsPage = () => {
  return (
    <main className="maw-w-8xl center px-auto pt-16 pb-28">
      <TreatmentCardContainer treats={data.treatments} />
    </main>
  );
};

export default TreatmentsPage;
