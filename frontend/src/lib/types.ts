// Prediction input type
export interface PredictionInput {
  soil_type: string;
  soil_ph: number;
  soil_moisture: number;
  organic_carbon: number;
  temperature: number;
  humidity: number;
  rainfall: number;
  sunlight_hours: number;
  wind_speed: number;
  mulching_used: boolean;
  previous_irrigation: number;
  crop_type: string;
  crop_growth_stage: string;
  season: string;
  region: string;
}

// Prediction result type
export interface PredictionResult {
  id: string;
  irrigationLevel: "Low" | "Medium" | "High";
  actionRequired: string;
  [key: string]: any; // optional for extra fields
}

export type PredictionHistoryItem = {
  id: string;
  date: string;
  crop: string;
  soil: string;
  result: "High" | "Medium" | "Low";
};
