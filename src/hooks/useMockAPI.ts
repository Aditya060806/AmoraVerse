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

export const useMockAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generatePoem = useCallback(async (request: PoemRequest): Promise<PoemResponse | null> => {
    setLoading(true);
    setError(null);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      const samplePoems = [
        `In ${request.tone?.toLowerCase() || 'romantic'} whispers, ${request.prompt}. A ${request.style?.toLowerCase() || 'free verse'} of love that knows no bounds.`,
        `Through ${request.tone?.toLowerCase() || 'passionate'} eyes, I see ${request.prompt}. A ${request.style?.toLowerCase() || 'ghazal'} of eternal devotion.`,
        `With ${request.tone?.toLowerCase() || 'soulful'} heart, I write ${request.prompt}. A ${request.style?.toLowerCase() || 'shayari'} of pure emotion.`,
        `In ${request.tone?.toLowerCase() || 'soft'} moments, ${request.prompt}. A ${request.style?.toLowerCase() || 'letter'} of undying love.`,
        `Through ${request.tone?.toLowerCase() || 'playful'} dance, ${request.prompt}. A ${request.style?.toLowerCase() || 'rhymed'} verse of joy.`
      ];

      const randomPoem = samplePoems[Math.floor(Math.random() * samplePoems.length)];

      return {
        poem: randomPoem,
        model_used: "mock-generator",
        confidence_score: 0.85,
        generation_time: 1.2,
        style: request.style || "Free Verse",
        tone: request.tone || "Romantic"
      };
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

    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      const variations = [];
      for (let i = 0; i < 3; i++) {
        const samplePoems = [
          `Variation ${i + 1}: In ${request.tone?.toLowerCase() || 'romantic'} whispers, ${request.prompt}. A ${request.style?.toLowerCase() || 'free verse'} of love.`,
          `Variation ${i + 1}: Through ${request.tone?.toLowerCase() || 'passionate'} eyes, ${request.prompt}. A ${request.style?.toLowerCase() || 'ghazal'} of devotion.`,
          `Variation ${i + 1}: With ${request.tone?.toLowerCase() || 'soulful'} heart, ${request.prompt}. A ${request.style?.toLowerCase() || 'shayari'} of emotion.`
        ];

        variations.push({
          poem: samplePoems[Math.floor(Math.random() * samplePoems.length)],
          model_used: "mock-generator",
          confidence_score: 0.8 + (i * 0.05),
          generation_time: 1.0 + (i * 0.2),
          style: request.style || "Free Verse",
          tone: request.tone || "Romantic"
        });
      }

      return {
        variations,
        original_prompt: request.prompt
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to refine poem';
      setError(errorMessage);
      console.error('Error refining poem:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getModelStatus = useCallback(async (): Promise<ModelStatus | null> => {
    try {
      return {
        local_model_loaded: false,
        fallback_available: true,
        dataset_size: 0,
        last_training: null
      };
    } catch (err) {
      console.error('Error getting model status:', err);
      return null;
    }
  }, []);

  const getAvailableStyles = useCallback(async (): Promise<string[]> => {
    return ["Free Verse", "Ghazal", "Shayari", "Letter", "Rhymed", "Sonnet", "Haiku"];
  }, []);

  const getAvailableTones = useCallback(async (): Promise<string[]> => {
    return ["Soft", "Passionate", "Playful", "Soulful", "Apology", "Long-Distance", "Proposal", "Romantic"];
  }, []);

  const getAvailableLanguages = useCallback(async (): Promise<string[]> => {
    return ["English", "Hindi", "Urdu", "Spanish", "French", "Mixed"];
  }, []);

  return {
    loading,
    error,
    generatePoem,
    refinePoem,
    getModelStatus,
    getAvailableStyles,
    getAvailableTones,
    getAvailableLanguages
  };
}; 