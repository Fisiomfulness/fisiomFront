import axios from "axios";
import { apiEndpoints } from "../../api_endpoints";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { locationAtom } from "../Servicios/store/servicios";
import { filtersAtom } from "../Servicios/store/servicios";
import { useMap, useMapEvents } from "react-leaflet";

const ProfessionalsUpdate = ({ markers, setMarkers, toggle }) => {
  const map = useMap();
  const [locations] = useAtom(locationAtom);
  const [filters] = useAtom(filtersAtom);

  const updateMapProfessionals = (abortController) => {
    axios
      .get(apiEndpoints.professionals, {
        signal: abortController.signal,
        params: {
          search: filters.search.join(","),
          city: filters.city,
          specialtyId: filters.specialtyId,
          bbox: map.getBounds().toBBoxString(),
        },
        withCredentials: true,
      })
      .then(({ data }) => {
        setMarkers((prev) =>
          Array.from(
            new Map(
              [...prev, ...data.professionals].map((item) => [item._id, item])
            ).values()
          )
        );
      })
      .catch((err) => {
        if (err.name === "CanceledError") return;
        throw err;
      });
  };

  useEffect(() => {
    const abortController = new AbortController();
    updateMapProfessionals(abortController);
    return () => abortController.abort();
  }, [toggle]);

  useMapEvents({
    moveend: () => {
      const abortController = new AbortController();
      updateMapProfessionals(abortController);
      return () => abortController.abort();
    },
  });

  return null;
};

export default ProfessionalsUpdate;
