"use client";
import { apiEndpoints } from "@/api_endpoints";
import useGeolocation from "@/hooks/useGeolocation";
import axios from "axios";
import { useInView } from "framer-motion";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Loader from "../Loader";
import SearchProfesional from "./SearchProfesional/SearchProfesional";
import ServicioMainContainer from "./ServicioMainContainer";

const Map = dynamic(() => import("@/components/Map"), {
  loading: () => <p>loading...</p>,
  ssr: false,
});

const ServicioMain = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 1 });
  const searchParams = useSearchParams();
  const router = useRouter();

  const userCoords = useGeolocation({
    defaultLocation: [-12.057822374374036, -77.06708360541617],
  });
  const [loading, setLoading] = useState(true);
  const [professionals, setProfessionals] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    search: "",
    specialtyId: searchParams.get("specialtyId") || "",
    pos: "",
  });

  useEffect(() => {
    const abortController = new AbortController();
    if (userCoords[0] !== 0) {
      setLoading(true);
      axios
        .get(apiEndpoints.professionals, {
          signal: abortController.signal,
          params: {
            search: filters.search,
            specialtyId: filters.specialtyId,
            pos: userCoords.join(","),
            page: page,
          },
          withCredentials: true,
        })
        .then(({ data }) => {
          if (page === 1) {
            setProfessionals(data.professionals);
          } else {
            setProfessionals((prev) => [...prev, ...data.professionals]);
          }
          setTotalPages(data.totalPages);
          setLoading(false);
          router.replace("/servicios", { shallow: true });
        })
        .catch((err) => {
          if (err.name === "CanceledError") return;

          throw err;
        })
        .finally(setLoading(false));
    }
    return () => abortController.abort();
  }, [page, filters, userCoords]);

  useEffect(() => {
    isInView && page < totalPages && setPage((prev) => prev + 1);
  }, [isInView]);

  return (
    <main className="vstack px-auto mx-auto max-w-8xl w-full flex flex-col py-4 gap-4">
      {loading ? (
        <div
          ref={ref}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Loader />
        </div>
      ) : (
        <>
          <SearchProfesional
            filters={filters}
            setFilters={setFilters}
            setPage={setPage}
          />
          <div className="grid lg:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2 items-center size-full h-[80vh] overflow-y-auto overflow-x-hidden">
              <ServicioMainContainer profesionales={professionals} />
            </div>
            <div className="min-h-[80vh] w-full">
              <Map professionals={professionals} userCoords={userCoords} />
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default ServicioMain;
