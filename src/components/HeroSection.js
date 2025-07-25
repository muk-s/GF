import heroImage from '../assets/gaming-hero.jpg';
import { Gamepad2, Star, ShoppingCart } from 'lucide-react';

const HeroSection = () => {
    return ( 
    <section 
        className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.8)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-gaming-neon-blue/20" />
        <div className="relative z-10 max-w-7xl mx-auto text-center px-6">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Gamepad2 className="h-16 w-16 text-primary gaming-glow" />
            <h1 className="text-6xl font-bold text-gradient">GameStore</h1>
          </div>
          <p className="text-2xl text-foreground/90 mb-8 max-w-2xl mx-auto">
            Your ultimate destination for gaming excellence. Discover the latest games and join the community.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-foreground/70">
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-gaming-gold text-gaming-gold" />
              Premium Quality
            </span>
            <span className="flex items-center gap-1">
              <Gamepad2 className="h-4 w-4" />
              Latest Games
            </span>
            <span className="flex items-center gap-1">
              <ShoppingCart className="h-4 w-4" />
              Instant Delivery
            </span>
          </div>
        </div>
      </section>
  );
};

export default HeroSection;
