
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";
import Box from "@mui/material/Box";
import { barData } from "../../data/graphicData";


export default function GraphicHours() {
    return (
        <Box sx={{ width: "500px" }}>
            <BarChart width={500} height={450} data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="semester" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="hours" fill="#4CAF50" />
            </BarChart>
        </Box>
    );
}
