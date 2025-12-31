import { forwardRef } from 'react';
import { Detection } from '@/hooks/useObjectDetection';
import { DetectionOverlay } from './DetectionOverlay';

interface CameraViewProps {
  isActive: boolean;
  detections?: Detection[];
  videoWidth?: number;
  videoHeight?: number;
}

export const CameraView = forwardRef<HTMLVideoElement, CameraViewProps>(
  ({ isActive, detections = [], videoWidth = 1280, videoHeight = 720 }, ref) => {
    return (
      <div className="absolute inset-0 bg-card">
        <video
          ref={ref}
          autoPlay
          playsInline
          muted
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isActive ? 'opacity-100' : 'opacity-0'
          }`}
        />
        
        {/* Detection overlay */}
        {isActive && detections.length > 0 && (
          <DetectionOverlay
            detections={detections}
            videoWidth={videoWidth}
            videoHeight={videoHeight}
          />
        )}
        
        {!isActive && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center p-8">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-primary"
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
              </div>
              <p className="text-2xl font-bold text-foreground">
                Camera Ready
              </p>
              <p className="text-xl text-muted-foreground mt-2">
                Tap Start to begin
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }
);

CameraView.displayName = 'CameraView';
