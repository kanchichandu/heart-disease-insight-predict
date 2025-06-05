
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Brain, Target, TrendingUp, Zap } from 'lucide-react';

const ModelStats = () => {
  const modelMetrics = [
    { 
      name: 'Accuracy', 
      value: 94.5, 
      icon: Target, 
      color: 'text-blue-600',
      description: 'Overall prediction accuracy'
    },
    { 
      name: 'Precision', 
      value: 92.3, 
      icon: Zap, 
      color: 'text-green-600',
      description: 'Accuracy of positive predictions'
    },
    { 
      name: 'Recall', 
      value: 89.7, 
      icon: TrendingUp, 
      color: 'text-purple-600',
      description: 'Ability to find all positive cases'
    },
    { 
      name: 'F1-Score', 
      value: 91.0, 
      icon: Brain, 
      color: 'text-orange-600',
      description: 'Harmonic mean of precision and recall'
    }
  ];

  const confusionMatrix = {
    truePositive: 89,
    falsePositive: 7,
    trueNegative: 94,
    falseNegative: 10
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-purple-600" />
          <span>Model Performance</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Performance Metrics */}
        <div className="space-y-4">
          {modelMetrics.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <IconComponent className={`h-4 w-4 ${metric.color}`} />
                    <div>
                      <span className="text-sm font-medium text-gray-900">{metric.name}</span>
                      <p className="text-xs text-gray-500">{metric.description}</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-gray-700">{metric.value}%</span>
                </div>
                <Progress value={metric.value} className="h-2" />
              </div>
            );
          })}
        </div>

        {/* Confusion Matrix */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-3">Confusion Matrix</h4>
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="bg-green-100 p-3 rounded">
              <div className="text-sm text-green-800 font-medium">True Positive</div>
              <div className="text-2xl font-bold text-green-900">{confusionMatrix.truePositive}</div>
            </div>
            <div className="bg-red-100 p-3 rounded">
              <div className="text-sm text-red-800 font-medium">False Positive</div>
              <div className="text-2xl font-bold text-red-900">{confusionMatrix.falsePositive}</div>
            </div>
            <div className="bg-red-100 p-3 rounded">
              <div className="text-sm text-red-800 font-medium">False Negative</div>
              <div className="text-2xl font-bold text-red-900">{confusionMatrix.falseNegative}</div>
            </div>
            <div className="bg-green-100 p-3 rounded">
              <div className="text-sm text-green-800 font-medium">True Negative</div>
              <div className="text-2xl font-bold text-green-900">{confusionMatrix.trueNegative}</div>
            </div>
          </div>
        </div>

        {/* Model Info */}
        <div className="bg-purple-50 p-4 rounded-lg">
          <h4 className="font-semibold text-purple-900 mb-2">Model Information</h4>
          <div className="text-sm text-purple-800 space-y-1">
            <p><strong>Algorithm:</strong> Random Forest Classifier</p>
            <p><strong>Training Data:</strong> 303 patients</p>
            <p><strong>Features:</strong> 13 cardiovascular indicators</p>
            <p><strong>Cross-validation:</strong> 5-fold CV</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModelStats;
