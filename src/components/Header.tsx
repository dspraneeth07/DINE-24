
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Sun, Moon, Phone, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  const isAdminLoggedIn = localStorage.getItem("adminAuth") === "true";

  const handleReserveTable = () => {
    navigate("/reserve-table");
  };

  return (
    <header className="bg-background border-b border-royal-gold/20 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-playfair text-3xl font-bold text-royal-gold tracking-wider">
              DINE24
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/about" className="text-muted-foreground hover:text-royal-gold transition-colors">
              About Restaurant
            </Link>
            <Link to="/services" className="text-muted-foreground hover:text-royal-gold transition-colors">
              Our Services
            </Link>
            <Link to="/menu" className="text-muted-foreground hover:text-royal-gold transition-colors">
              Our Dishes
            </Link>
            <Link to="/contact" className="text-muted-foreground hover:text-royal-gold transition-colors">
              Contact Us
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="hover:bg-royal-gold/10"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>

            {/* Reserve Table Button */}
            <Button 
              onClick={handleReserveTable}
              className="btn-royal hidden md:inline-flex"
            >
              Reserve Table
            </Button>

            {/* Contact/Admin Button - Changed to contact icon */}
            {!isAdminLoggedIn ? (
              <Link to="/contact">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="hover:bg-royal-gold/10 hidden md:inline-flex"
                  title="Contact Us"
                >
                  <Phone className="h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <Link to="/admin/dashboard">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="hover:bg-royal-gold/10 hidden md:inline-flex"
                  title="Admin Dashboard"
                >
                  <Settings className="h-5 w-5" />
                </Button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link
              to="/about"
              className="block py-2 text-muted-foreground hover:text-royal-gold transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About Restaurant
            </Link>
            <Link
              to="/services"
              className="block py-2 text-muted-foreground hover:text-royal-gold transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Our Services
            </Link>
            <Link
              to="/menu"
              className="block py-2 text-muted-foreground hover:text-royal-gold transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Our Dishes
            </Link>
            <Link
              to="/contact"
              className="block py-2 text-muted-foreground hover:text-royal-gold transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact Us
            </Link>
            <div className="pt-4 space-y-2">
              <Button 
                onClick={() => {
                  handleReserveTable();
                  setIsMenuOpen(false);
                }}
                className="btn-royal w-full"
              >
                Reserve Table
              </Button>
              {!isAdminLoggedIn ? (
                <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    <Phone className="h-4 w-4 mr-2" />
                    Contact Us
                  </Button>
                </Link>
              ) : (
                <Link to="/admin/dashboard" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    <Settings className="h-4 w-4 mr-2" />
                    Admin Dashboard
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
