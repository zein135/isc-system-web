import { FC, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import DescriptionIcon from "@mui/icons-material/Description";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; 
import Collapse from "@mui/material/Collapse";
import Tooltip from "@mui/material/Tooltip";
import dayjs from "dayjs";
import "dayjs/locale/es";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { EventDetails } from "../../models/eventInterface";

const RegistrationEvent: FC = () => {
    const [expanded, setExpanded] = useState(false);
    const [notAttending, setNotAttending] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location;
    const event = state?.event as EventDetails;

    if (!event) {
        return <div>No se encontró el evento.</div>;
    }

    const {
        title = 'Título no disponible',
        date,
        duration = 'Duración no disponible',
        scholarshipHours = 0,
        location: eventLocation = 'Ubicación no disponible',
        maxParticipants = 0,
        maxSubstitutes = 0,
        status = 'PENDIENTE'
    } = event;

    const avatarText = title ? title.charAt(0) : '?';

    dayjs.locale('es');
    const subheaderProp = (
        <>
            Fecha: {dayjs(date).format('LL')}
            <br />
            Horas becarias: {scholarshipHours}
        </>
    );

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleNotAttending = () => {
        setNotAttending(true);
    };

    const handleBackClick = () => {
        navigate("/eventCard"); 
    };

    return (
        <Card sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="event">
                        {avatarText}
                    </Avatar>
                }
                title={title}
                subheader={subheaderProp}
                action={
                    <IconButton onClick={handleBackClick} aria-label="back">
                        <ArrowBackIcon />
                    </IconButton>
                }
            />
            <CardContent>
                <Box display="flex" flexDirection="row" justifyContent="space-between" mb={2}>
                    <Box sx={{ border: '1px solid #ccc', borderRadius: '4px', p: 1, flex: 1, mx: 1 }}>
                        <Typography variant="body2"><strong>Título:</strong> {title}</Typography>
                    </Box>
                    <Box sx={{ border: '1px solid #ccc', borderRadius: '4px', p: 1, flex: 1, mx: 1 }}>
                        <Typography variant="body2"><strong>Duración:</strong> {duration}</Typography>
                    </Box>
                    <Box sx={{ border: '1px solid #ccc', borderRadius: '4px', p: 1, flex: 1, mx: 1 }}>
                        <Typography variant="body2"><strong>Fecha:</strong> {dayjs(date).format('DD MMMM YYYY')}</Typography>
                    </Box>
                    <Box sx={{ border: '1px solid #ccc', borderRadius: '4px', p: 1, flex: 1, mx: 1 }}>
                        <Typography variant="body2"><strong>Horas Becarias:</strong> {scholarshipHours}</Typography>
                    </Box>
                </Box>
            </CardContent>
            <CardActions disableSpacing>
                <Box display="flex" flexDirection="row" justifyContent="space-between" width="100%">
                    <Tooltip title={status === "ACEPTADO" ? "Aceptado" : status === "PENDIENTE" ? "Pendiente" : "Rechazado"}>
                        <Button
                            variant="contained"
                            color={
                                status === "ACEPTADO"
                                    ? "success"
                                    : status === "PENDIENTE"
                                    ? "warning"
                                    : "error"
                            }
                            disabled
                        >
                            {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
                        </Button>
                    </Tooltip>
                    <Tooltip title="No podré asistir">
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={handleNotAttending}
                            disabled={notAttending}
                            sx={{ ml: 2 }} 
                        >
                            {notAttending ? "Confirmado" : "No podré asistir"}
                        </Button>
                    </Tooltip>
                </Box>
                <IconButton
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="mostrar detalles"
                >
                    <DescriptionIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph><strong>Lugar:</strong> {eventLocation}</Typography>
                    <Typography paragraph><strong>Máximo de Participantes:</strong> {maxParticipants}</Typography>
                    <Typography paragraph><strong>Máximo de Suplentes:</strong> {maxSubstitutes}</Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
};

export default RegistrationEvent;
