import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, Cell } from "recharts";
import Box from "@mui/material/Box";
import { barData } from "../../data/graphicData";

export default function GraphicHours() {
    const getFillColor = (hours: number): string => {
        return hours < 50 ? "#FF0000" : "#4CAF50";
    };

    
    return (
        <Box sx={{ width: "500px" }}>
            <BarChart width={500} height={450} data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="semester" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="hours">
                    {barData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={getFillColor(entry.hours)} />
                    ))}
                </Bar>
            </BarChart>
        </Box>
    );
}
