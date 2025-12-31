import { Button } from '@/components/ui/button';
import type { CameraFacing } from '@/hooks/useCamera';

interface ControlBarProps {
  isActive: boolean;
  isMuted: boolean;
  isSpeaking: boolean;
  isProcessing: boolean;
  isDetecting: boolean;
  isModelLoaded: boolean;
  facingMode: CameraFacing;
  onToggleCamera: () => void;
  onToggleMute: () => void;
  onDescribe: () => void;
  onToggleDetection: () => void;
  onSwitchCamera: () => void;
  onOpenSettings: () => void;
}

export const ControlBar = ({
  isActive,
  isMuted,
  isSpeaking,
  isProcessing,
  isDetecting,
  isModelLoaded,
  facingMode,
  onToggleCamera,
  onToggleMute,
  onDescribe,
  onToggleDetection,
  onSwitchCamera,
  onOpenSettings,
}: ControlBarProps) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/90 to-transparent">
      <div className="flex items-center justify-center gap-4">
        {/* Settings Button */}
        <Button
          variant="outline"
          size="lg"
          onClick={onOpenSettings}
          className="w-16 h-16 rounded-full"
          aria-label="Settings"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </Button>

        {/* Main Start/Stop Button */}
        <Button
          size="lg"
          onClick={onToggleCamera}
          className={`w-24 h-24 rounded-full text-xl font-bold transition-all ${
            isActive
              ? 'bg-destructive hover:bg-destructive/90 text-destructive-foreground'
              : 'bg-primary hover:bg-primary/90 text-primary-foreground'
          }`}
          aria-label={isActive ? 'Stop camera' : 'Start camera'}
        >
          {isActive ? 'STOP' : 'START'}
        </Button>

        {/* Describe Button */}
        <Button
          variant="secondary"
          size="lg"
          onClick={onDescribe}
          disabled={!isActive || isProcessing}
          className="w-16 h-16 rounded-full"
          aria-label="Describe what camera sees"
        >
          {isProcessing ? (
            <svg
              className="w-7 h-7 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          ) : (
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          )}
        </Button>

        {/* Object Detection Toggle Button */}
        <Button
          variant={isDetecting ? 'default' : 'outline'}
          size="lg"
          onClick={onToggleDetection}
          disabled={!isActive || !isModelLoaded}
          className="w-16 h-16 rounded-full"
          aria-label={isDetecting ? 'Stop object detection' : 'Start object detection'}
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 5a1 1 0 011-1h4a1 1 0 010 2H5a1 1 0 01-1-1zM4 13a1 1 0 011-1h4a1 1 0 010 2H5a1 1 0 01-1-1zM14 5a1 1 0 011-1h4a1 1 0 110 2h-4a1 1 0 01-1-1zM14 13a1 1 0 011-1h4a1 1 0 110 2h-4a1 1 0 01-1-1zM1 9a1 1 0 011-1h4a1 1 0 110 2H2a1 1 0 01-1-1zM18 9a1 1 0 011-1h4a1 1 0 110 2h-4a1 1 0 01-1-1z"
            />
            <rect
              x="6"
              y="6"
              width="12"
              height="12"
              rx="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
        </Button>

        {/* Switch Camera Button */}
        <Button
          variant="outline"
          size="lg"
          onClick={onSwitchCamera}
          disabled={!isActive}
          className="w-16 h-16 rounded-full"
          aria-label={facingMode === 'environment' ? 'Switch to front camera' : 'Switch to back camera'}
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </Button>

        <Button
          variant={isMuted ? 'destructive' : 'outline'}
          size="lg"
          onClick={onToggleMute}
          className="w-16 h-16 rounded-full relative"
          aria-label={isMuted ? 'Unmute voice' : 'Mute voice'}
        >
          {isMuted ? (
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
              />
            </svg>
          ) : (
            <>
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                />
              </svg>
              {isSpeaking && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full animate-pulse" />
              )}
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
