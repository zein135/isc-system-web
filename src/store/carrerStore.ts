import { create } from "zustand";

interface Carrer {
    id: number;
    fullName: string;
    shortName: string;
}

interface ICarrer {
    carrer: Carrer | null;
    setCarrer: (newCarrer: Carrer) => void;
}

export const useCarrerStore = create<ICarrer>((set) => ({
    carrer: {
        id: 1,
        fullName: "Ingeniería de Sistemas Computacionales",
        shortName: "ISC",
    },
    setCarrer: (newCarrer: Carrer) => set({ carrer: newCarrer }),
}));
