import {create} from "zustand";

interface StoreState {
  drawerStatus: boolean;
  setDrawerStatus: (newDrawerStatus: boolean) => void;
}

const useDrawerStatus = create<StoreState>((set) => ({
  drawerStatus: false,
  setDrawerStatus: (newDrawerStatus) => set({ drawerStatus: newDrawerStatus }),
}));

export default useDrawerStatus;
