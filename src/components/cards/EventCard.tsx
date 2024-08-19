import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/es';
import { FC, useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import DescriptionIcon from '@mui/icons-material/Description';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import DialogContent from '@mui/material/DialogContent';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

interface EventCardProps {
    event: {
        id_event: number;
        nombre: string;
        descripcion: string;
        horasValidezBecaria: string; // ex: 4 horas
        fechaInicio: Dayjs;
        duracion: string;
        lugar: string;
        maxBecarios: number;
        maxSuplentes: number;
    }
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    const {id_event, nombre, descripcion, horasValidezBecaria, fechaInicio, duracion, lugar, maxBecarios, maxSuplentes } = event
    const [dialogOpen, setDialogOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    dayjs.locale('es');

    const navigate = useNavigate();

    const goToEditEvent = () => {
        navigate(`/editEvent/${id_event}`);
      };

    const subheaderProp = (
        <>
            Fecha: {fechaInicio.format('LL')}
            <br />
            Horas becarias: {horasValidezBecaria}
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
        // Aquí se procesaría la solicitud de registro (ej. llamada a API)
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
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={nombre}
                subheader={subheaderProp}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {descripcion}
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
                        <strong>Duración:</strong> {duracion}
                    </Typography>
                    <Typography paragraph>
                        <strong>Horas becarias: </strong> {horasValidezBecaria}
                    </Typography>
                    <Typography paragraph>
                        <strong>Lugar:</strong> {lugar}
                    </Typography>
                    <Typography paragraph>
                        <strong>Máximo de Becarios:</strong> {maxBecarios}
                    </Typography>
                    <Typography paragraph>
                        <strong>Máximo de Suplentes:</strong> {maxSuplentes}
                    </Typography>
                </CardContent>
            </Collapse>

            {/*Pestaña cuando pones la opcion de registrarse */}
            <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <Typography align='center' variant='h6'>
                        ¿Estás seguro de inscribirte al evento "{nombre}"?
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

            {/* Mensaje Temporal para confirmar el registro del becario */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    ¡Te has registrado con éxito en el evento {nombre}!
                </Alert>
            </Snackbar>
        </Card>
    );
}

export default EventCard;