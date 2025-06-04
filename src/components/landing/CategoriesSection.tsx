
import type React from 'react';
import { mockCategories } from '@/constants/mockData';
import CategoryCard from './CategoryCard';

const CategoriesSection: React.FC = () => {
  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary mb-2">
            Explore by <span className="text-accent">Categories</span>
          </h2>
          <p className="text-md text-muted-foreground max-w-xl mx-auto">
            Find the perfect job opportunity by browsing through popular categories.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mockCategories.slice(0, 8).map((category) => ( // Show up to 8 categories
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
