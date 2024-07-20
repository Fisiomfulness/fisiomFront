import { CalendarContext } from "@/context/Calendar";
import { Button, ButtonGroup } from "@nextui-org/react";
import { useContext } from "react";
import { SlPlus } from "react-icons/sl";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";
import { TfiReload } from "react-icons/tfi";
import { currentDateMoment, standarFormartDate } from "@/utils/StandarValues";
import moment from "moment";

const CustomToolbar = ({ label, onNavigate, onView, date }) => {
  const { onclickButtonCreate } = useContext(CalendarContext);

  return (
    <div className="block justify-center md:flex md:justify-between items-center font-sans">
      <div className="block md:flex justify-center md:justify-between items-center">
        <div className="flex justify-center items-center md:flex md:w-52">
          <FaCalendarAlt className="m-2" fontSize={"20px"} color="black" />
          <span className="text-xl font-semibold">{label}</span>
        </div>
        <div className="flex justify-center md:justify-between items-center px-3">
          <ButtonGroup>
            <Button
              isIconOnly
              radius="full"
              variant="light"
              isDisabled={
                moment(date).format(standarFormartDate) <= currentDateMoment
              }
              onClick={() => onNavigate("PREV")}
            >
              <IoIosArrowBack className="m-2" fontSize={"20px"} color="black" />
            </Button>
            <Button
              radius="full"
              variant="light"
              className="text-sm font-semibold mx-1"
              onClick={() => onNavigate("TODAY")}
            >
              Hoy
            </Button>
            <Button
              isIconOnly
              radius="full"
              variant="light"
              onClick={() => onNavigate("NEXT")}
            >
              <IoIosArrowForward
                className="justify-center items-center"
                fontSize={"20px"}
                color="black"
              />
            </Button>
          </ButtonGroup>
        </div>
      </div>

      <div className="flex justify-center md:justify-between items-center">
        <ButtonGroup>
          <Button
            className="mx-1 text-sm font-semibold"
            variant="light"
            onClick={onclickButtonCreate}
          >
            <SlPlus fontSize={"20px"} color="black" />
            <p className="text-sm font-semibold mx-1">Agendar Cita</p>
          </Button>
          <Button
            className="mx-1 text-sm font-semibold"
            variant="light"
            onClick={() => onView("month")}
          >
            Mes
          </Button>
          <Button
            className="mx-1 text-sm font-semibold"
            variant="light"
            onClick={() => onView("week")}
          >
            Semana
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default CustomToolbar;
