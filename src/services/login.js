import { BASE_URL } from "@/utils/api";
import axios from "axios";
import toast from "react-hot-toast";

export const login = async (user) => {
  return toast.promise(
    axios.post(`${BASE_URL}/login`, user, {
      withCredentials: true,
    }),
    {
      loading: "Iniciando Sesion...",
      success: (response) => response.data.message,
      error: (error) => {
        if (error.response) {
          return error.response.data.message;
        } else {
          return error.message;
        }
      },
    },
  );
};
