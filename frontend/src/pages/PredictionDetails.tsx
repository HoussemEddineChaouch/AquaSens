import {
  useLocation,
  useNavigate,
  Navigate,
  useParams,
} from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Droplets,
  AlertTriangle,
  TreeDeciduous,
  CheckCircle2,
  Clock,
  MapPin,
  Thermometer,
  CloudRain,
  Sun,
  Wind,
  Layers,
  Leaf,
  Calendar,
  Beaker,
  History,
} from "lucide-react";
import { getPredictionById } from "@/lib/api";
import type { PredictionResult } from "@/lib/types";
import { useEffect, useState } from "react";

const parseCondition = (condition: string) => {
  const match = condition.match(/(<=|>=|<|>)/);
  if (!match) return { direction: "", threshold: 0 };
  const direction = match[0];
  const threshold = parseFloat(condition.split(direction)[1]);
  return { direction, threshold };
};

const normalizeInput = (input: any) => ({
  soil_type: input.Soil_Type,
  soil_ph: input.Soil_pH,
  soil_moisture: input.Soil_Moisture,
  organic_carbon: input.Organic_Carbon,
  temperature: input.Temperature_C,
  humidity: input.Humidity,
  rainfall: input.Rainfall_mm,
  sunlight_hours: input.Sunlight_Hours,
  wind_speed: input.Wind_Speed_kmh,
  crop_type: input.Crop_Type,
  crop_growth_stage: input.Crop_Growth_Stage,
  season: input.Season,
  mulching_used: input.Mulching_Used === "Yes",
  previous_irrigation: input.Previous_Irrigation_mm,
  region: input.Region,
});

const normalizePrediction = (data: any) => ({
  ...data,

  irrigationLevel: data.result,
  timestamp: data.createdAt,

  actionRequired: data.recommendation?.action ?? "No action",
  recommendations: data.recommendation?.advice ?? [],

  decisionPath: data.decisionPath ?? [],
});

/**
 * PredictionDetails page - displays detailed prediction results
 * Including decision path and agronomist recommendations
 */
const PredictionDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch prediction by ID from API
  useEffect(() => {
    if (!id) return;

    const fetchPrediction = async () => {
      setLoading(true);
      setError(null);
      try {
        const raw = await getPredictionById(id);
        const normalized = normalizePrediction(raw);
        normalized.input = normalizeInput(raw.input);
        setPrediction(normalized);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load prediction"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPrediction();
  }, [id]);
  // Loading state
  if (loading) {
    return <p className="text-center py-20">Loading prediction...</p>;
  }

  // Error or missing prediction
  if (error || !prediction) {
    return <Navigate to="/predict" replace />;
  }

  // Helper: get irrigation badge
  const getIrrigationBadge = (level: string) => {
    switch (level) {
      case "High":
        return (
          <Badge className="bg-accent/20 text-accent hover:bg-accent/30 text-xl px-6 py-3 font-bold">
            <Droplets className="mr-2 h-5 w-5" />
            HIGH IRRIGATION
          </Badge>
        );
      case "Medium":
        return (
          <Badge className="bg-warning/20 text-warning hover:bg-warning/30 text-xl px-6 py-3 font-bold">
            <Droplets className="mr-2 h-5 w-5" />
            MEDIUM IRRIGATION
          </Badge>
        );
      default:
        return (
          <Badge className="bg-success/20 text-success hover:bg-success/30 text-xl px-6 py-3 font-bold">
            <Droplets className="mr-2 h-5 w-5" />
            LOW IRRIGATION
          </Badge>
        );
    }
  };

  // Helper: format timestamp
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const inputData = prediction.input;
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-muted/30 to-background py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Back Button */}
        <Button
          variant="outline"
          onClick={() => navigate("/predict")}
          className="mb-6 gap-2 shadow-sm hover:shadow-md transition-shadow"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Predictions
        </Button>

        {/* Main Result Card - Hero Style */}
        <Card className="shadow-sm mb-8  overflow-hidden">
          <div
            className={`h-2 w-full ${
              prediction.irrigationLevel === "High"
                ? "bg-accent"
                : prediction.irrigationLevel === "Medium"
                ? "bg-warning"
                : "bg-success"
            }`}
          />
          <CardHeader className="text-center pb-4 pt-8">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-4">
              <Clock className="h-4 w-4" />
              {formatDate(prediction.timestamp)}
            </div>
            <CardTitle className="text-3xl font-bold mb-4">
              Irrigation Recommendation
            </CardTitle>
            {/* Irrigation Level Badge */}
            <div className="flex justify-center">
              {getIrrigationBadge(prediction.irrigationLevel)}
            </div>
          </CardHeader>
          <CardContent className="text-center pb-8">
            {/* Action Required Alert */}
            <div
              className={`rounded-xl p-6 max-w-2xl mx-auto ${
                prediction.irrigationLevel === "High"
                  ? "bg-accent/10 border-2 border-accent/40"
                  : prediction.irrigationLevel === "Medium"
                  ? "bg-warning/10 border-2 border-warning/40"
                  : "bg-success/10 border-2 border-success/40"
              }`}
            >
              <div className="flex items-center justify-center gap-3 mb-3">
                <AlertTriangle
                  className={`h-6 w-6 ${
                    prediction.irrigationLevel === "High"
                      ? "text-accent"
                      : prediction.irrigationLevel === "Medium"
                      ? "text-warning"
                      : "text-success"
                  }`}
                />
                <span className="font-bold text-xl">ACTION REQUIRED</span>
              </div>
              <p className="text-foreground font-semibold text-lg">
                {prediction.actionRequired}
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Decision Path Card */}
          <Card className="shadow-sm hover:shadow-lg transition-shadow">
            <CardHeader className="bg-primary/5 rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-xl">
                <TreeDeciduous className="h-5 w-5 text-primary" />
                Decision Path
              </CardTitle>
              <CardDescription>
                How the model made this recommendation
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-6">
              <div className="space-y-3">
                {prediction.decisionPath.map((step, index) => {
                  const { direction, threshold } = parseCondition(
                    step.condition
                  );

                  return (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-muted/80 to-muted/40 border border-border/50 hover:border-primary/30 transition-colors"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shadow-sm">
                        {index + 1}
                      </div>

                      <div className="flex-1 text-sm">
                        <span className="font-semibold text-foreground">
                          {step.feature.replace(/_/g, " ")}
                        </span>

                        <span className="text-muted-foreground mx-1">is</span>

                        <span className="font-mono text-primary font-bold">
                          {step.value.toFixed(2)}
                        </span>

                        <span className="text-muted-foreground mx-1">
                          which is
                        </span>

                        <Badge variant="outline" className="text-xs">
                          {direction} {threshold.toFixed(2)}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Agronomist Recommendations Card */}
          <Card className="shadow-sm hover:shadow-lg transition-shadow">
            <CardHeader className="bg-success/5 rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-xl">
                <CheckCircle2 className="h-5 w-5 text-success" />
                Agronomist Recommendations
              </CardTitle>
              <CardDescription>
                Expert advice based on your conditions
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-3">
                {prediction.recommendations.map((rec, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 rounded-lg bg-gradient-to-r from-success/10 to-success/5 border border-success/20 hover:border-success/40 transition-colors"
                  >
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-success text-white flex items-center justify-center text-xs font-bold shadow-sm">
                      {index + 1}
                    </div>
                    <p className="text-foreground font-medium leading-relaxed">
                      {rec}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Input Data Summary - Full Width */}
        <Card className="shadow-sm mt-6 hover:shadow-lg transition-shadow">
          <CardHeader className="bg-muted/50 rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Layers className="h-5 w-5 text-primary" />
              Input Data Summary
            </CardTitle>
            <CardDescription>
              Complete parameters used for this prediction
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {/* Soil Parameters */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3 flex items-center gap-2">
                <Beaker className="h-4 w-4" />
                Soil Parameters
              </h4>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Layers className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">
                      Soil Type
                    </p>
                    <p className="font-bold text-foreground capitalize">
                      {inputData.soil_type || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Beaker className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">
                      Soil pH
                    </p>
                    <p className="font-bold text-foreground">
                      {inputData.soil_ph || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Droplets className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">
                      Soil Moisture
                    </p>
                    <p className="font-bold text-foreground">
                      {inputData.soil_moisture}%
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Leaf className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">
                      Organic Carbon
                    </p>
                    <p className="font-bold text-foreground">
                      {inputData.organic_carbon || "N/A"}%
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Weather Parameters */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3 flex items-center gap-2">
                <CloudRain className="h-4 w-4" />
                Weather Conditions
              </h4>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <Thermometer className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">
                      Temperature
                    </p>
                    <p className="font-bold text-foreground">
                      {inputData.temperature}°C
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <Droplets className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">
                      Humidity
                    </p>
                    <p className="font-bold text-foreground">
                      {inputData.humidity || "N/A"}%
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <CloudRain className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">
                      Rainfall
                    </p>
                    <p className="font-bold text-foreground">
                      {inputData.rainfall} mm
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <Sun className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">
                      Sunlight Hours
                    </p>
                    <p className="font-bold text-foreground">
                      {inputData.sunlight_hours || "N/A"} hrs
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <Wind className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">
                      Wind Speed
                    </p>
                    <p className="font-bold text-foreground">
                      {inputData.wind_speed || "N/A"} km/h
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Crop & Location Parameters */}
            <div>
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3 flex items-center gap-2">
                <TreeDeciduous className="h-4 w-4" />
                Crop & Location
              </h4>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-success/10 to-success/5 border border-success/20">
                  <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                    <TreeDeciduous className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">
                      Crop Type
                    </p>
                    <p className="font-bold text-foreground capitalize">
                      {inputData.crop_type}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-success/10 to-success/5 border border-success/20">
                  <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                    <Leaf className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">
                      Growth Stage
                    </p>
                    <p className="font-bold text-foreground capitalize">
                      {inputData.crop_growth_stage || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-success/10 to-success/5 border border-success/20">
                  <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">
                      Region
                    </p>
                    <p className="font-bold text-foreground capitalize">
                      {inputData.region}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-success/10 to-success/5 border border-success/20">
                  <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">
                      Season
                    </p>
                    <p className="font-bold text-foreground capitalize">
                      {inputData.season || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-success/10 to-success/5 border border-success/20">
                  <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                    <History className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">
                      Prev. Irrigation
                    </p>
                    <p className="font-bold text-foreground">
                      {inputData.previous_irrigation || "N/A"} mm
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mulching Info */}
            {inputData.mulching_used !== undefined && (
              <>
                <Separator className="my-6" />
                <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-warning/10 to-warning/5 border border-warning/20 max-w-xs">
                  <div className="w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center">
                    <Layers className="h-5 w-5 text-warning" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">
                      Mulching Used
                    </p>
                    <p className="font-bold text-foreground">
                      {inputData.mulching_used ? "Yes" : "No"}
                    </p>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PredictionDetails;
