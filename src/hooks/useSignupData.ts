import { useState, useEffect, useCallback } from "react";
import { apiUrl } from "@/apiConfig";
import {
  FALLBACK_REGIONS,
  FALLBACK_CITIES,
  FALLBACK_GRADES,
  CACHE_KEYS,
  Choice,
} from "@/lib/constants/signupConstants";

interface UseSignupDataReturn {
  grades: Choice[];
  regions: Choice[];
  cities: Choice[];
  loading: {
    grades: boolean;
    regions: boolean;
    cities: boolean;
  };
  errors: {
    grades: string | null;
    regions: string | null;
    cities: string | null;
  };
  refetch: {
    grades: () => void;
    regions: () => void;
    cities: () => void;
  };
}

export const useSignupData = (): UseSignupDataReturn => {
  const [grades, setGrades] = useState<Choice[]>([]);
  const [regions, setRegions] = useState<Choice[]>([]);
  const [cities, setCities] = useState<Choice[]>([]);

  const [loading, setLoading] = useState({
    grades: false,
    regions: false,
    cities: false,
  });

  const [errors, setErrors] = useState({
    grades: null as string | null,
    regions: null as string | null,
    cities: null as string | null,
  });

  // Generic fetch function with caching
  const fetchData = useCallback(
    async (
      endpoint: string,
      cacheKey: string,
      fallbackData: Choice[],
      setData: (data: Choice[]) => void,
      setLoadingState: (loading: boolean) => void,
      setError: (error: string | null) => void,
    ) => {
      setLoadingState(true);
      setError(null);

      try {
        // Check cache first
        if (typeof window !== "undefined") {
          const cached = localStorage.getItem(cacheKey);
          if (cached) {
            const cachedData = JSON.parse(cached);
            setData(cachedData);
            setLoadingState(false);
          }
        }

        // Fetch from API
        const response = await fetch(`${apiUrl}${endpoint}`, {
          signal: AbortSignal.timeout(10000), // 10 second timeout
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          setData(data);
          // Cache the data
          if (typeof window !== "undefined") {
            localStorage.setItem(cacheKey, JSON.stringify(data));
          }
        } else {
          // Use fallback if API returns empty
          setData(fallbackData);
        }
      } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
        setError(
          error instanceof Error ? error.message : "Failed to fetch data",
        );
        setData(fallbackData);
      } finally {
        setLoadingState(false);
      }
    },
    [],
  );

  // Fetch grades
  const fetchGrades = useCallback(() => {
    fetchData(
      "/sections",
      CACHE_KEYS.GRADES,
      FALLBACK_GRADES,
      setGrades,
      (loading) => setLoading((prev) => ({ ...prev, grades: loading })),
      (error) => setErrors((prev) => ({ ...prev, grades: error })),
    );
  }, [fetchData]);

  // Fetch regions
  const fetchRegions = useCallback(() => {
    fetchData(
      "/region",
      CACHE_KEYS.REGIONS,
      FALLBACK_REGIONS,
      setRegions,
      (loading) => setLoading((prev) => ({ ...prev, regions: loading })),
      (error) => setErrors((prev) => ({ ...prev, regions: error })),
    );
  }, [fetchData]);

  // Fetch cities
  const fetchCities = useCallback(() => {
    fetchData(
      "/city",
      CACHE_KEYS.CITIES,
      FALLBACK_CITIES,
      setCities,
      (loading) => setLoading((prev) => ({ ...prev, cities: loading })),
      (error) => setErrors((prev) => ({ ...prev, cities: error })),
    );
  }, [fetchData]);

  // Load data on mount
  useEffect(() => {
    fetchGrades();
    fetchRegions();
    fetchCities();
  }, [fetchGrades, fetchRegions, fetchCities]);

  return {
    grades,
    regions,
    cities,
    loading,
    errors,
    refetch: {
      grades: fetchGrades,
      regions: fetchRegions,
      cities: fetchCities,
    },
  };
};
