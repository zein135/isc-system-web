import { Dayjs } from "dayjs";

export interface EventDetails {
    title: string;
    date: Dayjs;
    endDate: Dayjs;
    duration: number;
    scholarshipHours: string;
    location: string;
    maxParticipants: number;
    minParticipants: number;
    description: string;
    responsiblePerson: string;
    status: "PENDIENTE" | "ACEPTADO" | "RECHAZADO";
}