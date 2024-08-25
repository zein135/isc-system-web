import { Grid } from "@mui/material";
import { events } from "../../data/events";
import CompleteScholarshipHourEventCard from "../../components/cards/CompleteScholarshipHourEventCard";

const CompleteScholarshipHourPage: React.FC = () => {
    return (
        <>
            <Grid container spacing={1} direction="column" alignItems="center" justifyContent="center">
                {events.map((event, index) => {
                    return (
                        <Grid item xs={12}>
                            <CompleteScholarshipHourEventCard key={index} event={event} />
                        </Grid>
                    );
                })}
            </Grid>
        </>
    );
};

export default CompleteScholarshipHourPage;