"use client";

import CalendarComponent from "@/components/CalendarComponent/CalendarComponent";
import { CalendarProvider } from "@/context/Calendar";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useParams } from "next/navigation";

const DashboardCalendar = async () => {
  const params = useParams();

  console.log(params);

  const foundUser = {
    id: params.id,
  };
  return (
    <div className="flex justify-center h-96">
      <Link href="/dashboard" passHref>
        <Button as="a" auto>
          Ir al Dashboard
        </Button>
      </Link>
      <CalendarProvider>
        <CalendarComponent user={foundUser} isAuth={true} />
      </CalendarProvider>
    </div>
  );
};

export default DashboardCalendar;
