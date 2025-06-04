
"use client";

import { useState, useEffect, useMemo } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/landing/HeroSection';
import CategoriesSection from '@/components/landing/CategoriesSection';
import CallToActionSection from '@/components/landing/CallToActionSection';
import LatestJobsSection from '@/components/landing/LatestJobsSection';
import StatsSection from '@/components/landing/StatsSection';
import DownloadSection from '@/components/landing/DownloadSection';
import NewJobsSection from '@/components/landing/NewJobsSection';
import FeaturedEmployersSection from '@/components/landing/FeaturedEmployersSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';

import { mockJobs } from '@/constants/mockData';
import type { JobListing, Filters, Industry } from '@/types';

export default function HomePage() {
  const [allJobs] = useState<JobListing[]>(mockJobs);
  const [filteredJobs, setFilteredJobs] = useState<JobListing[]>(allJobs);
  
  const [activeFilters, setActiveFilters] = useState<Filters>({
    industry: '', // Used by general filters if any, and can be set by category click
    jobType: '', // Used by LatestJobsSection tabs
    experienceLevel: '', // Not directly used in new landing page UI, but kept for potential future use
    companySearch: '', // Not directly used, but kept
    // Hero search specific filters
    keywords: '',
    location: '',
    category: '', // This will map to industry for filtering
  });

  useEffect(() => {
    let jobs = allJobs;

    if (activeFilters.keywords) {
      jobs = jobs.filter(job =>
        job.title.toLowerCase().includes(activeFilters.keywords.toLowerCase()) ||
        job.company.toLowerCase().includes(activeFilters.keywords.toLowerCase()) ||
        job.snippet.toLowerCase().includes(activeFilters.keywords.toLowerCase())
      );
    }

    if (activeFilters.location) {
      jobs = jobs.filter(job =>
        job.location.toLowerCase().includes(activeFilters.location.toLowerCase())
      );
    }
    
    // Category from hero search maps to industry filter
    if (activeFilters.category) {
      jobs = jobs.filter(job => job.industry === activeFilters.category);
    } else if (activeFilters.industry) { // Fallback to general industry filter if category isn't set
       jobs = jobs.filter(job => job.industry === activeFilters.industry);
    }
    
    // These filters are not directly controlled by the new landing page UI, 
    // but if set by other means (e.g. direct URL params in future), they would apply.
    if (activeFilters.jobType) {
      jobs = jobs.filter(job => job.jobType === activeFilters.jobType);
    }
    if (activeFilters.experienceLevel) {
      jobs = jobs.filter(job => job.experienceLevel === activeFilters.experienceLevel);
    }
    if (activeFilters.companySearch) {
      jobs = jobs.filter(job => job.company.toLowerCase().includes(activeFilters.companySearch.toLowerCase()));
    }
    
    setFilteredJobs(jobs);
  }, [allJobs, activeFilters]);


  const handleHeroSearch = (keywords: string, location: string, category: Industry | "") => {
    setActiveFilters(prev => ({ 
      ...prev, 
      keywords,
      location,
      category,
      industry: category, // Sync category search with general industry filter
    }));
  };

  // Memoized values for props to sections that display jobs
  const latestJobs = useMemo(() => {
    // Latest jobs section might have its own internal tab filtering logic, 
    // but it will receive the globally filtered jobs based on hero search.
    // For simplicity, we pass allJobs here, and LatestJobsSection can do further slicing/tab filtering.
    // Or, pass filteredJobs if hero search should affect "Latest Jobs" section display.
    // Let's pass allJobs and let LatestJobs handle its own display logic.
    return allJobs; 
  }, [allJobs]);

  const newJobs = useMemo(() => {
     // Similar to latestJobs, could be allJobs or filteredJobs
    return allJobs.filter(job => job.isFeatured);
  }, [allJobs]);


  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <HeroSection 
          onSearch={handleHeroSearch} 
          currentFilters={{
            keywords: activeFilters.keywords, 
            location: activeFilters.location,
            category: activeFilters.category
          }} 
        />
        <CategoriesSection />
        <CallToActionSection />
        <LatestJobsSection jobs={latestJobs} />
        <StatsSection />
        <DownloadSection />
        <NewJobsSection jobs={newJobs} />
        <FeaturedEmployersSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
}
