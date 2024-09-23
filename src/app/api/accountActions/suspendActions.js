import axios from "axios";
import { apiEndpoints } from "@/api_endpoints";

export const suspendAccountFunction = async (id, payload) => {
  try {
    const { data } = await axios.put(
      `${apiEndpoints.users}suspend/${id}`,
      payload,
      {
        withCredentials: true,
      }
    );
    return { data };
  } catch (error) {
    return {
      error: error?.response?.data?.message,
    };
  }
};
