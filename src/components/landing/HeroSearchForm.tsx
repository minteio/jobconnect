
"use client";

import type React from 'react';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin, ListFilter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Industry } from '@/types';
import { EthiopianMajorCities, mockCategories } from '@/constants/mockData'; // Assuming mockCategories is similar to industries

interface HeroSearchFormProps {
  onSearch: (keywords: string, location: string, category: Industry | "") => void;
  initialKeywords?: string;
  initialLocation?: string;
  initialCategory?: Industry | "";
}

const ALL_LOCATIONS_VALUE = "__ALL_LOCATIONS__";
const ALL_CATEGORIES_VALUE = "__ALL_CATEGORIES__";

const HeroSearchForm: React.FC<HeroSearchFormProps> = ({ 
  onSearch, 
  initialKeywords = '', 
  initialLocation = '',
  initialCategory = ''
}) => {
  const [keywords, setKeywords] = useState(initialKeywords);
  const [location, setLocation] = useState(initialLocation);
  const [category, setCategory] = useState<Industry | "">(initialCategory);

  useEffect(() => setKeywords(initialKeywords), [initialKeywords]);
  useEffect(() => setLocation(initialLocation), [initialLocation]);
  useEffect(() => setCategory(initialCategory), [initialCategory]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(keywords, location, category);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 p-6 bg-background/80 backdrop-blur-sm rounded-lg shadow-xl border border-border"
      aria-labelledby="hero-search-heading"
    >
      <h2 id="hero-search-heading" className="sr-only">Find your best job</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-10 items-end">
        {/* Keywords Input */}
        <div className="md:col-span-4">
          <label htmlFor="hero-keyword-search" className="block text-sm font-medium mb-1 text-foreground/90">
            Keywords
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              id="hero-keyword-search"
              type="text"
              placeholder="Job title, skills, or company"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="pl-10 bg-card border-border focus:border-primary"
            />
          </div>
        </div>

        {/* Location Select */}
        <div className="md:col-span-3">
          <label htmlFor="hero-location-select" className="block text-sm font-medium mb-1 text-foreground/90">
            Location
          </label>
           <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Select
              value={location === '' ? ALL_LOCATIONS_VALUE : location}
              onValueChange={(value) => setLocation(value === ALL_LOCATIONS_VALUE ? '' : value)}
            >
              <SelectTrigger id="hero-location-select" className="pl-10 bg-card border-border focus:border-primary">
                <SelectValue placeholder="Select Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL_LOCATIONS_VALUE}>All Locations</SelectItem>
                {EthiopianMajorCities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Category Select */}
        <div className="md:col-span-3">
          <label htmlFor="hero-category-select" className="block text-sm font-medium mb-1 text-foreground/90">
            Category
          </label>
           <div className="relative">
            <ListFilter className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Select
              value={category === '' ? ALL_CATEGORIES_VALUE : category}
              onValueChange={(value) => setCategory(value === ALL_CATEGORIES_VALUE ? '' : value as Industry)}
            >
              <SelectTrigger id="hero-category-select" className="pl-10 bg-card border-border focus:border-primary">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL_CATEGORIES_VALUE}>All Categories</SelectItem>
                {mockCategories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.name}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground md:col-span-10 lg:col-span-2 md:mt-7">
          <Search className="mr-2 h-5 w-5" />
          Search
        </Button>
      </div>
    </form>
  );
};

export default HeroSearchForm;
