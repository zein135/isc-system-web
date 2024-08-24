import { Grid } from "@mui/material";
import { events } from "../../data/events";
import CSHEventCard from "../../components/cards/CSHEventCard";

const CompleteScholarshipHourPage: React.FC = () => {
    return (
        <>
            <Grid container spacing={2}>
                {events.map((event, index) => {
                    return (
                        <Grid item xs={3}>
                            {" "}
                            <CSHEventCard key={index} event={event} />{" "}
                        </Grid>
                    );
                })}
            </Grid>
        </>
    );
};

export default CompleteScholarshipHourPage;