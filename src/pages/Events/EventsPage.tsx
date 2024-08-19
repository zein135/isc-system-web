import React from 'react';
import { Grid, Button, Box } from '@mui/material'; 
import EventCard from '../../components/cards/EventCard';
import { events } from '../../data/events';
import { useNavigate } from 'react-router-dom';

const EventsPage: React.FC = () => {
  const navigate = useNavigate();

  const handleCreateEventClick = () => {
    navigate('/events/create'); 
  };

  return (
    <Box>
      <Grid container spacing={2}>
        {events.map((event, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <EventCard event={event} />
          </Grid>
        ))}
      </Grid>
      <Box mt={2} textAlign="center">
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateEventClick}
        >
          Crear Nuevo Evento
        </Button>
      </Box>
    </Box>
  );
}

export default EventsPage;
