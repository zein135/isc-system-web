import { useNavigate } from 'react-router-dom';
import { Grid, Button } from '@mui/material';
import EventCard from '../../components/cards/EventCard';
import { events } from '../../data/events';

const EventsPage = () => {
  const navigate = useNavigate();

  const handleAddEventClick = () => {
    navigate('/events/create');
  };

  return (
    <>
      <Grid container spacing={2}>
        {events.map((event, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <EventCard event={event} />
          </Grid>
        ))}
      </Grid>
      <Grid container justifyContent="center" style={{ marginTop: '20px' }}>
        <Button variant="contained" color="primary" onClick={handleAddEventClick}>
          Agregar Evento
        </Button>
      </Grid>
    </>
  );
};

export default EventsPage;
