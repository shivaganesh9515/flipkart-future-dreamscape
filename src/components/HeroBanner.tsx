import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  ctaText: string;
  ctaAction: () => void;
}

interface HeroBannerProps {
  slides: HeroSlide[];
}

export const HeroBanner = ({ slides }: HeroBannerProps) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length, isAutoPlaying]);

  const goToSlide = (index: number) => {
    setActiveSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  if (slides.length === 0) return null;

  const currentSlide = slides[activeSlide];

  return (
    <div className="relative h-[60vh] md:h-[70vh] overflow-hidden rounded-2xl border border-accent/10">
      {/* Background Image with Parallax Effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out transform scale-105"
        style={{ 
          backgroundImage: `url(${currentSlide.image})`,
          transform: `scale(1.05) translateY(-${activeSlide * 2}px)`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl space-y-6 animate-slide-up">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-6xl font-bold text-flipkart-white leading-tight">
                {currentSlide.title}
              </h1>
              <p className="text-xl md:text-2xl text-flipkart-white/90 font-medium">
                {currentSlide.subtitle}
              </p>
            </div>
            
            <p className="text-lg text-flipkart-white/80 max-w-lg">
              {currentSlide.description}
            </p>

            <Button
              onClick={currentSlide.ctaAction}
              size="lg"
              className="cta-pulse bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg font-semibold rounded-full"
            >
              {currentSlide.ctaText}
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-flipkart-white/10 backdrop-blur-sm hover:bg-flipkart-white/20 text-flipkart-white"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-flipkart-white/10 backdrop-blur-sm hover:bg-flipkart-white/20 text-flipkart-white"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === activeSlide
                ? 'w-8 bg-accent shadow-neon'
                : 'w-2 bg-flipkart-white/50 hover:bg-flipkart-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
};