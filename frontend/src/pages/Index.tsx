import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Droplets,
  Leaf,
  BarChart3,
  Cloud,
  Sun,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

/**
 * Index page - landing page with hero section and feature highlights
 * Shows different content based on authentication status
 */
const Index = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: Leaf,
      title: "Crop-Specific Analysis",
      description:
        "Tailored predictions based on crop type, growth stage, and specific water requirements.",
    },
    {
      icon: Cloud,
      title: "Weather Integration",
      description:
        "Real-time weather data integration for accurate environmental assessments.",
    },
    {
      icon: BarChart3,
      title: "ML-Powered Predictions",
      description:
        "Advanced machine learning models trained on agricultural data for precise irrigation needs.",
    },
    {
      icon: Sun,
      title: "Regional Optimization",
      description:
        "Climate-aware recommendations optimized for your specific region and season.",
    },
  ];

  const benefits = [
    "Reduce water waste by up to 30%",
    "Increase crop yield with optimal irrigation",
    "Save time with automated recommendations",
    "Make data-driven farming decisions",
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 py-16 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground animate-fade-in">
              <Droplets className="h-4 w-4 text-primary" />
              Smart Irrigation for Modern Agriculture
            </div>

            {/* Heading */}
            <h1
              className="mb-6 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              Predict Your Irrigation
              <span className="block text-primary">Needs with AI</span>
            </h1>

            {/* Description */}
            <p
              className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              AquaSens uses advanced machine learning to analyze soil
              conditions, weather patterns, and crop requirements to give you
              precise irrigation recommendations.
            </p>

            {/* CTA Buttons */}
            <div
              className="flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              {isAuthenticated ? (
                <Link to="/predict">
                  <Button size="lg" className="gap-2">
                    Start Predicting
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/signup">
                    <Button size="lg" className="gap-2">
                      Get Started Free
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="outline" size="lg">
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-border bg-muted/30 py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground">
              Intelligent Irrigation Management
            </h2>
            <p className="text-muted-foreground">
              Our system analyzes multiple factors to provide accurate
              irrigation recommendations tailored to your specific farming
              conditions.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card
                key={feature.title}
                className="group border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-soft animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="pt-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-foreground">
                Why Choose AquaSens?
              </h2>
              <p className="mb-8 text-muted-foreground">
                Our AI-powered irrigation prediction system helps farmers make
                smarter decisions, conserve water, and maximize crop yields
                while reducing operational costs.
              </p>

              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 animate-slide-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-success/20">
                      <CheckCircle className="h-4 w-4 text-success" />
                    </div>
                    <span className="text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>

              {!isAuthenticated && (
                <div className="mt-8">
                  <Link to="/signup">
                    <Button className="gap-2">
                      Create Free Account
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            <div className="relative">
              {/* Stats cards */}
              <div className="grid gap-4 sm:grid-cols-2">
                <Card className="bg-primary text-primary-foreground animate-fade-in">
                  <CardContent className="pt-6">
                    <p className="text-4xl font-bold">30%</p>
                    <p className="text-primary-foreground/80">Water savings</p>
                  </CardContent>
                </Card>
                <Card
                  className="bg-accent text-accent-foreground animate-fade-in"
                  style={{ animationDelay: "0.1s" }}
                >
                  <CardContent className="pt-6">
                    <p className="text-4xl font-bold">99%</p>
                    <p className="text-accent-foreground/80">
                      Prediction accuracy
                    </p>
                  </CardContent>
                </Card>
                <Card
                  className="border-primary/20 animate-fade-in"
                  style={{ animationDelay: "0.2s" }}
                >
                  <CardContent className="pt-6">
                    <p className="text-4xl font-bold text-primary">10K+</p>
                    <p className="text-muted-foreground">Fields analyzed</p>
                  </CardContent>
                </Card>
                <Card
                  className="border-accent/20 animate-fade-in"
                  style={{ animationDelay: "0.3s" }}
                >
                  <CardContent className="pt-6">
                    <p className="text-4xl font-bold text-accent">24/7</p>
                    <p className="text-muted-foreground">System availability</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-hero">
                <Droplets className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">AquaSens</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} AquaSens. Smart irrigation for
              sustainable agriculture.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
