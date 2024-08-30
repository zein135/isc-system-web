import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { EventCardProps } from "../../models/eventCardProps";

const EventSubheader: React.FC<EventCardProps> = ({ event }) => {
  dayjs.locale("es");

  return (
    <>
      <Typography fontSize={15} color="text.primary" marginLeft={3}>
        <strong>Periodo de inscripción: </strong>{dayjs(event.inscriptionPeriod).format('DD/MM/YYYY')}
      </Typography>
      <Typography fontSize={15} color="text.primary" marginLeft={3}>
      <strong>Periodo de baja: </strong>{dayjs(event.cancelPeriod).format('DD/MM/YYYY')}
      </Typography>
      <Typography fontSize={15} color="text.primary" marginLeft={3}>
      <strong>Horas becarias: </strong>{event.validatedHours}
      </Typography>
    </>
  );
};

export default EventSubheader;
