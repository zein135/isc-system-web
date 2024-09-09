import { Grid, Box, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import GraphicHours from "./GraphicHours";
import HoursCard from "../../components/common/HoursCard";

interface HoursStats {
    totalHorasRequeridas: number;
    horasRealizadas: number;
    horasFaltantes: number;
}

function HoursPage() {
    const navigate = useNavigate();
    const [stats, setStats] = useState<HoursStats>();

    useEffect(() => {
    setTimeout(() => {
        const totalHorasRequeridas = 50;
        const horasRealizadas = 50;
        const horasFaltantes = totalHorasRequeridas - horasRealizadas;

        setStats({
            totalHorasRequeridas,
            horasRealizadas,
            horasFaltantes,
        });
    }, 1000);
    }, []);

    const handleEventsClick = () => {
    navigate("/events");
    };

    const handleRegistrationEventsClick = () => {
    navigate("/myEvents");
    };

    return (
    <Container fixed>
        <Grid container spacing={8} alignItems="center" justifyContent="center">
        <Grid item xs={22} md={4}>
            <Grid container spacing={3}>
            <Grid item xs={12}>
                <HoursCard
                backgroundColor="#f3a43f"
                textColor="#FFFFFF"
                title="Total de Horas Requeridas"
                subtitle=""
                count={stats?.totalHorasRequeridas || 0}
                percentage={100}
                />
            </Grid>
            <Grid item xs={12}>
                <HoursCard
                backgroundColor="#359be5"
                textColor="#FFFFFF"
                title="Horas Realizadas"
                subtitle=""
                count={stats?.horasRealizadas || 0}
                percentage={(stats?.horasRealizadas || 0) / (stats?.totalHorasRequeridas || 1) * 100}
                />
            </Grid>
            <Grid item xs={12}>
                <HoursCard
                backgroundColor="#ef4444"
                textColor="#FFFFFF"
                title="Horas Faltantes"
                subtitle=""
                count={stats?.horasFaltantes || 0}
                percentage={(stats?.horasFaltantes || 0) / (stats?.totalHorasRequeridas || 1) * 100}
                />
            </Grid>
            </Grid>
        </Grid>
        <Grid item xs={16} md={6}>
            <Box sx={{ width: "100%", padding: "20px" }}>
            <GraphicHours />
            </Box>
        </Grid>
        </Grid>
        <Box
        sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
            flexDirection: { xs: "column", md: "row" },
        }}
        >
        <Button
            variant="contained"
            color="primary"
            sx={{ margin: "10px", width: { xs: "100%", md: "200px" } }}
            onClick={handleRegistrationEventsClick}
        >
            Pre inscripciones
        </Button>
        <Button
            variant="contained"
            color="primary"
            sx={{ margin: "10px", width: { xs: "100%", md: "200px" } }}
            onClick={handleEventsClick}
        >
            Eventos
        </Button>
        </Box>
    </Container>
    );
}

export default HoursPage;
