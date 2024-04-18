import { BASE_URL } from "@/utils/api";
import axios from "axios";
import toast from "react-hot-toast";

export const registerUserForm = async (user) => {
  try {
    console.log(user);
    await axios.post(`${BASE_URL}/register/user`, user);
    toast.success("Registrado con exito!");
  } catch (error) {
    toast.error(error.response.data);
  }
};

export const registerProfesionalForm = async (user) => {
  try {
    await axios.post(`${BASE_URL}/register/profesional`, user);
    toast.success("Registrado con exito!");
  } catch (error) {
    toast.error(error.response.data);
  }
};
