interface DescriptionPanelProps {
  description: string;
  isProcessing: boolean;
  isCameraActive: boolean;
}

export const DescriptionPanel = ({ description, isProcessing, isCameraActive }: DescriptionPanelProps) => {
  const getMessage = () => {
    if (description) return description;
    if (isProcessing) return 'Analyzing...';
    if (isCameraActive) return 'Tap the eye button to describe the scene';
    return 'Start the camera to begin';
  };

  return (
    <div className="absolute bottom-32 left-0 right-0 px-4">
      <div className="bg-card/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-border">
        <div className="flex items-start gap-3">
          {isProcessing && (
            <div className="flex-shrink-0 mt-1">
              <div className="w-4 h-4 rounded-full bg-primary animate-pulse" />
            </div>
          )}
          <p className="text-2xl leading-relaxed font-medium text-foreground">
            {getMessage()}
          </p>
        </div>
      </div>
    </div>
  );
};
