import moment from "moment";

export const EventInfoComponent = ({ eventInfo }) => (
  <div className="grid grid-cols-2 font-sans">
    <strong className="text-xl col-span-2 font-sans">{eventInfo.title}</strong>

    <p className="col-span-2">{eventInfo.description}</p>

    <p>
      <strong>Paciente: </strong>
      {eventInfo.patientName}
    </p>

    <p>
      <strong>Estado: </strong>
      {eventInfo.status}
    </p>

    <p>
      <strong>El día: </strong>
      {moment(eventInfo.start).format("DD MMMM YYYY [a las] h:mmA")}
    </p>

    <p>
      <strong>Hasta el día: </strong>
      {moment(eventInfo.end).format("DD MMMM YYYY [a las] h:mmA")}
    </p>

    <p className="col-span-2">
      <strong>Descripcion:</strong>
      <br />
      {eventInfo.additionalDescription}
    </p>
  </div>
);
