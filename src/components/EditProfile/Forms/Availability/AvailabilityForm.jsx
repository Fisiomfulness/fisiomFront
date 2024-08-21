import { useState } from "react";
import axios from "axios";

const AvailabilityForm = ({ userId }) => {
  const [availability, setAvailability] = useState([
    { day: "Lunes", timeSlots: [{ start: "", end: "" }] },
  ]);

  const handleAddDay = () => {
    setAvailability([
      ...availability,
      { day: "", timeSlots: [{ start: "", end: "" }] },
    ]);
  };

  const handleAddTimeSlot = (index) => {
    const newAvailability = [...availability];
    newAvailability[index].timeSlots.push({ start: "", end: "" });
    setAvailability(newAvailability);
  };

  const handleChangeDay = (index, value) => {
    const newAvailability = [...availability];
    newAvailability[index].day = value;
    setAvailability(newAvailability);
  };

  const handleChangeTimeSlot = (dayIndex, slotIndex, field, value) => {
    const newAvailability = [...availability];
    newAvailability[dayIndex].timeSlots[slotIndex][field] = value;
    setAvailability(newAvailability);
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`/api/availability/${userId}`, { availability });
      alert("Disponibilidad actualizada");
    } catch (err) {
      console.error(err);
      alert("Error al actualizar la disponibilidad");
    }
  };

  return (
    <div>
      <h2>Disponibilidad</h2>
      {availability.map((day, dayIndex) => (
        <div key={dayIndex}>
          <label>Día:</label>
          <input
            type="text"
            value={day.day}
            onChange={(e) => handleChangeDay(dayIndex, e.target.value)}
            placeholder="Lunes"
          />
          {day.timeSlots.map((slot, slotIndex) => (
            <div key={slotIndex}>
              <label>Inicio:</label>
              <input
                type="time"
                value={slot.start}
                onChange={(e) =>
                  handleChangeTimeSlot(
                    dayIndex,
                    slotIndex,
                    "start",
                    e.target.value,
                  )
                }
              />
              <label>Fin:</label>
              <input
                type="time"
                value={slot.end}
                onChange={(e) =>
                  handleChangeTimeSlot(
                    dayIndex,
                    slotIndex,
                    "end",
                    e.target.value,
                  )
                }
              />
            </div>
          ))}
          <button onClick={() => handleAddTimeSlot(dayIndex)}>
            Agregar Slot de Tiempo
          </button>
        </div>
      ))}
      <button onClick={handleAddDay}>Agregar Día</button>
      <button onClick={handleSubmit}>Guardar</button>
    </div>
  );
};

export default AvailabilityForm;
