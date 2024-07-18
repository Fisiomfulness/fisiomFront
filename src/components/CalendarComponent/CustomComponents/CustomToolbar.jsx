import { CalendarContext } from "@/context/Calendar";
import { Button, ButtonGroup } from "@nextui-org/react";
import { useContext } from "react";
import { SlArrowLeftCircle, SlArrowRightCircle, SlPlus } from "react-icons/sl";
import { TfiReload } from "react-icons/tfi";

const CustomToolbar = ({ label, onNavigate, onView }) => {
  const { onclickButtonCreate } = useContext(CalendarContext);

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="">
        <Button onClick={onclickButtonCreate} color="success">
          <SlPlus fontSize={"20px"} color="white" />{" "}
          <p className="text-base font-semibold mx-1 text-white">
            Agregar Evento
          </p>
        </Button>
      </div>

      <div>
        <ButtonGroup>
          <Button
            className="text-base font-semibold mx-1"
            color="primary"
            onClick={() => onNavigate("PREV")}
          >
            <SlArrowLeftCircle fontSize={"20px"} color="white" />
          </Button>
          <Button
            className="text-base font-semibold mx-1"
            color="primary"
            onClick={() => onNavigate("TODAY")}
          >
            Hoy
          </Button>
          <Button
            className="text-base font-semibold mx-1"
            color="primary"
            onClick={() => onNavigate("NEXT")}
          >
            {" "}
            <SlArrowRightCircle fontSize={"20px"} color="white" />
          </Button>
        </ButtonGroup>
      </div>
      <span className="text-xl font-semibold">{label}</span>
      <div>
        <ButtonGroup>
          <Button
            className="mx-1 text-base font-semibold"
            auto
            flat
            color="primary"
            onClick={() => onView("month")}
          >
            Mes
          </Button>
          <Button
            className="mx-1 text-base font-semibold"
            auto
            flat
            color="primary"
            onClick={() => onView("week")}
          >
            Semana
          </Button>
          <Button
            className="mx-1 text-base font-semibold"
            auto
            flat
            color="primary"
            onClick={() => onView("agenda")}
          >
            Agenda
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default CustomToolbar;
