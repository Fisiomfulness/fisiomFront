import axios from "axios";
import { apiEndpoints } from "@/api_endpoints";

export const deleteAccountFunction = async (id, payload) => {
  try {
    const { data } = await axios.delete(`${apiEndpoints.users}delete/${id}`, {
      data: payload,
      withCredentials: true,
    });
    return { data };
  } catch (error) {
    return {
      error: error?.response?.data?.message,
    };
  }
};
