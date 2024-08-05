import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CalendarComponent from "@/components/CalendarComponent/CalendarComponent";
import { CalendarProvider } from "@/context/Calendar";
import { getUserDetail } from "@/services/users";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

export default async function CalendarioPage() {
  const session = await getServerSession(authOptions);
  if (!session) return notFound();
  const { foundUser } = await getUserDetail(session.user?.id);
  return (
    <div className="flex h-96 justify-center">
      <CalendarProvider>
        <CalendarComponent data={foundUser} selectable={true} />
      </CalendarProvider>
    </div>
  );
}
