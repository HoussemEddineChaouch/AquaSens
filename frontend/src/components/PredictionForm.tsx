import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  Droplets,
  Thermometer,
  Cloud,
  Sun,
  Wind,
  Leaf,
  MapPin,
  AlertCircle,
  AlertTriangle,
  Eye,
} from "lucide-react";
import { makePrediction } from "@/lib/api";
import type { PredictionInput, PredictionResult } from "@/lib/types";
import {
  SOIL_TYPES,
  CROP_TYPES,
  GROWTH_STAGES,
  SEASONS,
  REGIONS,
} from "@/lib/constants";
import { z } from "zod";

// Validation schema for prediction form
const predictionSchema = z.object({
  soil_type: z.string().min(1, "Please select a soil type"),
  soil_ph: z.number().min(0).max(14, "pH must be between 0 and 14"),
  soil_moisture: z
    .number()
    .min(0)
    .max(100, "Moisture must be between 0 and 100%"),
  organic_carbon: z
    .number()
    .min(0)
    .max(10, "Organic carbon must be between 0 and 10%"),
  temperature: z
    .number()
    .min(-50)
    .max(60, "Temperature must be between -50 and 60°C"),
  humidity: z.number().min(0).max(100, "Humidity must be between 0 and 100%"),
  rainfall: z.number().min(0).max(500, "Rainfall must be between 0 and 500mm"),
  sunlight_hours: z
    .number()
    .min(0)
    .max(24, "Sunlight hours must be between 0 and 24"),
  wind_speed: z
    .number()
    .min(0)
    .max(200, "Wind speed must be between 0 and 200 km/h"),
  mulching_used: z.boolean(),
  previous_irrigation: z
    .number()
    .min(0, "Previous irrigation must be 0 or more"),
  crop_type: z.string().min(1, "Please select a crop type"),
  crop_growth_stage: z.string().min(1, "Please select a growth stage"),
  season: z.string().min(1, "Please select a season"),
  region: z.string().min(1, "Please select a region"),
});

// Initial form state
const initialFormData = {
  soil_type: "",
  soil_ph: 7,
  soil_moisture: 40,
  organic_carbon: 2,
  temperature: 25,
  humidity: 60,
  rainfall: 10,
  sunlight_hours: 8,
  wind_speed: 10,
  mulching_used: false,
  previous_irrigation: 0,
  crop_type: "",
  crop_growth_stage: "",
  season: "",
  region: "",
};

/**
 * PredictionForm component - main form for collecting irrigation prediction inputs
 */
const PredictionForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<PredictionInput>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  // Navigate to details page
  const handleViewDetails = () => {
    if (result) {
      navigate(`/prediction/${result.id}`, { state: { prediction: result } });
    }
  };

  // Get irrigation level badge
  const getIrrigationBadge = (level: string) => {
    switch (level) {
      case "High":
        return (
          <Badge className="bg-accent/20 text-accent hover:bg-accent/30 text-sm">
            <Droplets className="mr-1 h-3 w-3" />
            HIGH
          </Badge>
        );
      case "Medium":
        return (
          <Badge className="bg-warning/20 text-warning hover:bg-warning/30 text-sm">
            <Droplets className="mr-1 h-3 w-3" />
            MEDIUM
          </Badge>
        );
      default:
        return (
          <Badge className="bg-success/20 text-success hover:bg-success/30 text-sm">
            <Droplets className="mr-1 h-3 w-3" />
            LOW
          </Badge>
        );
    }
  };

  // Handle number input changes
  const handleNumberChange = (field: keyof PredictionInput, value: string) => {
    const numValue = parseFloat(value) || 0;
    setFormData((prev) => ({ ...prev, [field]: numValue }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // Handle select changes
  const handleSelectChange = (field: keyof PredictionInput, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setApiError(null);
    setResult(null);

    // Validate form
    const validationResult = predictionSchema.safeParse(formData);
    if (!validationResult.success) {
      const fieldErrors: Record<string, string> = {};
      validationResult.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);
    try {
      const prediction = await makePrediction(formData);
      setResult(prediction);
    } catch (error) {
      setApiError(
        error instanceof Error ? error.message : "Failed to get prediction"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Reset form
  const handleReset = () => {
    setFormData(initialFormData);
    setErrors({});
    setResult(null);
    setApiError(null);
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Leaf className="h-5 w-5 text-primary" />
            Irrigation Prediction
          </CardTitle>
          <CardDescription>
            Enter your field and environmental data to get irrigation
            recommendations
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Soil Parameters Section */}
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                <Droplets className="h-4 w-4" />
                Soil Parameters
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <Label htmlFor="soil_type">Soil Type</Label>
                  <Select
                    value={formData.soil_type}
                    onValueChange={(v) => handleSelectChange("soil_type", v)}
                  >
                    <SelectTrigger
                      className={errors.soil_type ? "border-destructive" : ""}
                    >
                      <SelectValue placeholder="Select soil type" />
                    </SelectTrigger>
                    <SelectContent>
                      {SOIL_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.soil_type && (
                    <p className="text-xs text-destructive">
                      {errors.soil_type}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="soil_ph">Soil pH</Label>
                  <Input
                    id="soil_ph"
                    type="number"
                    step="0.1"
                    min="0"
                    max="14"
                    value={formData.soil_ph}
                    onChange={(e) =>
                      handleNumberChange("soil_ph", e.target.value)
                    }
                    className={errors.soil_ph ? "border-destructive" : ""}
                  />
                  {errors.soil_ph && (
                    <p className="text-xs text-destructive">{errors.soil_ph}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="soil_moisture">Soil Moisture (%)</Label>
                  <Input
                    id="soil_moisture"
                    type="number"
                    step="1"
                    min="0"
                    max="100"
                    value={formData.soil_moisture}
                    onChange={(e) =>
                      handleNumberChange("soil_moisture", e.target.value)
                    }
                    className={errors.soil_moisture ? "border-destructive" : ""}
                  />
                  {errors.soil_moisture && (
                    <p className="text-xs text-destructive">
                      {errors.soil_moisture}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="organic_carbon">Organic Carbon (%)</Label>
                  <Input
                    id="organic_carbon"
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    value={formData.organic_carbon}
                    onChange={(e) =>
                      handleNumberChange("organic_carbon", e.target.value)
                    }
                    className={
                      errors.organic_carbon ? "border-destructive" : ""
                    }
                  />
                  {errors.organic_carbon && (
                    <p className="text-xs text-destructive">
                      {errors.organic_carbon}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Weather Parameters Section */}
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                <Thermometer className="h-4 w-4" />
                Weather Conditions
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                <div className="space-y-2">
                  <Label htmlFor="temperature">Temperature (°C)</Label>
                  <Input
                    id="temperature"
                    type="number"
                    step="0.5"
                    value={formData.temperature}
                    onChange={(e) =>
                      handleNumberChange("temperature", e.target.value)
                    }
                    className={errors.temperature ? "border-destructive" : ""}
                  />
                  {errors.temperature && (
                    <p className="text-xs text-destructive">
                      {errors.temperature}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="humidity">Humidity (%)</Label>
                  <Input
                    id="humidity"
                    type="number"
                    step="1"
                    min="0"
                    max="100"
                    value={formData.humidity}
                    onChange={(e) =>
                      handleNumberChange("humidity", e.target.value)
                    }
                    className={errors.humidity ? "border-destructive" : ""}
                  />
                  {errors.humidity && (
                    <p className="text-xs text-destructive">
                      {errors.humidity}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rainfall">Rainfall (mm)</Label>
                  <Input
                    id="rainfall"
                    type="number"
                    step="1"
                    min="0"
                    value={formData.rainfall}
                    onChange={(e) =>
                      handleNumberChange("rainfall", e.target.value)
                    }
                    className={errors.rainfall ? "border-destructive" : ""}
                  />
                  {errors.rainfall && (
                    <p className="text-xs text-destructive">
                      {errors.rainfall}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sunlight_hours">Sunlight (hours)</Label>
                  <Input
                    id="sunlight_hours"
                    type="number"
                    step="0.5"
                    min="0"
                    max="24"
                    value={formData.sunlight_hours}
                    onChange={(e) =>
                      handleNumberChange("sunlight_hours", e.target.value)
                    }
                    className={
                      errors.sunlight_hours ? "border-destructive" : ""
                    }
                  />
                  {errors.sunlight_hours && (
                    <p className="text-xs text-destructive">
                      {errors.sunlight_hours}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="wind_speed">Wind Speed (km/h)</Label>
                  <Input
                    id="wind_speed"
                    type="number"
                    step="1"
                    min="0"
                    value={formData.wind_speed}
                    onChange={(e) =>
                      handleNumberChange("wind_speed", e.target.value)
                    }
                    className={errors.wind_speed ? "border-destructive" : ""}
                  />
                  {errors.wind_speed && (
                    <p className="text-xs text-destructive">
                      {errors.wind_speed}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Crop & Location Section */}
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                <MapPin className="h-4 w-4" />
                Crop & Location
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <Label htmlFor="crop_type">Crop Type</Label>
                  <Select
                    value={formData.crop_type}
                    onValueChange={(v) => handleSelectChange("crop_type", v)}
                  >
                    <SelectTrigger
                      className={errors.crop_type ? "border-destructive" : ""}
                    >
                      <SelectValue placeholder="Select crop" />
                    </SelectTrigger>
                    <SelectContent>
                      {CROP_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.crop_type && (
                    <p className="text-xs text-destructive">
                      {errors.crop_type}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="crop_growth_stage">Growth Stage</Label>
                  <Select
                    value={formData.crop_growth_stage}
                    onValueChange={(v) =>
                      handleSelectChange("crop_growth_stage", v)
                    }
                  >
                    <SelectTrigger
                      className={
                        errors.crop_growth_stage ? "border-destructive" : ""
                      }
                    >
                      <SelectValue placeholder="Select stage" />
                    </SelectTrigger>
                    <SelectContent>
                      {GROWTH_STAGES.map((stage) => (
                        <SelectItem key={stage.value} value={stage.value}>
                          {stage.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.crop_growth_stage && (
                    <p className="text-xs text-destructive">
                      {errors.crop_growth_stage}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="season">Season</Label>
                  <Select
                    value={formData.season}
                    onValueChange={(v) => handleSelectChange("season", v)}
                  >
                    <SelectTrigger
                      className={errors.season ? "border-destructive" : ""}
                    >
                      <SelectValue placeholder="Select season" />
                    </SelectTrigger>
                    <SelectContent>
                      {SEASONS.map((season) => (
                        <SelectItem key={season.value} value={season.value}>
                          {season.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.season && (
                    <p className="text-xs text-destructive">{errors.season}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="region">Region / Climate</Label>
                  <Select
                    value={formData.region}
                    onValueChange={(v) => handleSelectChange("region", v)}
                  >
                    <SelectTrigger
                      className={errors.region ? "border-destructive" : ""}
                    >
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      {REGIONS.map((region) => (
                        <SelectItem key={region.value} value={region.value}>
                          {region.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.region && (
                    <p className="text-xs text-destructive">{errors.region}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Parameters */}
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                <Sun className="h-4 w-4" />
                Additional Parameters
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="previous_irrigation">
                    Previous Irrigation (mm)
                  </Label>
                  <Input
                    id="previous_irrigation"
                    type="number"
                    step="1"
                    min="0"
                    value={formData.previous_irrigation}
                    onChange={(e) =>
                      handleNumberChange("previous_irrigation", e.target.value)
                    }
                    className={
                      errors.previous_irrigation ? "border-destructive" : ""
                    }
                  />
                  {errors.previous_irrigation && (
                    <p className="text-xs text-destructive">
                      {errors.previous_irrigation}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div className="space-y-0.5">
                    <Label htmlFor="mulching_used" className="text-base">
                      Mulching Used
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Is mulching applied to the field?
                    </p>
                  </div>
                  <Switch
                    id="mulching_used"
                    checked={formData.mulching_used}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({
                        ...prev,
                        mulching_used: checked,
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
                disabled={isLoading}
              >
                Reset Form
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Droplets className="mr-2 h-4 w-4" />
                    Get Prediction
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Result Display */}
      {(result || apiError) && (
        <Card
          className={`animate-fade-in ${
            result
              ? result.result === "High"
                ? "border-accent/50 bg-accent/5"
                : result.result === "Medium"
                ? "border-warning/50 bg-warning/5"
                : "border-success/50 bg-success/5"
              : "border-destructive/50 bg-destructive/5"
          }`}
        >
          <CardContent className="pt-6">
            {result ? (
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${
                      result.result === "High"
                        ? "bg-accent/20"
                        : result.result === "Medium"
                        ? "bg-warning/20"
                        : "bg-success/20"
                    }`}
                  >
                    <AlertTriangle
                      className={`h-6 w-6 ${
                        result.result === "High"
                          ? "text-accent"
                          : result.result === "Medium"
                          ? "text-warning"
                          : "text-success"
                      }`}
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-foreground">
                        Irrigation Recommendation:
                      </h3>
                      {getIrrigationBadge(result.result)}
                    </div>
                    <div
                      className={`rounded-lg p-3 ${
                        result.result === "High"
                          ? "bg-accent/10 border border-accent/30"
                          : result.result === "Medium"
                          ? "bg-warning/10 border border-warning/30"
                          : "bg-success/10 border border-success/30"
                      }`}
                    >
                      <p className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-1">
                        Action Required:
                      </p>
                      <p className="font-medium text-foreground">
                        {result.recommendation.action}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button
                    onClick={() => navigate(`/prediction/${result._id}`)}
                    className="gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    View Details
                  </Button>
                </div>
              </div>
            ) : (
              apiError && (
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-destructive/20">
                    <AlertCircle className="h-6 w-6 text-destructive" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-foreground">
                      Prediction Failed
                    </h3>
                    <p className="text-destructive">{apiError}</p>
                  </div>
                </div>
              )
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PredictionForm;
