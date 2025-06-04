
"use client";

import type React from 'react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin } from 'lucide-react';
import { EthiopianMajorCities } from '@/constants/mockData';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface JobSearchProps {
  onSearch: (keyword: string, location: string) => void;
  initialKeyword?: string;
  initialLocation?: string;
}

const ALL_ETHIOPIA_SELECT_VALUE = "__ALL_ETHIOPIA__";

const JobSearch: React.FC<JobSearchProps> = ({ onSearch, initialKeyword = '', initialLocation = '' }) => {
  const [keyword, setKeyword] = useState(initialKeyword);
  const [location, setLocation] = useState(initialLocation);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(keyword, location);
  };

  const handleLocationChange = (value: string) => {
    if (value === ALL_ETHIOPIA_SELECT_VALUE) {
      setLocation('');
    } else {
      setLocation(value);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 mt-6 p-6 bg-card rounded-lg shadow-md border"
      aria-labelledby="search-jobs-heading"
    >
      <h2 id="search-jobs-heading" className="sr-only">Search for jobs</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 items-end">
        <div className="md:col-span-2 lg:col-span-2">
          <label htmlFor="keyword-search" className="block text-sm font-medium mb-1">
            Keywords (Title, Company)
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              id="keyword-search"
              type="text"
              placeholder="e.g., Software Engineer, Marketing PLC"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div>
          <label htmlFor="location-search" className="block text-sm font-medium mb-1">
            Location
          </label>
           <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Select 
              value={location === '' ? ALL_ETHIOPIA_SELECT_VALUE : location} 
              onValueChange={handleLocationChange}
            >
              <SelectTrigger id="location-search" className="pl-10">
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL_ETHIOPIA_SELECT_VALUE}>All Ethiopia</SelectItem>
                {EthiopianMajorCities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground md:col-start-3 lg:col-start-4">
          <Search className="mr-2 h-4 w-4" />
          Search Jobs
        </Button>
      </div>
    </form>
  );
};

export default JobSearch;
