import { BASE_URL } from "@/utils/api";
import toast from "react-hot-toast";

const { default: axios } = require("axios");

//#region Init Purchase
export const initPurchase = async (data) => {
    return toast.promise(axios.post(`${BASE_URL}/purchases/init`, data, {
        withCredentials: true,
    }), {
        loading: 'Iniciando compra...',
        success: (response) => 'redireccionando...',
        error: (error) => {
            if (error.response) {
                return error.response.data.message;
            } else {
                return error.message;
            }
        },
    })
};