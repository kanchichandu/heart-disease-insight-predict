
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain } from 'lucide-react';
import StressCamera from '@/components/StressCamera';
import StressAnalysisDisplay from '@/components/StressAnalysisDisplay';
import { StressAnalysisResult } from '@/utils/stressDetection';

const StressMonitor = () => {
  const [analysisResult, setAnalysisResult] = useState<StressAnalysisResult | null>(null);

  const handleStressAnalysis = (result: StressAnalysisResult) => {
    setAnalysisResult(result);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Brain className="h-8 w-8 text-purple-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Stress Level Monitor</h1>
              <p className="text-gray-600">Real-time stress analysis using facial expressions</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">System Status</p>
                  <p className="text-2xl font-bold text-gray-900">Active</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Analysis Mode</p>
                  <p className="text-2xl font-bold text-gray-900">Real-time</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Detection Accuracy</p>
                  <p className="text-2xl font-bold text-gray-900">85%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Camera Component */}
          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Live Camera Feed</CardTitle>
                <CardDescription>
                  Our system analyzes your facial expressions to detect stress levels
                </CardDescription>
              </CardHeader>
            </Card>
            <StressCamera onStressAnalysis={handleStressAnalysis} />
          </div>

          {/* Analysis Results */}
          <div className="space-y-6">
            <StressAnalysisDisplay analysisResult={analysisResult} />
            
            <Card>
              <CardHeader>
                <CardTitle>How It Works</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Our system captures frames from your webcam in real-time</li>
                  <li>Advanced algorithms analyze facial micro-expressions</li>
                  <li>Key stress indicators like eye movement, brow tension, and mouth position are evaluated</li>
                  <li>Results are calculated using our proprietary stress detection model</li>
                  <li>Personalized recommendations are provided based on your stress level</li>
                </ol>
                <div className="mt-4 p-3 bg-blue-50 rounded text-sm">
                  <p className="font-medium">Privacy Note:</p>
                  <p>All processing happens locally on your device. No video data is sent to our servers.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StressMonitor;
