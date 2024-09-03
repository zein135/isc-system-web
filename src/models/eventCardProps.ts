import { Dayjs } from "dayjs";

export interface EventCardProps {
    event: {
        id_event: number;
        name: string;
        inscriptionPeriod: Dayjs;
        cancelPeriod: Dayjs;
        validatedHours: string;
        description: string;
        startDate: Dayjs;
        endDate: Dayjs;
        duration: number;
        place: string;
        responsiblePerson: string;
        maxInterns: number;
        minInterns: number;
    }
}
