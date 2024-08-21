"use client";

import CalendarComponent from "@/components/CalendarComponent/CalendarComponent";
import Loader from "@/components/Loader";
import { CalendarProvider } from "@/context/Calendar";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default async function CalendarioPage() {
  const { data: session } = useSession();

  return (
    <div className="flex h-96 justify-center">
      <CalendarProvider>
        {session ? (
          <CalendarComponent user={session.user} isAuth={true} />
        ) : (
          <Loader />
        )}
      </CalendarProvider>
    </div>
  );
}
