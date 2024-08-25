import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { events } from "../../data/events";

const RegistrationEvent: FC = () => {

    const { id_event } = useParams<{ id_event: string }>();
    const [eventData, setEventData] = useState<any>(null);
    const [expanded, setExpanded] = useState(false);
    const [notAttending, setNotAttending] = useState(false);
    const navigate = useNavigate();
    const [eventInterface, setEventInterface] = useState<EventDetails>(
        {
            title: "",
            date: "",
            endDate: "",
            duration: 0,
            scholarshipHours: "",
            location: "",
            maxParticipants: 0,
            minParticipants: 0,
            description: "",
            responsiblePerson: "",
            status: "PENDIENTE",
        }
    );

    useEffect(() => {
        const eventDetails = events.find(e => e.id_event === parseInt(id_event!, 10));
        setEventData(eventDetails);
    }, [id_event]);

    
    useEffect(() => {
        if (eventData) {
            const eventDetails: EventDetails = {
                title: eventData.name,
                date: eventData.startDate,
                endDate: eventData.startDate,
                duration: eventData.duration,
                scholarshipHours: eventData.validatedHours.split(' ')[0],
                location: eventData.place,
                maxParticipants: eventData.maxInterns,
                minParticipants: eventData.minInterns,
                description: eventData.description,
                responsiblePerson: eventData.responsiblePerson,
                status: "PENDIENTE",
            };
            setEventInterface(eventDetails);
        }
        
    }, [eventData]);



    dayjs.locale('es');

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleNotAttending = () => {
        setNotAttending(true);
    };

    const handleBackClick = () => {
        navigate("/events"); 
    };

    return (
        <Card sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="event">
                    </Avatar>
                }
                title={eventInterface.title}
                subheader={
                    <>
                        Fecha: {dayjs(eventInterface.date).format('LL')}
                        <br />
                        Horas becarias: {eventInterface.scholarshipHours}
                    </>
                }
                action={
                    <IconButton onClick={handleBackClick} aria-label="back">
                        <ArrowBackIcon />
                    </IconButton>
                }
            />
            <CardContent>
                <Box display="flex" flexDirection="row" justifyContent="space-between" mb={2}>
                    <Box sx={{ border: '1px solid #ccc', borderRadius: '4px', p: 1, flex: 1, mx: 1 }}>
                        <Typography variant="body2"><strong>Título:</strong> {eventInterface.title}</Typography>
                    </Box>
                    <Box sx={{ border: '1px solid #ccc', borderRadius: '4px', p: 1, flex: 1, mx: 1 }}>
                        <Typography variant="body2"><strong>Duración:</strong> {eventInterface.duration}</Typography>
                    </Box>
                    <Box sx={{ border: '1px solid #ccc', borderRadius: '4px', p: 1, flex: 1, mx: 1 }}>
                        <Typography variant="body2"><strong>Fecha:</strong> {dayjs(eventInterface.date).format('DD MMMM YYYY')}</Typography>
                    </Box>
                    <Box sx={{ border: '1px solid #ccc', borderRadius: '4px', p: 1, flex: 1, mx: 1 }}>
                        <Typography variant="body2"><strong>Horas Becarias:</strong> {eventInterface.scholarshipHours}</Typography>
                    </Box>
                </Box>
            </CardContent>
            <CardActions disableSpacing>
                <Box display="flex" flexDirection="row" justifyContent="space-between" width="100%">
                    <Tooltip title={eventInterface.status === "ACEPTADO" ? "Aceptado" : eventInterface.status === "PENDIENTE" ? "Pendiente" : "Rechazado"}>
                        <Button
                            variant="contained"
                            color={
                                eventInterface.status === "ACEPTADO"
                                    ? "success"
                                    : eventInterface.status === "PENDIENTE"
                                    ? "warning"
                                    : "error"
                            }
                            disabled
                        >
                            {eventInterface.status.charAt(0).toUpperCase() + eventInterface.status.slice(1).toLowerCase()}
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
                    <Typography paragraph><strong>Lugar:</strong> {eventInterface.location} </Typography>
                    <Typography paragraph><strong>Máximo de Becarios:</strong> {eventInterface.maxParticipants}</Typography>
                    <Typography paragraph><strong>Minimo de Becarios:</strong> {eventInterface.minParticipants}</Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
};

export default RegistrationEvent;
