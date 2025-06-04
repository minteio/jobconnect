
import type React from 'react';
import HeroSearchForm from './HeroSearchForm';
import type { Filters, Industry } from '@/types'; // Ensure Industry is imported if used for category type

interface HeroSectionProps {
  onSearch: (keywords: string, location: string, category: Industry | "") => void;
  currentFilters: Pick<Filters, 'keywords' | 'location' | 'category'>;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onSearch, currentFilters }) => {
  return (
    <section 
      className="relative bg-gradient-to-br from-primary to-primary/70 text-primary-foreground py-20 md:py-32"
      style={{ 
        backgroundImage: "url('https://placehold.co/1920x800.png?text=')", // Placeholder for actual hero image
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
      data-ai-hint="cityscape modern"
    >
      <div className="absolute inset-0 bg-black/50"></div> {/* Dark overlay */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline mb-4 leading-tight">
          Find Your <span className="text-accent">Best Job</span>
        </h1>
        <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
          Discover thousands of job opportunities in Ethiopia. Your next career move starts here.
        </p>
        <HeroSearchForm 
          onSearch={onSearch} 
          initialKeywords={currentFilters.keywords}
          initialLocation={currentFilters.location}
          initialCategory={currentFilters.category}
        />
      </div>
    </section>
  );
};

export default HeroSection;
