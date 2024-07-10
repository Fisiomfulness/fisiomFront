import moment from "moment";
import "moment-timezone";
import { standarFormartDate } from "../StandarValues";

export const convertToUserTimezone = (incomingDate) => {
    // Obtener la zona horaria del usuario
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Crear un objeto Moment asumiendo que la fecha entrante está en UTC
    const dateInUTC = moment.utc(incomingDate);

    // Convertir la fecha a la zona horaria del usuario
    const dateInUserTimezone = dateInUTC.clone().tz(userTimezone);

    return new Date(dateInUserTimezone.format(standarFormartDate));
};


export const formatStringMonthToDateTime = (dateString) => {
    // Establecer la configuración regional en español para moment.js
    moment.locale('es');

    // Parsear la fecha de entrada "agosto 2024" y asumir el primer día del mes y medianoche como la hora
    const date = moment(dateString, 'MMMM YYYY');

    // Formatear la fecha al formato "YYYY-MM-DD HH:mm"
    return date.format('YYYY-MM-DD HH:mm');
};

export const formatDateFromTo = (view, date, setState) => {
    let dateFromTo;
    switch (view) {
        case "agenda":
        case "month":
            dateFromTo = {
                from: moment(date).startOf("month").format("YYYY-MM-DD"),
                to: moment(date).endOf("month").format("YYYY-MM-DD"),
            };
            setState((prevState) => ({
                ...prevState,
                dateFromTo,
            }));
            break;

        case "week":
            dateFromTo = {
                from: moment(date).startOf("week").format("YYYY-MM-DD"),
                to: moment(date).endOf("week").format("YYYY-MM-DD"),
            };
            setState((prevState) => ({
                ...prevState,
                dateFromTo,
            }));

            break;
    }
    return;
};