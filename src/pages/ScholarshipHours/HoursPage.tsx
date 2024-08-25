
import { useNavigate } from "react-router-dom";
import CircularProgress, { CircularProgressProps } from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import GraphicHours from "./GraphicHours";
import { colors, labels, progresses } from "../../data/hoursData";


function CircularProgressWithLabel(props: CircularProgressProps & { value: number, customColor: string }) {
    return (
        <Box sx={{ 
            backgroundColor: props.customColor, 
            padding: "10px", 
            borderRadius: "16px", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "space-between",
            width: "100%",
            marginBottom: "20px",
            position: "relative"
        }}>
            <Box sx={{ position: "relative", display: "inline-flex", marginRight: "10px" }}>
                <CircularProgress
                    variant="determinate"
                    {...props}
                    size={90}
                    thickness={8}
                    sx={{
                        color: "white",
                    }}
                />
                <Box
                    sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: "absolute",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Typography variant="h6" component="div" color="WHITE">
                        {`${Math.round(props.value)}%`}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default function CircularWithValueLabel() {
    const navigate = useNavigate();

    const handleEventsClick = () => {
        navigate("/events");
    };

    const handleRegistrationEventsClick = () => {
        navigate("/registrationEvent/2")
    }

    return (
        <Box 
            sx={{ 
                display: "flex", 
                flexDirection: { xs: "column", md: "row" },  
                justifyContent: "center", 
                alignItems: "center", 
                width: "90%",
                padding: { xs: "10px", md: "20px" },  
            }}
        >
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: { xs: "0", md: "40px" }, width: "100%" }}>
                {progresses.map((progress, index) => (
                    <Box key={index} sx={{ width: "100%", maxWidth: "400px" }}>  
                        <Typography variant="h6" component="div" sx={{ marginBottom: "10px", textAlign: "center" }}>
                            {labels[index]}
                        </Typography>
                        <CircularProgressWithLabel
                            value={progress}
                            customColor={colors[index]}
                        />
                    </Box>
                ))}
                <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px", flexDirection: { xs: "column", md: "row" } }}>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        sx={{ margin: "10px", width: "200px" }}
                        onClick={handleRegistrationEventsClick}                           
                    >
                        Pre inscripciones
                    </Button>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        sx={{ margin: "10px", width: "200px" }}
                        onClick={handleEventsClick}
                    >
                        Eventos
                    </Button>
                </Box>
            </Box>
            <GraphicHours />
        </Box>
    );
}
