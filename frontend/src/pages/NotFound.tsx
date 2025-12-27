import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Droplets } from "lucide-react";

/**
 * 404 Not Found page
 * Displays when user navigates to a non-existent route
 */
const NotFound = () => {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
      <div className="text-center animate-fade-in">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
          <Droplets className="h-10 w-10 text-muted-foreground" />
        </div>
        
        {/* Error Code */}
        <h1 className="mb-2 text-6xl font-bold text-foreground">404</h1>
        
        {/* Message */}
        <h2 className="mb-4 text-xl font-semibold text-foreground">Page Not Found</h2>
        <p className="mb-8 max-w-md text-muted-foreground">
          The page you're looking for doesn't exist or has been moved. 
          Let's get you back on track.
        </p>
        
        {/* Navigation Button */}
        <Link to="/">
          <Button className="gap-2">
            <Home className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
