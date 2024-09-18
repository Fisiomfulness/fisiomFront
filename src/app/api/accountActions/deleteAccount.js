import axios from "axios";
import { apiEndpoints } from "@/api_endpoints";

export const deleteAccountFunction = async (id, token) => {
  console.log(token);

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Así se configura el header de autorización
      },
      bbox: map.getBounds().toBBoxString(),
      withCredentials: true,
    };

    const { data } = await axios.delete(
      `${apiEndpoints.users}delete/${id}`,
      config
      // `${process.env.NEXT_PUBLIC_BACKEND_URL}/users`
    );
    return { data };
  } catch (error) {
    return {
      error: error?.response?.data?.message,
    };
  }
};
