import axios from "axios";
import {
  PredictionHistoryItem,
  PredictionInput,
  PredictionResult,
} from "./types"; // adjust path

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("irrigation_auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("irrigation_auth_token");
      localStorage.removeItem("irrigation_user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

/**
 * Send prediction request to backend
 */
export const makePrediction = async (
  data: PredictionInput
): Promise<PredictionResult> => {
  const payload = {
    Soil_Type: data.soil_type,
    Soil_pH: data.soil_ph,
    Soil_Moisture: data.soil_moisture,
    Organic_Carbon: data.organic_carbon,
    Temperature_C: data.temperature,
    Humidity: data.humidity,
    Rainfall_mm: data.rainfall,
    Sunlight_Hours: data.sunlight_hours,
    Wind_Speed_kmh: data.wind_speed,
    Crop_Type: data.crop_type,
    Crop_Growth_Stage: data.crop_growth_stage,
    Season: data.season,
    Mulching_Used: data.mulching_used ? "Yes" : "No",
    Previous_Irrigation_mm: data.previous_irrigation,
    Region: data.region,
  };

  try {
    const response = await api.post("/api/predictions", payload);
    return response.data as PredictionResult;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.error || "Failed to get prediction"
      );
    }
    throw error;
  }
};

export const getPredictionById = async (
  id: string
): Promise<PredictionResult> => {
  const response = await api.get(`/api/history/${id}`);
  return response.data as PredictionResult;
};

export const getPredictionHistory = async (): Promise<
  PredictionHistoryItem[]
> => {
  const res = await api.get("/api/history");
  return res.data;
};

export default api;
