import axios from "axios";
import { apiEndpoints } from "../../api_endpoints";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { filtersAtom } from "../Comunidad/store/comunidad";
import useGeolocation from "@/hooks/useGeolocation";
import { useMap, useMapEvents } from "react-leaflet";

const UsersUpdate = ({ markers, setMarkers, toggle }) => {
  const map = useMap();
  const locations = useGeolocation();
  const [filters] = useAtom(filtersAtom);

  const updateMapUsers = (abortController) => {
    axios
      .get(apiEndpoints.users, {
        signal: abortController.signal,
        params: {
          search: filters.search.join(","),
          interests: filters.interestsId,
          bbox: map.getBounds().toBBoxString(), // modify back-end so this exists... copy Professionals
        },
        withCredentials: true,
      })
      .then(({ data }) => {
        setMarkers((prev) =>
          Array.from(
            new Map(
              [...prev, ...data.users].map((item) => [item._id, item])
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
    updateMapUsers(abortController);
    return () => abortController.abort();
  }, [toggle]);

  useMapEvents({
    moveend: () => {
      const abortController = new AbortController();
      updateMapUsers(abortController);
      return () => abortController.abort();
    },
  });

  return null;
};

export default UsersUpdate;
