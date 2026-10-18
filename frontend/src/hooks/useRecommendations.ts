import { useState, useCallback } from "react";
import axios from "axios";
import { Recommendation, SearchQuery, RecommendationResponse } from "../types";

interface UseRecommendationsReturn {
  recommendations: Recommendation[];
  isLoading: boolean;
  error: string | null;
  fetchRecommendations: (query: SearchQuery) => Promise<void>;
  clearRecommendations: () => void;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || "";

export function useRecommendations(): UseRecommendationsReturn {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecommendations = useCallback(async (query: SearchQuery) => {
    setIsLoading(true);
    setError(null);
    setRecommendations([]);
    try {
      const response = await axios.post<RecommendationResponse>(
        `${API_BASE_URL}/api/recommendations`,
        {
          query: query.query,
          mood: query.mood,
          maxDuration: query.maxDuration,
          language: query.language,
          aiProvider: query.aiProvider,
        },
        { timeout: 35000 }
      );
      setRecommendations(response.data.recommendations || []);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || err.message || "Failed to get recommendations");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearRecommendations = useCallback(() => {
    setRecommendations([]);
    setError(null);
  }, []);

  return { recommendations, isLoading, error, fetchRecommendations, clearRecommendations };
}
