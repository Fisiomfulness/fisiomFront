import CalendarComponent from "@/components/CalendarComponent/CalendarComponent";

const ServicioTurno = () => {
  return (
    <div className="flex h-96">
      <CalendarComponent selectable={false} />;
    </div>
  );
};

export default ServicioTurno;
