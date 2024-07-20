import moment from "moment";

export const standarFormartDate = "YYYY-MM-DDTHH:mm"

export const currentDateMoment = moment().format(standarFormartDate);

export const currentDateEnd = moment().add(1, "hours").format(standarFormartDate)

export const eventInitialValues = {
    _patient: "",
    patientName: "",
    title: "",
    status: "PENDING",
    additionalDescription: "",
    start: currentDateMoment,
    end: currentDateEnd,
}