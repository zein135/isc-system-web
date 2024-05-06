import { Container, Grid } from "@mui/material";
import ProjectCard from "../../components/common/ProjectCard";
import NumberCard from "../../components/common/NumberCard";
import AreaChartCard from "../../components/common/AreaChart";
import CalendarCard from "../../components/common/CalendarComponent";
const data = [
  { period: "2021 Q1", approved: 200 },
  { period: "2021 Q2", approved: 450 },
  { period: "2021 Q3", approved: 300 },
  { period: "2021 Q4", approved: 500 },
  { period: "2022 Q1", approved: 600 },
  { period: "2022 Q2", approved: 700 },
];
const myEventsList = [
  {
    title: "Conferencia sobre Graduación",
    start: new Date(2023, 9, 20, 10, 0, 0),
    end: new Date(2023, 9, 20, 15, 0, 0),
  },
  {
    title: "Revisión de Tesis",
    start: new Date(2023, 9, 22, 9, 30, 0),
    end: new Date(2023, 9, 22, 12, 0, 0),
  },
];

export const DashboardPage = () => {
  return (
    <Container fixed>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <ProjectCard />
        </Grid>
        <Grid item xs={4}>
          <NumberCard
            backgroundColor="#1450A3"
            textColor="#FFFFFF"
            title="Tutorias finalizadas"
            subtitle="2 en curso"
            count={12}
            percentage={75}
          />
        </Grid>
        <Grid item xs={4}>
          <NumberCard
            backgroundColor="#337CCF"
            textColor="#FFFFFF"
            title="Revisiones finalizadas"
            subtitle="3 en curso"
            count={12}
            percentage={75}
          />
        </Grid>
        <Grid item xs={4}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <AreaChartCard
                title="Estudiantes Aprobados por Período"
                data={data}
              />
            </Grid>
            <Grid item xs={12}>
              <AreaChartCard
                title="Estudiantes Aprobados por Período"
                data={data}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={8}>
          <CalendarCard events={myEventsList} />
        </Grid>
      </Grid>
    </Container>
  );
};
