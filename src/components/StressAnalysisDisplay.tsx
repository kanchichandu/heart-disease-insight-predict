
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { StressAnalysisResult, getStressLevelColor } from '../utils/stressDetection';
import { Brain } from 'lucide-react';

interface StressAnalysisDisplayProps {
  analysisResult: StressAnalysisResult | null;
}

const StressAnalysisDisplay: React.FC<StressAnalysisDisplayProps> = ({ analysisResult }) => {
  if (!analysisResult) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="h-5 w-5 mr-2 text-purple-600" />
            <span>Stress Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          Start the camera to begin stress analysis
        </CardContent>
      </Card>
    );
  }

  const { level, confidence, stressScore } = analysisResult;
  const levelColor = getStressLevelColor(level);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Brain className="h-5 w-5 mr-2 text-purple-600" />
          <span>Stress Analysis</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Current Stress Level:</h3>
          <div className={`px-3 py-1 rounded-full text-white font-medium ${levelColor}`}>
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Stress Score</span>
            <span className="font-medium">{stressScore}%</span>
          </div>
          <Progress value={stressScore} className="h-2" />
        </div>
        
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Analysis Confidence</span>
            <span className="font-medium">{Math.round(confidence)}%</span>
          </div>
          <Progress value={confidence} className="h-2 bg-gray-200" />
        </div>
        
        <div className="mt-4 p-3 bg-gray-50 rounded-md text-sm">
          <h4 className="font-medium mb-1">Recommendation:</h4>
          {level === 'high' && (
            <p>Consider taking a break and practicing deep breathing exercises.</p>
          )}
          {level === 'moderate' && (
            <p>Try to take a few deep breaths to maintain your calm state.</p>
          )}
          {level === 'low' && (
            <p>You're doing great! Your stress levels appear to be under control.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StressAnalysisDisplay;
