import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/es";
import { FC, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import DescriptionIcon from "@mui/icons-material/Description";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import DialogContent from "@mui/material/DialogContent";


interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

interface EventCardProps {
    event: {
        id_event: number;
        name: string;
        description: string;
        validatedHours: string;
        startDate: Dayjs;
        duration: number;
        place: string;
        maxInterns: number;
        maxSubtitutes: number;
    }
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
    const {id_event, name: name, description: description, validatedHours: validatedHours, startDate: startDate, duration: duration, place: place, maxInterns: maxInterns, maxSubtitutes: maxSubtitutes } = event
    const [dialogOpen, setDialogOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    
    dayjs.locale('es');

    const navigate = useNavigate();

    const goToEditEvent = () => {
        navigate(`/editEvent/${id_event}`);
      };
    
      const goToEventDetails = () => {
        navigate(`/interns/${id_event}`);
    };

    const subheaderProp = (
        <>
            Fecha inicio: {startDate.format('DD/MM/YYYY')}
            <br /> 
            Fecha final: {startDate.format('DD/MM/YYYY')} 
            <br />
            Horas becarias: {validatedHours}
            <br />
            Encargado: Ernesto
        </>
    );

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
        setDialogOpen(false);
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };
    

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar 
                    sx={{ bgcolor: red[500] }} aria-label="recipe">  
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={name}
                subheader={subheaderProp}
                onClick={goToEventDetails}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Tooltip title="Registrarse">
                    <IconButton aria-label="registrarse" onClick={handleDialogOpen}>
                        <AddIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Editar">
                    <IconButton aria-label="editar"
                    onClick={goToEditEvent}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Borrar">
                    <IconButton aria-label="borrar">
                        <DeleteForeverIcon />
                    </IconButton>
                </Tooltip>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    title='Descripción'
                    aria-label="descripcion"
                >
                    <DescriptionIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography align='center' paragraph>Detalles del evento:</Typography>
                    <Typography paragraph>
                        <strong>Duración:</strong> {duration}
                    </Typography>
                    <Typography paragraph>
                        <strong>Horas becarias: </strong> {validatedHours}
                    </Typography>
                    <Typography paragraph>
                        <strong>Lugar:</strong> {place}
                    </Typography>
                    <Typography paragraph>
                        <strong>Máximo de Becarios:</strong> {maxInterns}
                    </Typography>
                    <Typography paragraph>
                        <strong>Máximo de Suplentes:</strong> {maxSubtitutes}
                    </Typography>
                </CardContent>
            </Collapse>

            <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <Typography align='center' variant='h6'>
                        ¿Estás seguro de inscribirte al evento "{name}"?
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center' }}>
                    <Button onClick={handleConfirm} variant="contained" sx={{ bgcolor: '#002E5D', color: '#FFFFFF', '&:hover': { bgcolor: '#001F3B' } }}>
                        Confirmar
                    </Button>
                    <Button onClick={handleDialogClose} variant="contained" sx={{ bgcolor: '#FF4C4C', color: '#FFFFFF', '&:hover': { bgcolor: '#CC0000' } }}>
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    ¡Te has registrado con éxito en el evento {name}!
                </Alert>
            </Snackbar>
        </Card>
    );
}

export default EventCard;