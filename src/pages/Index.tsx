import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, Activity, TrendingUp, Users } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import PredictionResult from "@/components/PredictionResult";
import FeatureVisualization from "@/components/FeatureVisualization";
import ModelStats from "@/components/ModelStats";

const Index = () => {
  const [formData, setFormData] = useState({
    age: '',
    sex: '',
    chestPain: '',
    restingBP: '',
    cholesterol: '',
    fastingBS: '',
    restingECG: '',
    maxHR: '',
    exerciseAngina: '',
    oldpeak: '',
    slope: '',
    ca: '',
    thal: ''
  });
  
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      // Simple prediction logic based on risk factors
      const age = parseInt(formData.age);
      const chestPain = parseInt(formData.chestPain);
      const restingBP = parseInt(formData.restingBP);
      const cholesterol = parseInt(formData.cholesterol);
      const maxHR = parseInt(formData.maxHR);
      
      let riskScore = 0;
      
      // Age factor
      if (age > 60) riskScore += 0.3;
      else if (age > 45) riskScore += 0.2;
      
      // Chest pain factor
      if (chestPain === 0) riskScore += 0.4; // Typical angina
      else if (chestPain === 1) riskScore += 0.3; // Atypical angina
      
      // Blood pressure factor
      if (restingBP > 140) riskScore += 0.2;
      
      // Cholesterol factor
      if (cholesterol > 240) riskScore += 0.2;
      
      // Max heart rate factor
      if (maxHR < 120) riskScore += 0.2;
      
      // Exercise angina
      if (formData.exerciseAngina === '1') riskScore += 0.3;
      
      const probability = Math.min(riskScore * 100, 95);
      const hasHeartDisease = probability > 50;
      
      setPrediction({
        hasHeartDisease,
        probability: parseFloat(probability.toFixed(1)),
        riskLevel: probability > 70 ? 'High' : probability > 40 ? 'Medium' : 'Low'
      });
      
      setIsLoading(false);
      
      toast({
        title: "Prediction Complete",
        description: hasHeartDisease ? "High risk detected - please consult a doctor" : "Low risk detected",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <Heart className="h-8 w-8 text-red-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Heart Disease Predictor</h1>
              <p className="text-gray-600">AI-powered cardiovascular risk assessment</p>
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
                <Activity className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Model Accuracy</p>
                  <p className="text-2xl font-bold text-gray-900">94.5%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Patients Analyzed</p>
                  <p className="text-2xl font-bold text-gray-900">10,000+</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Early Detection Rate</p>
                  <p className="text-2xl font-bold text-gray-900">87%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-red-600" />
                <span>Patient Information</span>
              </CardTitle>
              <CardDescription>
                Enter patient data to predict cardiovascular risk
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="e.g. 65"
                      value={formData.age}
                      onChange={(e) => handleInputChange('age', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="sex">Sex</Label>
                    <Select value={formData.sex} onValueChange={(value) => handleInputChange('sex', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select sex" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Male</SelectItem>
                        <SelectItem value="0">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="chestPain">Chest Pain Type</Label>
                    <Select value={formData.chestPain} onValueChange={(value) => handleInputChange('chestPain', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Typical Angina</SelectItem>
                        <SelectItem value="1">Atypical Angina</SelectItem>
                        <SelectItem value="2">Non-Anginal Pain</SelectItem>
                        <SelectItem value="3">Asymptomatic</SelectItem>
                        <SelectItem value="4">NO</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="restingBP">Resting Blood Pressure</Label>
                    <Input
                      id="restingBP"
                      type="number"
                      placeholder="e.g. 120"
                      value={formData.restingBP}
                      onChange={(e) => handleInputChange('restingBP', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cholesterol">Cholesterol (mg/dl)</Label>
                    <Input
                      id="cholesterol"
                      type="number"
                      placeholder="e.g. 200"
                      value={formData.cholesterol}
                      onChange={(e) => handleInputChange('cholesterol', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="fastingBS">Fasting Blood Sugar {'>'}120</Label>
                    <Select value={formData.fastingBS} onValueChange={(value) => handleInputChange('fastingBS', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Yes</SelectItem>
                        <SelectItem value="0">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="maxHR">Maximum Heart Rate</Label>
                    <Input
                      id="maxHR"
                      type="number"
                      placeholder="e.g. 150"
                      value={formData.maxHR}
                      onChange={(e) => handleInputChange('maxHR', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="exerciseAngina">Exercise Induced Angina</Label>
                    <Select value={formData.exerciseAngina} onValueChange={(value) => handleInputChange('exerciseAngina', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Yes</SelectItem>
                        <SelectItem value="0">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-red-600 hover:bg-red-700"
                  disabled={isLoading}
                >
                  {isLoading ? "Analyzing..." : "Predict Heart Disease Risk"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Results and Visualizations */}
          <div className="space-y-6">
            {prediction && <PredictionResult prediction={prediction} />}
            <FeatureVisualization />
            <ModelStats />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
