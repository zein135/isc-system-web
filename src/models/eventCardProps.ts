import { Dayjs } from "dayjs";

export interface EventCardProps {
    event: {
            id_event: number;
            name: string;
            description: string;
            validatedHours: string;
            startDate: Dayjs;
            duration: number;
            place: string;
            maxInterns: number;
            minInterns: number;
    }
}