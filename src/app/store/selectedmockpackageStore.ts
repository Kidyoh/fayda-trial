import create from "zustand";

interface StoreState {
  mockpackage: Record<string, any>; // Update the type to match your JSON object structure
  setMockPackage: (data: Record<string, any>) => void;
}

const useSelectedMockPackageStore = create<StoreState>((set) => ({
  mockpackage: {}, // Initialize with an empty object or provide the initial JSON data
  setMockPackage: (newMockpackage) => set({ mockpackage: newMockpackage }),
}));

export default useSelectedMockPackageStore;
