import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PredictionForm from '@/components/PredictionForm';
import PredictionHistory from '@/components/PredictionHistory';
import { Droplets, History } from 'lucide-react';

/**
 * Predict page - main prediction interface with form and history tabs
 * Protected route - requires authentication
 */
const Predict = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-muted/20 py-8">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Irrigation Predictions</h1>
          <p className="mt-2 text-muted-foreground">
            Enter your field data to get AI-powered irrigation recommendations
          </p>
        </div>

        {/* Tabs for Form and History */}
        <Tabs defaultValue="predict" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="predict" className="gap-2">
              <Droplets className="h-4 w-4" />
              New Prediction
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              <History className="h-4 w-4" />
              History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="predict" className="animate-fade-in">
            <PredictionForm />
          </TabsContent>

          <TabsContent value="history" className="animate-fade-in">
            <PredictionHistory />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Predict;
