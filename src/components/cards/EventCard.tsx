import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import DescriptionIcon from "@mui/icons-material/Description";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close"
import dayjs from "dayjs";
import "dayjs/locale/es";
import { FC, useState } from "react";
import "../../style.css";
import { EventCardProps } from "../../models/eventCardProps";
import EventSubheader from "./EventSubheader";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const EventCard: FC<EventCardProps> = ({ event }) => {
  const [expanded, setExpanded] = useState(false);
  const {
    name: name,
    description: description,
    startDate: startDate,
    endDate: endDate,
    duration: duration,
    place: place,
    responsiblePerson: responsiblePerson,
    maxInterns: maxInterns,
    minInterns: minInterns,
  } = event;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  dayjs.locale("es");

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleConfirm = () => {
    setSnackbarOpen(true);
    setDialogOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleDescriptionClick = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <Card sx={{maxWidth: 345}} >
      <CardHeader
        title={name}
        titleTypographyProps={{
          fontSize: 20,
          align: "center",
          color: "primary",
          fontWeight: "bold",
        }}
      />
      <EventSubheader event={event} />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          fontSize={16}
          color="text.primary"
          onClick={handleDescriptionClick}
          sx={{
            cursor: "pointer",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            WebkitLineClamp: showFullDescription ? "unset" : 1,
            flex: 1,
            textAlign: "justify",
          }}
        >
          {description}
        </Typography>
        {!showFullDescription && description.length > 0 && (
          <Typography
            fontSize={16}
            color="primary"
            onClick={handleDescriptionClick}
            sx={{ cursor: "pointer" }}
          >
            [Ver más]
          </Typography>
        )}
      </CardContent>
      <CardActions disableSpacing>
        <Tooltip title="Registrarse">
          <IconButton aria-label="registrarse" onClick={handleDialogOpen}>
            <AddIcon />
          </IconButton>
        </Tooltip>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          title="Descripción"
          aria-label="descripcion"
        >
          <DescriptionIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography align="center" fontSize={17} color="primary">
            <strong>Detalles del evento</strong>
          </Typography>
          <Typography
            fontSize={15}
            color="text.primary"
            marginLeft={2}
            marginTop={2}
          >
            <strong>Fecha inicial: </strong>{" "}
            {dayjs(startDate).format("DD/MM/YYYY HH:mm")}
          </Typography>
          <Typography fontSize={15} color="text.primary" marginLeft={2}>
            <strong>Fecha final: </strong>{" "}
            {dayjs(endDate).format("DD/MM/YYYY HH:mm")}
          </Typography>
          <Typography fontSize={15} color="text.primary" marginLeft={2}>
            <strong>Encargado: </strong> {responsiblePerson}
          </Typography>
          <Typography fontSize={15} color="text.primary" marginLeft={2}>
            <strong>Duración: </strong> {duration}
          </Typography>
          <Typography fontSize={15} color="text.primary" marginLeft={2}>
            <strong>Lugar: </strong> {place}
          </Typography>
          <Typography fontSize={15} color="text.primary" marginLeft={2}>
            <strong>Máximo de Becarios: </strong> {maxInterns}
          </Typography>
          <Typography fontSize={15} color="text.primary" marginLeft={2}>
            <strong>Máximo de Suplentes: </strong> {minInterns}
          </Typography>
        </CardContent>
      </Collapse>
      <Dialog
          open={dialogOpen}
          onClose={(event, reason) => {
            if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
              handleDialogClose();
            }
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
      >
        <DialogContent>
        <IconButton
            aria-label="close"
            onClick={handleDialogClose}
            sx={{
              position: "absolute",
              right: 4,
              top: 4,
              color: (theme) => theme.palette.grey[800],
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography align="center" variant="h6">
            ¿Estás seguro de inscribirte al evento "{name}"?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            onClick={handleConfirm}
            variant="contained"
            className="confirm-button"
          >
            Confirmar
          </Button>
          <Button
            onClick={handleDialogClose}
            variant="contained"
            className="cancel-button"
          >
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          ¡Te has registrado con éxito en el evento {name}!
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default EventCard;
