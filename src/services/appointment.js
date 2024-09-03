import { BASE_URL } from "@/utils/api";
import toast from "react-hot-toast";

const { default: axios } = require("axios");

//#region Get Appointment   
export const getAppointment = async (_id, from, to) => {
    try {
        const response = await axios.get(
            `${BASE_URL}/appointments/?from=${from}&to=${to}&_professional=${_id}`,)
            
        return response
    } catch (error) {
        return error
    }
};

//#region Create Appointment
export const createAppointment = async (data) => {
    return toast.promise(axios.post(`${BASE_URL}/appointments/create`, data, {
        withCredentials: true,
    }), {
        loading: 'Creando Cita...',
        success: (response) => response.data.message,
        error: (error) => {
            if (error.response) {
                return error.response.data.message;
            } else {
                return error.message;
            }
        },
    })

};

//#region Update Appointment
export const updateAppointment = async (data) => {
    return toast.promise(axios.post(`${BASE_URL}/appointments/update`, data, {
        withCredentials: true,
    }), {
        loading: 'Actualizando Cita...',
        success: (response) => response.data.message,
        error: (error) => {
            if (error.response) {
                return error.response.data.message;
            } else {
                return error.message;
            }
        },
    })
};

//#region Delete Appointment
export const deleteAppointment = async (_id) => {
    return toast.promise(axios.post(`${BASE_URL}/appointments/delete/${_id}`, {
        withCredentials: true,
    }), {
        loading: 'Actualizando Cita...',
        success: (response) => response.data.message,
        error: (error) => {
            if (error.response) {
                return error.response.data.message;
            } else {
                return error.message;
            }
        },
    })
};

