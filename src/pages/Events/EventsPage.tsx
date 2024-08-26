import React, { useState } from "react";
import { Grid, Tabs, Tab, Box } from "@mui/material";
import EventCard from "../../components/cards/EventCard";
import { events } from "../../data/events";
import dayjs from "dayjs";

const EventsPage: React.FC = () => {
  const [tabValue, setTabValue] = useState(1);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const filterEvents = () => {
    const today = dayjs();
    const startOfMonth = today.startOf("month");
    const endOfMonth = today.endOf("month");
    if (tabValue === 0) {
      return events.filter(
        (event) =>
          (event.startDate.isAfter(startOfMonth, "day") ||
            event.startDate.isSame(startOfMonth, "day")) &&
          (event.startDate.isBefore(endOfMonth, "day") ||
            event.startDate.isSame(endOfMonth, "day"))
      );
    } else if (tabValue === 1) {
      return events.filter((event) => event.startDate.isAfter(today, "day"));
    } else if (tabValue === 2) {
      return events.filter((event) => event.startDate.isBefore(today, "day"));
    }
    return events;
  };

  return (
    <>
      <Box
        sx={{ borderBottom: 1, borderColor: "divider", marginBottom: "20px" }}
      >
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="event tabs"
        >
          <Tab label="Evento del mes" />
          <Tab label="Evento próximo" />
          <Tab label="Evento pasado" />
        </Tabs>
      </Box>

      <Grid container spacing={2}>
        {filterEvents().map((event, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <EventCard event={event} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default EventsPage;
