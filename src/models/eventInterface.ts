export interface EventDetails {
    title: string;
    date: string;
    endDate: string;
    duration: number;
    scholarshipHours: string;
    location: string;
    maxParticipants: number;
    minParticipants: number;
    description: string;
    responsiblePerson: string;
    status: "PENDIENTE" | "ACEPTADO" | "RECHAZADO";
}