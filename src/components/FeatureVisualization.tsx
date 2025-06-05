
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart3 } from 'lucide-react';

const FeatureVisualization = () => {
  const featureImportance = [
    { name: 'Chest Pain Type', importance: 85, description: 'Type of chest pain experienced' },
    { name: 'Exercise Angina', importance: 78, description: 'Exercise-induced angina' },
    { name: 'Max Heart Rate', importance: 72, description: 'Maximum heart rate achieved' },
    { name: 'ST Depression', importance: 68, description: 'ST depression induced by exercise' },
    { name: 'Age', importance: 65, description: 'Patient age' },
    { name: 'Cholesterol', importance: 58, description: 'Serum cholesterol level' },
    { name: 'Resting BP', importance: 52, description: 'Resting blood pressure' },
    { name: 'Thalassemia', importance: 48, description: 'Thalassemia blood disorder' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BarChart3 className="h-5 w-5 text-blue-600" />
          <span>Feature Importance</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {featureImportance.map((feature, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-gray-900">{feature.name}</span>
                  <p className="text-xs text-gray-500">{feature.description}</p>
                </div>
                <span className="text-sm font-bold text-gray-700">{feature.importance}%</span>
              </div>
              <Progress 
                value={feature.importance} 
                className="h-2"
              />
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Feature importance shows how much each factor contributes to the prediction. 
            Higher values indicate stronger predictive power in the machine learning model.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeatureVisualization;
