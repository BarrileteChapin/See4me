import { useState, useEffect, useCallback } from 'react';
import { useCamera } from '@/hooks/useCamera';
import { useVisionAI } from '@/hooks/useVisionAI';
import { useVoiceNarration } from '@/hooks/useVoiceNarration';
import { useHapticFeedback } from '@/hooks/useHapticFeedback';
import { useObjectDetection } from '@/hooks/useObjectDetection';
import { CameraView } from '@/components/CameraView';
import { DescriptionPanel } from '@/components/DescriptionPanel';
import { ControlBar } from '@/components/ControlBar';
import { SettingsDialog } from '@/components/SettingsDialog';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { toast } = useToast();
  const { tap, success } = useHapticFeedback();
  const [isMuted, setIsMuted] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [geminiKey, setGeminiKey] = useState(() => 
    localStorage.getItem('gemini_api_key') || ''
  );
  const [elevenLabsKey, setElevenLabsKey] = useState(() => 
    localStorage.getItem('elevenlabs_api_key') || ''
  );

  const { videoRef, isActive, error: cameraError, facingMode, startCamera, stopCamera, switchCamera, captureFrame } = useCamera();
  const { 
    isModelLoaded, 
    isDetecting, 
    detections, 
    error: detectionError,
    startContinuousDetection, 
    stopDetection 
  } = useObjectDetection();

  const handleDescription = useCallback((text: string) => {
    setDescription(text);
    success(); // Haptic feedback when new description arrives
  }, [success]);

  const { analyzeFrame, isProcessing, error: visionError } = useVisionAI({
    apiKey: geminiKey,
    onDescription: handleDescription,
  });

  const { speak, stop: stopVoice, isSpeaking, error: voiceError } = useVoiceNarration({
    apiKey: elevenLabsKey,
    isMuted,
  });

  // Persist API keys
  useEffect(() => {
    localStorage.setItem('gemini_api_key', geminiKey);
  }, [geminiKey]);

  useEffect(() => {
    localStorage.setItem('elevenlabs_api_key', elevenLabsKey);
  }, [elevenLabsKey]);

  // Speak when description changes
  useEffect(() => {
    if (description && !isMuted && elevenLabsKey) {
      speak(description);
    }
  }, [description, isMuted, elevenLabsKey, speak]);

  // Manual trigger for analysis
  const handleDescribe = useCallback(() => {
    tap(); // Haptic feedback on button tap
    if (!geminiKey) {
      setIsSettingsOpen(true);
      toast({ 
        title: 'API Key Required', 
        description: 'Please add your Gemini API key first.',
      });
      return;
    }
    if (!isActive) {
      toast({ 
        title: 'Camera Not Active', 
        description: 'Please start the camera first.',
      });
      return;
    }
    const frame = captureFrame();
    if (frame) {
      analyzeFrame(frame);
    }
  }, [geminiKey, isActive, captureFrame, analyzeFrame, toast, tap]);

  // Handle errors
  useEffect(() => {
    if (cameraError) {
      toast({ title: 'Camera Error', description: cameraError, variant: 'destructive' });
    }
  }, [cameraError, toast]);

  useEffect(() => {
    if (visionError) {
      toast({ title: 'Vision Error', description: visionError, variant: 'destructive' });
    }
  }, [visionError, toast]);

  useEffect(() => {
    if (voiceError) {
      toast({ title: 'Voice Error', description: voiceError, variant: 'destructive' });
    }
  }, [voiceError, toast]);

  useEffect(() => {
    if (detectionError) {
      toast({ title: 'Detection Error', description: detectionError, variant: 'destructive' });
    }
  }, [detectionError, toast]);

  const handleToggleCamera = useCallback(() => {
    if (isActive) {
      stopCamera();
      stopVoice();
      stopDetection();
      setDescription('');
    } else {
      if (!geminiKey) {
        setIsSettingsOpen(true);
        toast({ 
          title: 'API Key Required', 
          description: 'Please add your Gemini API key to start.',
        });
        return;
      }
      startCamera();
    }
  }, [isActive, geminiKey, startCamera, stopCamera, stopVoice, stopDetection, toast]);

  const handleToggleMute = useCallback(() => {
    setIsMuted(prev => {
      if (!prev) {
        stopVoice();
      }
      return !prev;
    });
  }, [stopVoice]);

  const handleToggleDetection = useCallback(() => {
    if (isDetecting) {
      stopDetection();
    } else if (videoRef.current) {
      startContinuousDetection(videoRef.current);
    }
  }, [isDetecting, videoRef, startContinuousDetection, stopDetection]);

  return (
    <div className="fixed inset-0 bg-background overflow-hidden">
      {/* Camera View */}
      <CameraView 
        ref={videoRef} 
        isActive={isActive} 
        detections={detections}
        videoWidth={videoRef.current?.videoWidth || 1280}
        videoHeight={videoRef.current?.videoHeight || 720}
      />
      
      {/* Description Panel */}
      <DescriptionPanel description={description} isProcessing={isProcessing} isCameraActive={isActive} />
      
      {/* Control Bar */}
      <ControlBar
        isActive={isActive}
        isMuted={isMuted}
        isSpeaking={isSpeaking}
        isProcessing={isProcessing}
        isDetecting={isDetecting}
        isModelLoaded={isModelLoaded}
        facingMode={facingMode}
        onToggleCamera={handleToggleCamera}
        onToggleMute={handleToggleMute}
        onDescribe={handleDescribe}
        onToggleDetection={handleToggleDetection}
        onSwitchCamera={switchCamera}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />
      
      {/* Settings Dialog */}
      <SettingsDialog
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        geminiKey={geminiKey}
        elevenLabsKey={elevenLabsKey}
        onGeminiKeyChange={setGeminiKey}
        onElevenLabsKeyChange={setElevenLabsKey}
      />
    </div>
  );
};

export default Index;
