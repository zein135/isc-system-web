import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { EventCardProps } from "../../models/eventCardProps";



const EventSubheader: React.FC<EventCardProps> = ({ event }) => {
  dayjs.locale("es");
  
  return (
    <>
      <Typography variant="body2">
        Fecha inicio: {event.startDate.format("DD/MM/YYYY")}
      </Typography>
      <Typography variant="body2">
        Fecha final: {event.startDate.format("DD/MM/YYYY")}
      </Typography>
      <Typography variant="body2">
        Horas becarias: {event.validatedHours}
      </Typography>
      <Typography variant="body2">
        Encargado: Ernesto
      </Typography>
    </>
  );
};

export default EventSubheader;
