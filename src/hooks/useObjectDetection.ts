import { useState, useEffect, useCallback, useRef } from 'react';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';

export interface Detection {
  class: string;
  score: number;
  bbox: [number, number, number, number]; // [x, y, width, height]
}

export const useObjectDetection = () => {
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [detections, setDetections] = useState<Detection[]>([]);
  const [error, setError] = useState<string | null>(null);
  const modelRef = useRef<cocoSsd.ObjectDetection | null>(null);
  const animationRef = useRef<number | null>(null);

  // Load the model on mount
  useEffect(() => {
    const loadModel = async () => {
      try {
        console.log('Loading COCO-SSD model...');
        modelRef.current = await cocoSsd.load();
        setIsModelLoaded(true);
        console.log('COCO-SSD model loaded successfully');
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load object detection model';
        setError(message);
        console.error('Failed to load model:', err);
      }
    };

    loadModel();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const detectObjects = useCallback(async (videoElement: HTMLVideoElement): Promise<Detection[]> => {
    if (!modelRef.current || !videoElement) return [];

    try {
      const predictions = await modelRef.current.detect(videoElement);
      return predictions
        .filter(p => p.score > 0.5)
        .map(p => ({
          class: p.class,
          score: p.score,
          bbox: p.bbox as [number, number, number, number],
        }));
    } catch (err) {
      console.error('Detection error:', err);
      return [];
    }
  }, []);

  const startContinuousDetection = useCallback((videoElement: HTMLVideoElement) => {
    if (!isModelLoaded) return;

    setIsDetecting(true);

    const detect = async () => {
      if (!modelRef.current) return;

      const results = await detectObjects(videoElement);
      setDetections(results);
      animationRef.current = requestAnimationFrame(detect);
    };

    detect();
  }, [isModelLoaded, detectObjects]);

  const stopDetection = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    setIsDetecting(false);
    setDetections([]);
  }, []);

  return {
    isModelLoaded,
    isDetecting,
    detections,
    error,
    detectObjects,
    startContinuousDetection,
    stopDetection,
  };
};
