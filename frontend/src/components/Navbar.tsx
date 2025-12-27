import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Droplets, LogOut, Menu, X, BarChart3, Home } from "lucide-react";
import { useState } from "react";

/**
 * Navbar component - displays navigation links and auth status
 * Responsive design with mobile hamburger menu
 */
const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-hero">
              <Droplets className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="hidden text-lg font-bold text-foreground sm:block">
              AquaSens
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-6 md:flex">
            {isAuthenticated && (
              <>
                <Link
                  to="/"
                  className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                    isActive("/")
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Home className="h-4 w-4" />
                  Home
                </Link>
                <Link
                  to="/predict"
                  className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                    isActive("/predict")
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <BarChart3 className="h-4 w-4" />
                  Predictions
                </Link>
              </>
            )}
          </div>

          {/* Desktop Auth Actions */}
          <div className="hidden items-center gap-4 md:flex">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-muted-foreground">
                  Welcome,{" "}
                  <span className="font-medium text-foreground">
                    {user?.name}
                  </span>
                </span>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm">Get Started</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5 text-foreground" />
            ) : (
              <Menu className="h-5 w-5 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="border-t border-border py-4 md:hidden animate-fade-in">
            <div className="flex flex-col gap-2">
              {isAuthenticated ? (
                <>
                  <span className="px-3 py-2 text-sm text-muted-foreground">
                    Welcome,{" "}
                    <span className="font-medium text-foreground">
                      {user?.name}
                    </span>
                  </span>
                  <Link
                    to="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      isActive("/")
                        ? "bg-secondary text-primary"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <Home className="h-4 w-4" />
                    Home
                  </Link>
                  <Link
                    to="/predict"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      isActive("/predict")
                        ? "bg-secondary text-primary"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <BarChart3 className="h-4 w-4" />
                    Predictions
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="rounded-lg bg-primary px-3 py-2 text-center text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
