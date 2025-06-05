
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Heart, AlertTriangle, CheckCircle } from 'lucide-react';

interface PredictionResultProps {
  prediction: {
    hasHeartDisease: boolean;
    probability: number;
    riskLevel: 'Low' | 'Medium' | 'High';
  };
}

const PredictionResult: React.FC<PredictionResultProps> = ({ prediction }) => {
  const { hasHeartDisease, probability, riskLevel } = prediction;
  
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getProgressColor = (level: string) => {
    switch (level) {
      case 'Low': return 'bg-green-500';
      case 'Medium': return 'bg-yellow-500';
      case 'High': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="border-l-4 border-l-red-500 animate-in slide-in-from-right duration-500">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Heart className="h-5 w-5 text-red-600" />
          <span>Prediction Result</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Result */}
        <div className="text-center p-6 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex justify-center mb-4">
            {hasHeartDisease ? (
              <AlertTriangle className="h-16 w-16 text-red-500" />
            ) : (
              <CheckCircle className="h-16 w-16 text-green-500" />
            )}
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {hasHeartDisease ? 'Heart Disease Risk Detected' : 'Low Heart Disease Risk'}
          </h3>
          <p className="text-gray-600">
            {hasHeartDisease 
              ? 'The model indicates a significant risk of heart disease. Please consult with a healthcare professional.' 
              : 'The model indicates a low risk of heart disease. Continue maintaining healthy lifestyle habits.'
            }
          </p>
        </div>

        {/* Risk Level */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Risk Level:</span>
          <Badge className={getRiskColor(riskLevel)}>
            {riskLevel} Risk
          </Badge>
        </div>

        {/* Probability */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Risk Probability:</span>
            <span className="text-sm font-bold text-gray-900">{probability}%</span>
          </div>
          <Progress 
            value={probability} 
            className="h-3"
          />
        </div>

        {/* Recommendations */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">Recommendations:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            {hasHeartDisease ? (
              <>
                <li>• Schedule an appointment with a cardiologist</li>
                <li>• Monitor blood pressure and cholesterol regularly</li>
                <li>• Consider lifestyle modifications (diet, exercise)</li>
                <li>• Discuss medication options with your doctor</li>
              </>
            ) : (
              <>
                <li>• Maintain regular exercise routine</li>
                <li>• Follow a heart-healthy diet</li>
                <li>• Schedule regular check-ups</li>
                <li>• Monitor risk factors over time</li>
              </>
            )}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default PredictionResult;
