import { BASE_URL } from "@/utils/api";
import axios from "axios";
import toast from "react-hot-toast";

export const sendConfirmacion = async (token) => {
  const toastPromise = toast.promise(
    axios.get(`${BASE_URL}/login/confirm_email/${token}`),
    {
      loading: "Enviando email...",
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

  const response = await toastPromise;
  return toastPromise;
};
