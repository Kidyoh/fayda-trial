import { create } from "zustand";

interface StoreState {
  phoneNumber: string;
  setPhoneNumber: (newPhoneNumber: string) => void;
}

const useTemporaryPhonenumberStore = create<StoreState>((set) => ({
  phoneNumber: "",
  setPhoneNumber: (newPhoneNumber) => set({ phoneNumber: newPhoneNumber }),
}));

export default useTemporaryPhonenumberStore;
