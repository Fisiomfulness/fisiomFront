import { BASE_URL } from "@/utils/api";
import axios from "axios";
import toast from "react-hot-toast";

export const sendConfirmacion = async (token) => {
  return axios
    .get(`${BASE_URL}/login/confirm_email/${token}`)
    .then((response) => {
      toast.success(response.data.message);
    })
    .catch((error) => {
      console.log(error);
      toast.error(error.response.data.message);
    });
};
