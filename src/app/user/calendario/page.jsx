import CalendarComponent from "@/components/CalendarComponent/CalendarComponent";

export default function CalendarioPage() {
  return (
    <div className="flex h-96 justify-center">
      <CalendarComponent selectable={true} />
    </div>
  );
}
