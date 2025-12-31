import { Detection } from '@/hooks/useObjectDetection';

interface DetectionOverlayProps {
  detections: Detection[];
  videoWidth: number;
  videoHeight: number;
}

export const DetectionOverlay = ({ detections, videoWidth, videoHeight }: DetectionOverlayProps) => {
  if (detections.length === 0) return null;

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox={`0 0 ${videoWidth} ${videoHeight}`}
      preserveAspectRatio="xMidYMid slice"
    >
      {detections.map((detection, index) => {
        const [x, y, width, height] = detection.bbox;
        const confidence = (detection.score * 100).toFixed(0);

        return (
          <g key={`${detection.class}-${index}`}>
            {/* Bounding box */}
            <rect
              x={x}
              y={y}
              width={width}
              height={height}
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="3"
              rx="4"
            />
            {/* Label background */}
            <rect
              x={x}
              y={y - 28}
              width={Math.max(detection.class.length * 10 + 50, 80)}
              height="26"
              fill="hsl(var(--primary))"
              rx="4"
            />
            {/* Label text */}
            <text
              x={x + 6}
              y={y - 10}
              fill="hsl(var(--primary-foreground))"
              fontSize="14"
              fontWeight="bold"
              fontFamily="system-ui, sans-serif"
            >
              {detection.class} {confidence}%
            </text>
          </g>
        );
      })}
    </svg>
  );
};
