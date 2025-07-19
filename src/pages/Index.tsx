
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Crown, 
  Star, 
  Clock, 
  Shield, 
  Truck, 
  Users, 
  ChefHat, 
  Heart,
  Quote,
  ArrowRight
} from "lucide-react";

const Index = () => {
  // Mock data for dishes
  const topDishes = [
    {
      id: 1,
      name: "Hyderabadi Biryani",
      price: 280,
      offerPrice: 250,
      image: "https://images.unsplash.com/photo-1563379091339-03246962d735?w=400",
      rating: 4.8,
      description: "Rich in spices and aroma"
    },
    {
      id: 2,
      name: "Paneer Butter Masala",
      price: 160,
      offerPrice: 140,
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400",
      rating: 4.6,
      description: "Creamy, rich North Indian curry"
    },
    {
      id: 3,
      name: "Masala Dosa",
      price: 90,
      offerPrice: 80,
      image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=400",
      rating: 4.7,
      description: "Crisp South Indian delight"
    },
    {
      id: 4,
      name: "Chicken 65",
      price: 180,
      offerPrice: 160,
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400",
      rating: 4.5,
      description: "Spicy starter, deep fried perfection"
    },
    {
      id: 5,
      name: "Rajma Chawal",
      price: 120,
      offerPrice: 100,
      image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400",
      rating: 4.4,
      description: "Punjabi-style comfort food"
    },
    {
      id: 6,
      name: "Gulab Jamun",
      price: 50,
      image: "https://images.unsplash.com/photo-1571197119282-7c4d555d5d8c?w=400",
      rating: 4.9,
      description: "Sweet syrupy dessert"
    }
  ];

  const todaysSpecial = {
    name: "Royal Thali",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600",
    specialReason: "Chef's special combination of traditional flavors",
    price: 350,
    badge: "Hot Item"
  };

  const testimonials = [
    {
      name: "Priya R.",
      comment: "Best dining experience ever! The ambiance and food quality exceeded my expectations.",
      rating: 5
    },
    {
      name: "Aman S.",
      comment: "Authentic taste of India with royal treatment. Highly recommended for family gatherings.",
      rating: 5
    },
    {
      name: "Rahul K.",
      comment: "The biryani here is absolutely divine. The spices and aroma are perfect.",
      rating: 5
    }
  ];

  const whyChooseUs = [
    {
      icon: <Shield className="h-8 w-8 text-royal-gold" />,
      title: "Hygienic Food",
      description: "Prepared with utmost care in clean, sanitized kitchen environment"
    },
    {
      icon: <Heart className="h-8 w-8 text-royal-gold" />,
      title: "Fresh Environment",
      description: "Pleasant ambiance with comfortable seating and royal decor"
    },
    {
      icon: <ChefHat className="h-8 w-8 text-royal-gold" />,
      title: "Skilled Chefs",
      description: "Expert chefs with years of experience in authentic Indian cuisine"
    },
    {
      icon: <Users className="h-8 w-8 text-royal-gold" />,
      title: "Event & Party Friendly",
      description: "Perfect venue for celebrations, corporate events, and family gatherings"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="relative h-[80vh] flex items-center justify-center bg-gradient-to-r from-royal-black via-royal-gray-dark to-royal-black">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200')] bg-cover bg-center opacity-20"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <Quote className="h-12 w-12 text-royal-gold mr-4" />
            <Crown className="h-16 w-16 text-royal-gold animate-glow" />
            <Quote className="h-12 w-12 text-royal-gold ml-4" />
          </div>
          <h1 className="font-great-vibes text-6xl md:text-8xl font-bold text-royal-gold mb-6 animate-fade-in">
            Dine 24
          </h1>
          <p className="font-playfair text-2xl md:text-4xl text-white mb-8 leading-relaxed">
            "Food is not just fuel, it's emotion – <br />
            <span className="text-royal-gold">Experience Indian heritage on a plate.</span>"
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/menu">
              <Button className="btn-royal text-lg px-8 py-3">
                Explore Menu <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/reserve-table">
              <Button variant="outline" className="border-royal-gold text-royal-gold hover:bg-royal-gold hover:text-black text-lg px-8 py-3">
                Reserve Table
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Restaurant */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-royal-title">About Dine 24</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Welcome to Dine 24, where culinary traditions meet royal hospitality. 
            Our restaurant embodies the essence of Indian heritage through authentic flavors, 
            seasonal ingredients, and time-honored recipes passed down through generations. 
            Every dish tells a story, every meal creates memories, and every visit becomes 
            a celebration of India's rich gastronomic culture.
          </p>
          <div className="mt-8">
            <Badge variant="outline" className="border-royal-gold text-royal-gold text-lg px-4 py-2">
              "Flavors Inspired by the Seasons"
            </Badge>
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto">
          <h2 className="text-royal-title text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="card-royal text-center">
              <CardHeader>
                <Clock className="h-12 w-12 text-royal-gold mx-auto mb-4" />
                <CardTitle className="text-royal-subtitle">Online Table & Food Reservation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Book your table and pre-order your favorite dishes online for a seamless dining experience.
                </p>
              </CardContent>
            </Card>

            <Card className="card-royal text-center">
              <CardHeader>
                <Shield className="h-12 w-12 text-royal-gold mx-auto mb-4" />
                <CardTitle className="text-royal-subtitle">Hygienic Environment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Maintaining highest standards of cleanliness and hygiene for your safety and comfort.
                </p>
              </CardContent>
            </Card>

            <Card className="card-royal text-center">
              <CardHeader>
                <Truck className="h-12 w-12 text-royal-gold mx-auto mb-4" />
                <CardTitle className="text-royal-subtitle">Fast Delivery</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Quick and reliable delivery service bringing restaurant-quality food to your doorstep.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Top Notch Dishes */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-royal-title text-center mb-12">Top Notch Dishes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topDishes.map((dish) => (
              <Card key={dish.id} className="card-royal hover:scale-105 transition-transform">
                <div className="relative">
                  <img 
                    src={dish.image} 
                    alt={dish.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-2 right-2 bg-royal-gold text-black px-2 py-1 rounded text-sm font-semibold">
                    <Star className="h-4 w-4 inline mr-1" />
                    {dish.rating}
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-royal-subtitle">{dish.name}</CardTitle>
                  <CardDescription>{dish.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-royal-gold">
                        ₹{dish.offerPrice || dish.price}
                      </span>
                      {dish.offerPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ₹{dish.price}
                        </span>
                      )}
                    </div>
                    {dish.offerPrice && (
                      <Badge variant="destructive">
                        {Math.round(((dish.price - dish.offerPrice) / dish.price) * 100)}% OFF
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Today's Special */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto">
          <h2 className="text-royal-title text-center mb-12">Today's Special</h2>
          <Card className="card-royal max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="relative">
                <img 
                  src={todaysSpecial.image} 
                  alt={todaysSpecial.name}
                  className="w-full h-64 lg:h-full object-cover rounded-lg"
                />
                <Badge className="absolute top-4 left-4 bg-red-500 text-white text-lg px-3 py-1">
                  {todaysSpecial.badge}
                </Badge>
              </div>
              <div className="flex flex-col justify-center space-y-6">
                <div>
                  <h3 className="font-playfair text-3xl font-bold text-royal-gold mb-4">
                    {todaysSpecial.name}
                  </h3>
                  <p className="text-lg text-muted-foreground mb-4">
                    {todaysSpecial.specialReason}
                  </p>
                  <div className="text-3xl font-bold text-royal-gold">
                    ₹{todaysSpecial.price}
                  </div>
                </div>
                <Link to="/todays-special">
                  <Button className="btn-royal w-full">
                    Order Now <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-royal-title text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <Card key={index} className="card-royal text-center hover:scale-105 transition-transform">
                <CardHeader>
                  <div className="mx-auto mb-4">
                    {item.icon}
                  </div>
                  <CardTitle className="text-royal-subtitle">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto">
          <h2 className="text-royal-title text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="card-royal">
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-royal-gold text-royal-gold" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground italic">
                    "{testimonial.comment}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 px-4 bg-royal-gradient">
        <div className="container mx-auto text-center">
          <h2 className="font-playfair text-4xl font-bold text-black mb-6">
            Ready to Experience Royal Dining?
          </h2>
          <p className="text-lg text-black/80 mb-8 max-w-2xl mx-auto">
            Reserve your table now and embark on a culinary journey that celebrates 
            the rich heritage of Indian cuisine with modern elegance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/reserve-table">
              <Button variant="outline" className="border-black text-black hover:bg-black hover:text-royal-gold text-lg px-8 py-3">
                Reserve Table
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="border-black text-black hover:bg-black hover:text-royal-gold text-lg px-8 py-3">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
