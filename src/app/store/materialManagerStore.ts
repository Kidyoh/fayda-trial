import create from "zustand";

interface StoreState {
  activeMaterialId: string;
  setActiveMaterialId: (newActiveMaterialId: string) => void;

  activeMaterialtype: string;
  setActiveMaterialtype: (newActiveMaterialtype: string) => void;
}

const useMaterialManagerStore = create<StoreState>((set) => ({
  activeMaterialId: "0",
  setActiveMaterialId: (newActiveMaterialId) =>
    set({ activeMaterialId: newActiveMaterialId }),

  activeMaterialtype: "0",
  setActiveMaterialtype: (newActiveMaterialtype) =>
    set({ activeMaterialtype: newActiveMaterialtype }),
}));

export default useMaterialManagerStore;
