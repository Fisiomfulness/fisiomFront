import CustomToast from "@/components/CustomToast"; // Import if needed
import { BASE_URL } from "@/utils/api";
import axios from "axios";
import toast from "react-hot-toast";

export const resetPassword = async (data) => {
  const toastPromise = toast.promise(
    axios.post(`${BASE_URL}/login/reset_password/`, data),
    {
      loading: "Cambiando la contraseña...",
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
  // You can access the response data here if needed
  // console.log(response.data);

  return toastPromise;
};

export const sendEmail = async (data) => {
  const toastPromise = toast.promise(
    axios.post(`${BASE_URL}/login/send_email`, data),
    {
      loading: "Enviando EMail...",
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
  // You can access the response data here if needed
  // console.log(response.data);

  return toastPromise;
};
