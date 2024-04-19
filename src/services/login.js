import { BASE_URL } from "@/utils/api";
import axios from "axios";
import toast from "react-hot-toast";

export const login = async (user) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, user);
    toast.success("Logeado con exito!");
    return response;
  } catch (error) {
    toast.error(error.response.data);
    return false;
  }
};
