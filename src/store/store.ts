import { create } from 'zustand';
import { Seminar } from '../models/studentProcess';

interface IProcessStore {
    process: Seminar | null ,
    setProcess: (newProcess: Seminar) => void
}


export const useProcessStore = create<IProcessStore>((set) => ({
  process: null,
  setProcess: (newProcess: Seminar) => set({ process: newProcess }),
}));
