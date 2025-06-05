
// A simple stress detection algorithm based on facial expressions
// In a production app, this would be replaced with a real ML model

type StressLevel = 'low' | 'moderate' | 'high' | 'unknown';

export interface StressAnalysisResult {
  level: StressLevel;
  confidence: number;
  stressScore: number;
}

// Mock function that would be replaced with actual ML analysis
export const analyzeStressLevel = (imageData: ImageData): StressAnalysisResult => {
  // This is a placeholder function that randomly generates stress levels
  // In a real implementation, this would use computer vision to analyze facial features
  
  const randomValue = Math.random();
  let level: StressLevel;
  let stressScore: number;
  
  if (randomValue < 0.3) {
    level = 'low';
    stressScore = Math.random() * 33;
  } else if (randomValue < 0.7) {
    level = 'moderate';
    stressScore = 33 + Math.random() * 33;
  } else {
    level = 'high';
    stressScore = 66 + Math.random() * 34;
  }
  
  // Add some random fluctuation to simulate analysis
  return {
    level,
    confidence: 70 + Math.random() * 25, // 70-95% confidence
    stressScore: Math.round(stressScore)
  };
};

// Helper function to get color based on stress level
export const getStressLevelColor = (level: StressLevel): string => {
  switch (level) {
    case 'low':
      return 'bg-green-500';
    case 'moderate':
      return 'bg-yellow-500';
    case 'high':
      return 'bg-red-500';
    default:
      return 'bg-gray-400';
  }
};
