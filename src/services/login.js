import { BASE_URL } from "@/utils/api";
import axios from "axios";
import toast from "react-hot-toast";

export const login = async (user) => {
  return axios
    .post(`${BASE_URL}/login`, user)
    .then((response) => {
      toast.success(response.data.message);
      return false;
    })
    .catch((error) => {
      toast.error(error.response.data.message);
      return false;
    });
};
