import { BASE_URL } from "@/utils/api";
import axios from "axios";
import toast from "react-hot-toast";

export const registerUserForm = async (user) => {
  try {
    await axios.post(`${BASE_URL}/register/user`, user);
    toast.success("Registrado con exito!");
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data);
      return false;
    } else {
      toast.error(error.message);
      return false;
    }
  }
};

export const registerProfesionalForm = async (user) => {
  try {
    await axios.post(`${BASE_URL}/register/profesional`, user);
    toast.success("Registrado con exito!");
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data);
      return false;
    } else {
      toast.error(error.message);
      return false;
    }
  }
};
