import { Grid } from '@mui/material'; 
import EventCard from "../../components/cards/EventCard";
import { events } from '../../data/events';

const EventsPage = () => {

    return (
        <Grid container spacing={2}>
            {events.map((event, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                    <EventCard event={event} />
                </Grid>
            ))}
        </Grid>
    );
}

export default EventsPage;