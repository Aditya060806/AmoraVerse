import { useState, useCallback } from 'react';

interface PoemRequest {
  prompt: string;
  style?: string;
  tone?: string;
  language?: string;
  use_hybrid?: boolean;
  max_length?: number;
}

interface PoemResponse {
  poem: string;
  model_used: string;
  confidence_score: number;
  generation_time: number;
  style: string;
  tone: string;
}

interface ModelStatus {
  local_model_loaded: boolean;
  fallback_available: boolean;
  dataset_size: number;
  last_training?: string;
}

interface GenerationStats {
  total_generations: number;
  model_usage: Record<string, number>;
  average_confidence: number;
  average_generation_time: number;
}

interface UserPoem {
  prompt: string;
  poem: string;
  style?: string;
  tone?: string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/api' : 'http://localhost:8001');

export const useAmoraVerseAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generatePoem = useCallback(async (request: PoemRequest): Promise<PoemResponse | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/generate-poem`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate poem';
      setError(errorMessage);
      console.error('Error generating poem:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const refinePoem = useCallback(async (request: PoemRequest): Promise<{ variations: PoemResponse[]; original_prompt: string } | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/refine-poem`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to refine poem';
      setError(errorMessage);
      console.error('Error refining poem:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const addUserPoem = useCallback(async (userPoem: UserPoem): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/add-user-poem`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_poem: userPoem.poem,
          user_prompt: userPoem.prompt,
          style: userPoem.style || 'User Generated',
          tone: userPoem.tone || 'Personal',
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add user poem';
      setError(errorMessage);
      console.error('Error adding user poem:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const getModelStatus = useCallback(async (): Promise<ModelStatus | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/model-status`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      console.error('Error getting model status:', err);
      return null;
    }
  }, []);

  const getGenerationStats = useCallback(async (): Promise<GenerationStats | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/generation-stats`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      console.error('Error getting generation stats:', err);
      return null;
    }
  }, []);

  const getAvailableStyles = useCallback(async (): Promise<string[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/styles`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.styles || [];
    } catch (err) {
      console.error('Error getting styles:', err);
      return [];
    }
  }, []);

  const getAvailableTones = useCallback(async (): Promise<string[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/tones`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.tones || [];
    } catch (err) {
      console.error('Error getting tones:', err);
      return [];
    }
  }, []);

  const getAvailableLanguages = useCallback(async (): Promise<string[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/languages`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.languages || [];
    } catch (err) {
      console.error('Error getting languages:', err);
      return [];
    }
  }, []);

  const analyzeMoodFromImage = useCallback(async (imageData: string): Promise<{
    detected_mood: string;
    suggested_prompts: string[];
    confidence: number;
  } | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/analyze-mood`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image_data: imageData }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to analyze mood';
      setError(errorMessage);
      console.error('Error analyzing mood:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const checkHealth = useCallback(async (): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      return response.ok;
    } catch (err) {
      console.error('Health check failed:', err);
      return false;
    }
  }, []);

  return {
    // State
    loading,
    error,
    
    // Actions
    generatePoem,
    refinePoem,
    addUserPoem,
    analyzeMoodFromImage,
    
    // Queries
    getModelStatus,
    getGenerationStats,
    getAvailableStyles,
    getAvailableTones,
    getAvailableLanguages,
    checkHealth,
    
    // Utilities
    clearError: () => setError(null),
  };
}; 