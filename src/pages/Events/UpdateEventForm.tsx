import React, { useState, useEffect } from 'react';
import { Paper, Typography, TextField, Grid, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { events } from '../../data/events';

const UpdateEventForm: React.FC = () => {
    const { id_event } = useParams<{ id_event: string }>();
    const [eventData, setEventData] = useState<any>(null);

    const [eventName, setEventName] = useState(eventData?.name);
    const [hours, setHours] = useState(eventData?.validatedHours);
    const [date, setDate] = useState(eventData?.startDate.format('YYYY-MM-DD'));
    const [startTime, setStartTime] = useState(eventData?.startDate.format('HH:mm'));
    const [endTime, setEndTime] = useState('');
    const [description, setDescription] = useState(eventData?.description);
    const [maxInterns, setmaxInterns] = useState(eventData?.maxInterns);
    const [responsable, setResponsable] = useState('');

    useEffect(() => {
        const event = events.find(e => e.id_event === parseInt(id_event!, 10));
        setEventData(event);
        console.log(id_event, event)
    }, [id_event]);

    useEffect(() => {
        if (eventData) {
            setEventName(eventData.name || '');
            setHours(eventData.validatedHours || '');
            setDate(eventData.startDate?.format('DD-MM-YYYY') || '');
            setStartTime(eventData.startDate?.format('HH:mm') || '');
            setEndTime(eventData.endDate?.format('HH:mm') || '');
            setDescription(eventData.description || '');
            setmaxInterns(eventData.maxInterns || '');
            setResponsable(eventData.responsable || '');
        }
    }, [eventData]);
    
    const navigate = useNavigate();
    
    const handleUpdateEvent = () => {
        if (eventData) {
            eventData.name = eventName;
            eventData.validatedHours = hours;
            //TODO: eventData.startDate = new Date(date + 'T' + startTime);
            //TODO: eventData.endDate = new Date(date + 'T' + endTime);
            eventData.description = description;
            eventData.maxInterns = maxInterns;
            eventData.responsable = responsable;
    
            navigate('/events');
        }
    };

    

    if (!eventData) {
        return <Typography variant="h6">Cargando evento...</Typography>;
    }


    return (
        <Paper elevation={3} sx={{ padding: 4, margin: '50px auto', maxWidth: 1000, backgroundColor: '#f5f5f5' }}>
            <Typography variant="h3" align="center" gutterBottom>
                ACTUALIZAR EVENTO
            </Typography>
            <Grid container justifyContent="center">
                <Grid item xs={12} sm={8} md={6}>
                    <Typography variant="h6" sx={{ color: '#333' }}>name del evento</Typography>
                    <TextField
                    defaultValue={eventName}
                        fullWidth
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                        variant="outlined"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: '#999999',
                                '& fieldset': {
                                    borderColor: '#c0c0c0',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#a0a0a0',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#808080',
                                },
                            },
                            '& .MuiInputBase-input': {
                                color: '#fff',
                            },
                        }}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ marginTop: 2 }}>
                <Grid item xs={12} sm={4}>
                    <Typography variant="h6" sx={{ color: '#333' }}>Horas Becarias</Typography>
                    <TextField
                        fullWidth
                        value={hours}
                        onChange={(e) => setHours(e.target.value)}
                        variant="outlined"
                        size="small"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: '#999999',
                                '& fieldset': {
                                    borderColor: '#c0c0c0',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#a0a0a0',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#808080',
                                },
                            },
                            '& .MuiInputBase-input': {
                                color: '#fff',
                            },
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Typography variant="h6" sx={{ color: '#333' }}>Fecha</Typography>
                    <TextField
                        fullWidth
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        variant="outlined"
                        size="small"
                        type="date"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: '#999999',
                                '& fieldset': {
                                    borderColor: '#c0c0c0',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#a0a0a0',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#808080',
                                },
                            },
                            '& .MuiInputBase-input': {
                                color: '#fff',
                            },
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Typography variant="h6" sx={{ color: '#333' }}>Hora de inicio y Finalización</Typography>
                    <TextField
                        fullWidth
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        variant="outlined"
                        size="small"
                        type="time"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: '#999999',
                                '& fieldset': {
                                    borderColor: '#c0c0c0',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#a0a0a0',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#808080',
                                },
                            },
                            '& .MuiInputBase-input': {
                                color: '#fff',
                            },
                        }}
                    />
                    <TextField
                        fullWidth
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        variant="outlined"
                        size="small"
                        type="time"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: '#999999',
                                '& fieldset': {
                                    borderColor: '#c0c0c0',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#a0a0a0',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#808080',
                                },
                            },
                            '& .MuiInputBase-input': {
                                color: '#fff',
                            },
                        }}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ marginTop: 2 }}>
                <Grid item xs={12}>
                    <Typography variant="h6" sx={{ color: '#333' }}>Descripción del evento</Typography>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        variant="outlined"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: '#999999',
                                '& fieldset': {
                                    borderColor: '#c0c0c0',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#a0a0a0',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#808080',
                                },
                            },
                            '& .MuiInputBase-input': {
                                color: '#fff',
                            },
                        }}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ marginTop: 2 }}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" sx={{ color: '#333' }}>Nro de Becarios</Typography>
                    <TextField
                        fullWidth
                        value={maxInterns}
                        onChange={(e) => setmaxInterns(e.target.value)}
                        variant="outlined"
                        size="small"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: '#999999',
                                '& fieldset': {
                                    borderColor: '#c0c0c0',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#a0a0a0',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#808080',
                                },
                            },
                            '& .MuiInputBase-input': {
                                color: '#fff',
                            },
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" sx={{ color: '#333' }}>Responsable</Typography>
                    <TextField
                        fullWidth
                        value={responsable}
                        onChange={(e) => setResponsable(e.target.value)}
                        variant="outlined"
                        size="small"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: '#999999',
                                '& fieldset': {
                                    borderColor: '#c0c0c0',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#a0a0a0',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#808080',
                                },
                            },
                            '& .MuiInputBase-input': {
                                color: '#fff',
                            },
                        }}
                    />
                </Grid>
            </Grid>
            <Grid container justifyContent="center" sx={{ marginTop: 4 }}>
                <Button variant="contained" color="primary" onClick={handleUpdateEvent}>
                    Actualizar Evento
                </Button>
            </Grid>
        </Paper>
    );
};

export default UpdateEventForm;