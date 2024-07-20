import { EVENT_STATUS_COLORS } from "../../InitialValues";

export const CustomEventView = ({ appointment }) => {
  const { title, status } = appointment;
  const background = `bg-${EVENT_STATUS_COLORS[status]}`;
  return (
    <div
      className={` p-1 text-gray-800 h-screen font-sans text-sm font-semibold`}
      //   {...(isMonthView ? { overflow: "hidden", h: 7 } : {})}
    >
      <div>
        <p>{title}</p>
      </div>
    </div>
  );
};
