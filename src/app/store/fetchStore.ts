import {create} from "zustand";

interface StoreState {
  searchQuery: string;
  setSearchQuery: (newSearchQuery: string) => void;
  seenMaterials: boolean;
  setSeenMaterials: (newSeenMaterials: boolean) => void;
  fetchPackageReview: boolean;
  setFetchPackageReview: (newFetchPackageReview: boolean) => void;
}

const useFetchStore = create<StoreState>((set) => ({
  searchQuery: "",
  setSearchQuery: (newSearchQuery) => set({ searchQuery: newSearchQuery }),
  seenMaterials: false,
  setSeenMaterials: (newSeenMaterials) =>
    set({ seenMaterials: newSeenMaterials }),

  fetchPackageReview: false,
  setFetchPackageReview: (newFetchPackageReview) =>
    set({ fetchPackageReview: newFetchPackageReview }),
}));

export default useFetchStore;
