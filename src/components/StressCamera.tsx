
import React, { useRef, useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { analyzeStressLevel, StressAnalysisResult } from '../utils/stressDetection';

interface StressCameraProps {
  onStressAnalysis: (result: StressAnalysisResult) => void;
}

const StressCamera: React.FC<StressCameraProps> = ({ onStressAnalysis }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [analysisInterval, setAnalysisInterval] = useState<NodeJS.Timeout | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: "user",
          width: { ideal: 640 },
          height: { ideal: 480 }
        }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreaming(true);
        toast({
          title: "Camera started",
          description: "Analyzing stress levels from facial expressions"
        });

        // Start analyzing frames every second
        const interval = setInterval(() => {
          captureAndAnalyzeFrame();
        }, 1000);
        
        setAnalysisInterval(interval);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      toast({
        title: "Camera Error",
        description: "Could not access your camera. Please check permissions.",
        variant: "destructive"
      });
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsStreaming(false);
      
      if (analysisInterval) {
        clearInterval(analysisInterval);
        setAnalysisInterval(null);
      }
      
      toast({
        title: "Camera stopped",
        description: "Stress level analysis paused"
      });
    }
  };

  const captureAndAnalyzeFrame = () => {
    if (videoRef.current && canvasRef.current && isStreaming) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        // Set canvas dimensions to match video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        // Draw current video frame to canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Get image data for analysis
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        
        // Analyze the frame for stress indicators
        const result = analyzeStressLevel(imageData);
        onStressAnalysis(result);
      }
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup on component unmount
      stopCamera();
    };
  }, []);

  return (
    <Card>
      <CardContent className="p-6 flex flex-col items-center">
        <div className="relative mb-4 rounded-lg overflow-hidden border border-gray-300">
          <video 
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-auto"
          />
          <canvas 
            ref={canvasRef} 
            className="hidden" // Hidden canvas used for processing
          />
        </div>
        
        <div className="flex gap-4 mt-2">
          {!isStreaming ? (
            <Button 
              onClick={startCamera}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Start Camera
            </Button>
          ) : (
            <Button 
              onClick={stopCamera}
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-50"
            >
              Stop Camera
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StressCamera;
