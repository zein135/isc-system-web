import { Alert, Button, Card, CardActions, CardHeader, Dialog, DialogActions, DialogTitle, IconButton, Snackbar } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";


interface CSHEventProps {
    event: {
        id_event: number;
        name: string;
        description: string;
        validatedHours: string;
        startDate: Dayjs;
        duration: number;
        place: string;
        maxInterns: number;
        minInterns: number;
    }
}

const CSHEventCard: FC<CSHEventProps> = ({ event }) => {
    const { id_event, name: name, description: description, validatedHours: validatedHours, startDate: startDate, duration: duration, place: place, maxInterns: maxInterns, minInterns: minInterns} = event;
    const [dialogOpen, setDialogOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    dayjs.locale("es");

    const navigate = useNavigate();

    const goToShowEvent = () => {
        navigate(`/event/${id_event}`);
    }

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleConfirmationEnding = () => {
        setDialogOpen(false);
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Card sx={{ maxWidth: 1000 }}>
            <CardHeader
                id_event={id_event}
                name={name}
                description={description}
                validatedHours={validatedHours}
                startDate={startDate}
                duration={duration}
                place={place}
                maxInterns={maxInterns}
                minInterns={minInterns}
                onClick={goToShowEvent}
            />
            <CardActions disableSpacing>
                <IconButton aria-label="Solicitudes de inscripción"
                    onClick={goToShowEvent}>
                </IconButton>
                <IconButton aria-label="Finalizar evento"
                    onClick={handleDialogOpen}>
                </IconButton>
            </CardActions>
        //Pop-up End of the event
            <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    ¿Desea finalizar el evento {name}?
                    {/* {title.find((title) => title.id_cshevent === selectedIdCSHEvent)?.title} */}
                </DialogTitle>
                <DialogActions sx={{ justifyContent: "center" }}>
                    <Button onClick={handleConfirmationEnding} color="primary">
                        Finalizar
                    </Button>
                    <Button onClick={handleDialogClose} color="secondary" autoFocus>
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={2000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: "100%" }}>
                    Finalizó {name}
                </Alert>
            </Snackbar>
        </Card>
    );
}

export default CSHEventCard;