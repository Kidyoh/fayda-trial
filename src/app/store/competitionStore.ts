import { create } from "zustand";
import {
  Competition,
  CompetitionDetail,
  CompetitionEnrollment,
  UserPackage,
} from "@/lib/competitionAPI";

interface CompetitionState {
  // Current competition data
  competitions: Competition[];
  currentCompetition: CompetitionDetail | null;
  userEnrollment: CompetitionEnrollment | null;
  userPackages: UserPackage[];

  // UI state
  loading: boolean;
  error: string | null;

  // Actions
  setCompetitions: (competitions: Competition[]) => void;
  setCurrentCompetition: (competition: CompetitionDetail | null) => void;
  setUserEnrollment: (enrollment: CompetitionEnrollment | null) => void;
  setUserPackages: (packages: UserPackage[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  reset: () => void;
}

const useCompetitionStore = create<CompetitionState>((set) => ({
  // Initial state
  competitions: [],
  currentCompetition: null,
  userEnrollment: null,
  userPackages: [],
  loading: false,
  error: null,

  // Actions
  setCompetitions: (competitions) => set({ competitions }),
  setCurrentCompetition: (competition) =>
    set({ currentCompetition: competition }),
  setUserEnrollment: (enrollment) => set({ userEnrollment: enrollment }),
  setUserPackages: (packages) => set({ userPackages: packages }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
  reset: () =>
    set({
      competitions: [],
      currentCompetition: null,
      userEnrollment: null,
      userPackages: [],
      loading: false,
      error: null,
    }),
}));

export default useCompetitionStore;
