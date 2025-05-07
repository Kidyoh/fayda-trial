import {create} from "zustand";

interface StoreState {
  point: string;
  setPoint: (newPoint: string) => void;
}

const useProfileStore = create<StoreState>((set) => ({
  point: "0",
  setPoint: (newPoint) => set({ point: newPoint }),
}));

export default useProfileStore;
