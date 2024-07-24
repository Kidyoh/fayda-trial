import create from "zustand";

interface StoreState {
  searchQuery: string;
  setSearchQuery: (newSearchQuery: string) => void;
  seenMaterials: boolean;
  setSeenMaterials: (newSeenMaterials: boolean) => void;
}

const useFetchStore = create<StoreState>((set) => ({
  searchQuery: "",
  setSearchQuery: (newSearchQuery) => set({ searchQuery: newSearchQuery }),
  seenMaterials: false,
  setSeenMaterials: (newSeenMaterials) =>
    set({ seenMaterials: newSeenMaterials }),
}));

export default useFetchStore;
