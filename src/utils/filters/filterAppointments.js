import { convertToUserTimezone } from "./timeFormat"

export const filterAppointments = (appointments) => {
    const filter = appointments.map((appointment) => ({
        ...appointment,
        start: convertToUserTimezone(appointment.start),
        end: convertToUserTimezone(appointment.end)
    }))
    return filter
}

