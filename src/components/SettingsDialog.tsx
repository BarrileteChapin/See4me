import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface SettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  geminiKey: string;
  elevenLabsKey: string;
  onGeminiKeyChange: (key: string) => void;
  onElevenLabsKeyChange: (key: string) => void;
}

export const SettingsDialog = ({
  isOpen,
  onClose,
  geminiKey,
  elevenLabsKey,
  onGeminiKeyChange,
  onElevenLabsKeyChange,
}: SettingsDialogProps) => {
  const { toast } = useToast();
  const [isTesting, setIsTesting] = useState(false);

  const testElevenLabs = async () => {
    if (!elevenLabsKey) {
      toast({
        title: 'No API Key',
        description: 'Please enter your ElevenLabs API key first.',
        variant: 'destructive',
      });
      return;
    }

    setIsTesting(true);
    try {
      const response = await fetch(
        'https://api.elevenlabs.io/v1/text-to-speech/EXAVITQu4vr4xnSDxMaL/stream',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'xi-api-key': elevenLabsKey,
          },
          body: JSON.stringify({
            text: 'Connection successful!',
            model_id: 'eleven_turbo_v2_5',
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.75,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      
      audio.onended = () => URL.revokeObjectURL(audioUrl);
      await audio.play();

      toast({
        title: 'Success!',
        description: 'ElevenLabs connection is working.',
      });
    } catch (err) {
      toast({
        title: 'Connection Failed',
        description: err instanceof Error ? err.message : 'Failed to connect to ElevenLabs.',
        variant: 'destructive',
      });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Settings</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-3">
            <Label htmlFor="gemini-key" className="text-lg font-medium">
              Gemini API Key
            </Label>
            <Input
              id="gemini-key"
              type="password"
              placeholder="Enter your Gemini API key"
              value={geminiKey}
              onChange={(e) => onGeminiKeyChange(e.target.value)}
              className="h-14 text-lg"
            />
            <p className="text-sm text-muted-foreground">
              Get your key from{' '}
              <a
                href="https://aistudio.google.com/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                Google AI Studio
              </a>
            </p>
          </div>

          <div className="space-y-3">
            <Label htmlFor="elevenlabs-key" className="text-lg font-medium">
              ElevenLabs API Key
            </Label>
            <Input
              id="elevenlabs-key"
              type="password"
              placeholder="Enter your ElevenLabs API key"
              value={elevenLabsKey}
              onChange={(e) => onElevenLabsKeyChange(e.target.value)}
              className="h-14 text-lg"
            />
            <p className="text-sm text-muted-foreground">
              Get your key from{' '}
              <a
                href="https://elevenlabs.io/app/settings/api-keys"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                ElevenLabs
              </a>
            </p>
            <Button
              variant="outline"
              onClick={testElevenLabs}
              disabled={isTesting || !elevenLabsKey}
              className="w-full h-12"
            >
              {isTesting ? 'Testing...' : 'Test ElevenLabs Connection'}
            </Button>
          </div>

          <Button onClick={onClose} className="w-full h-14 text-lg">
            Save & Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
