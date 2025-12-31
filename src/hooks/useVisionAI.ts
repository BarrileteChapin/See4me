import { useState, useCallback, useRef } from 'react';

interface UseVisionAIProps {
  apiKey: string;
  onDescription: (text: string) => void;
}

export const useVisionAI = ({ apiKey, onDescription }: UseVisionAIProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const lastDescriptionRef = useRef<string>('');

  const analyzeFrame = useCallback(async (imageBase64: string) => {
    if (!apiKey || isProcessing) return;

    setIsProcessing(true);
    setError(null);

    try {
      // Remove data URL prefix
      const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [
                {
                  text: "You are an AI assistant for visually impaired users. Describe what you see in this image in 1-2 clear, concise sentences. Focus on: people, obstacles, objects, text/signs, and spatial layout. Be helpful and safety-focused. Speak directly to the user."
                },
                {
                  inline_data: {
                    mime_type: "image/jpeg",
                    data: base64Data
                  }
                }
              ]
            }],
            generationConfig: {
              temperature: 0.4,
              maxOutputTokens: 150,
            }
          }),
        }
      );

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Rate limit exceeded. Please wait a moment before trying again, or check your Gemini API quota.');
        }
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data = await response.json();
      const description = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      
      // Only update if description changed significantly
      if (description && description !== lastDescriptionRef.current) {
        lastDescriptionRef.current = description;
        onDescription(description);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Vision analysis failed';
      setError(message);
    } finally {
      setIsProcessing(false);
    }
  }, [apiKey, isProcessing, onDescription]);

  return {
    analyzeFrame,
    isProcessing,
    error,
  };
};
