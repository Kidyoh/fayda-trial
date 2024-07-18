import create from "zustand";

interface StoreState {
  searchQuery: string;
  setSearchQuery: (newSearchQuery: string) => void;
}

const useFetchStore = create<StoreState>((set) => ({
  searchQuery: "",
  setSearchQuery: (newSearchQuery) => set({ searchQuery: newSearchQuery }),
}));

export default useFetchStore;
