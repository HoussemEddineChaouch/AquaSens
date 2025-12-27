import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { History, TrendingUp, TrendingDown, Minus, Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { getPredictionHistory } from "@/lib/api";
import { PredictionHistoryItem } from "@/lib/types";
/**
 * PredictionHistory component - displays past prediction results in a table
 * Uses api get history data to display
 */
const PredictionHistory = () => {
  const navigate = useNavigate();

  const [history, setHistory] = useState<PredictionHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Get irrigation level badge variant
  const getIrrigationBadge = (level: string) => {
    switch (level) {
      case "High":
        return (
          <Badge className="bg-accent/20 text-accent hover:bg-accent/30 transition-colors">
            <TrendingUp className="mr-1 h-3 w-3" />
            High
          </Badge>
        );

      case "Medium":
        return (
          <Badge className="bg-warning/20 text-warning hover:bg-warning/30 transition-colors">
            <Minus className="mr-1 h-3 w-3" />
            Medium
          </Badge>
        );

      default:
        return (
          <Badge className="bg-success/20 text-success hover:bg-success/30 transition-colors">
            <TrendingDown className="mr-1 h-3 w-3" />
            Low
          </Badge>
        );
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getPredictionHistory();
        setHistory(data);
        console.log("history api", data);
      } catch (err) {
        console.error("Failed to load history", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <History className="h-5 w-5 text-primary" />
          Prediction History
        </CardTitle>
        <CardDescription>
          Your recent irrigation prediction results
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Crop</TableHead>
                <TableHead>Soil</TableHead>
                <TableHead>Irrigation Need</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((item) => (
                <TableRow key={item.id} className="animate-fade-in">
                  <TableCell className="font-medium">
                    {formatDate(item.date)}
                  </TableCell>
                  <TableCell>{item.crop}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {item.soil}
                  </TableCell>
                  <TableCell>{getIrrigationBadge(item.result)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/prediction/${item.id}`)}
                      className="gap-2"
                    >
                      <Eye className="h-3 w-3" />
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Empty state - shown when no history exists */}
        {history.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <History className="h-12 w-12 text-muted-foreground/50" />
            <p className="mt-4 text-muted-foreground">
              No prediction history yet
            </p>
            <p className="text-sm text-muted-foreground/70">
              Your predictions will appear here after you make them
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
export default PredictionHistory;
