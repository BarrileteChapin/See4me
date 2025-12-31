import { useState, useCallback, useRef } from 'react';

interface UseVoiceNarrationProps {
  apiKey: string;
  isMuted: boolean;
}

export const useVoiceNarration = ({ apiKey, isMuted }: UseVoiceNarrationProps) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const queueRef = useRef<string[]>([]);
  const isPlayingRef = useRef(false);

  const playNextInQueue = useCallback(async () => {
    if (isPlayingRef.current || queueRef.current.length === 0 || isMuted || !apiKey) {
      return;
    }

    const text = queueRef.current.shift();
    if (!text) return;

    isPlayingRef.current = true;
    setIsSpeaking(true);

    try {
      const response = await fetch(
        'https://api.elevenlabs.io/v1/text-to-speech/EXAVITQu4vr4xnSDxMaL/stream',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'xi-api-key': apiKey,
          },
          body: JSON.stringify({
            text,
            model_id: 'eleven_turbo_v2_5',
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.75,
              speed: 1.0,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`ElevenLabs API error: ${response.status}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      if (audioRef.current) {
        audioRef.current.pause();
        URL.revokeObjectURL(audioRef.current.src);
      }

      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
        isPlayingRef.current = false;
        setIsSpeaking(false);
        playNextInQueue();
      };

      audio.onerror = () => {
        URL.revokeObjectURL(audioUrl);
        isPlayingRef.current = false;
        setIsSpeaking(false);
        playNextInQueue();
      };

      await audio.play();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Voice narration failed';
      setError(message);
      isPlayingRef.current = false;
      setIsSpeaking(false);
      playNextInQueue();
    }
  }, [apiKey, isMuted]);

  const speak = useCallback((text: string) => {
    if (!text || !apiKey) return;
    
    // Clear queue and add new text (we want latest description, not backlog)
    queueRef.current = [text];
    
    if (!isPlayingRef.current) {
      playNextInQueue();
    }
  }, [apiKey, playNextInQueue]);

  const stop = useCallback(() => {
    queueRef.current = [];
    if (audioRef.current) {
      audioRef.current.pause();
      URL.revokeObjectURL(audioRef.current.src);
      audioRef.current = null;
    }
    isPlayingRef.current = false;
    setIsSpeaking(false);
  }, []);

  return {
    speak,
    stop,
    isSpeaking,
    error,
  };
};
