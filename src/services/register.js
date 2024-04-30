import { BASE_URL } from "@/utils/api";
import axios from "axios";
import toast from "react-hot-toast";

export const registerUserForm = async (user) => {
  return axios
    .post(`${BASE_URL}/login/register/user`, user)
    .then((response) => {
      toast.success(response.data.message);
    })
    .catch((error) => {
      toast.error(error.response.data.message);
      return false;
    });
};

export const registerProfesionalForm = async (user) => {
  return axios
    .post(`${BASE_URL}/login/register/professional`, user)
    .then((response) => {
      toast.success(response.data.message);
    })
    .catch((error) => {
      toast.error(error.response.data.message);
      return false;
    });
};
