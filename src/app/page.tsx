
"use client";

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation'; // Added useSearchParams
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
import { translateText } from '@/ai/flows/translate-text-flow';

const BASE_HERO_TITLE_EN = "Find Your Best Job";
const TRANSLATING_TEXT_AM = "ተርጓሚ...";
const TRANSLATING_TEXT_EN = "Translating...";

export default function HomePage() {
  const [allJobs] = useState<JobListing[]>(mockJobs);
  const [filteredJobs, setFilteredJobs] = useState<JobListing[]>(allJobs);
  const [heroTitle, setHeroTitle] = useState(BASE_HERO_TITLE_EN);
  
  const searchParams = useSearchParams(); // Initialize useSearchParams
  const initialCategoryFromUrl = searchParams.get('category') as Industry | "" | null;

  const [activeFilters, setActiveFilters] = useState<Filters>({
    industry: initialCategoryFromUrl || '', 
    jobType: '', 
    experienceLevel: '', 
    companySearch: '', 
    keywords: '',
    location: '',
    category: initialCategoryFromUrl || '', 
  });

  // Effect to update filters when URL category query parameter changes
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category') as Industry | "" | null;
    if (categoryFromUrl && categoryFromUrl !== activeFilters.category) {
      setActiveFilters(prev => ({
        ...prev,
        category: categoryFromUrl,
        industry: categoryFromUrl, // Keep industry in sync with category
        // Optionally reset other filters here if desired when a category card is clicked
        // keywords: '', 
        // location: '',
      }));
    } else if (!categoryFromUrl && activeFilters.category !== '') {
      // If category is removed from URL, and it was set, consider resetting it in filters
      // For now, we only react to category presence. A more complex reset logic could be added if needed.
      // This avoids clearing filters if user manually changes URL without category then uses form.
    }
  }, [searchParams, activeFilters.category]);


  const updateHeroTitleWithTranslation = async () => {
    const storedLanguage = typeof window !== 'undefined' ? localStorage.getItem('selectedLanguage') : 'en';
    if (storedLanguage === 'am') {
      setHeroTitle(TRANSLATING_TEXT_AM);
      try {
        const translationOutput = await translateText({ text: BASE_HERO_TITLE_EN, targetLanguage: 'am' });
        setHeroTitle(translationOutput.translatedText);
      } catch (error) {
        console.error("Translation to Amharic failed:", error);
        setHeroTitle("ምርጥ ስራዎን ያግኙ"); 
      }
    } else {
      setHeroTitle(BASE_HERO_TITLE_EN);
    }
  };

  useEffect(() => {
    updateHeroTitleWithTranslation(); 

    const handleStorageChange = () => {
      updateHeroTitleWithTranslation();
    };
    
    window.addEventListener('languageChanged', handleStorageChange);
    
    return () => {
      window.removeEventListener('languageChanged', handleStorageChange);
    };
  }, []);


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
    
    // Prioritize category filter if set (e.g., from URL or hero search)
    if (activeFilters.category) {
      jobs = jobs.filter(job => job.industry === activeFilters.category);
    } else if (activeFilters.industry) { 
       // Fallback to industry if category is not set but industry is (might be redundant)
       jobs = jobs.filter(job => job.industry === activeFilters.industry);
    }
    
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
      category, // Category from hero search form
      industry: category, // Keep industry in sync
    }));
  };

  const latestJobs = useMemo(() => {
    // If filters are active, show filtered jobs in "Latest Jobs" too, otherwise all.
    // Or always show a slice of allJobs for "Latest" and let filteredJobs be for the main results.
    // For now, let's have LatestJobsSection always show a slice of `filteredJobs`.
    return filteredJobs; 
  }, [filteredJobs]);

  const newJobs = useMemo(() => {
    // "New Jobs" could be a subset of `allJobs` marked as `isFeatured`
    // and then potentially filtered by `activeFilters` if desired.
    // For simplicity, let's filter `allJobs` by `isFeatured` and then apply active filters.
    let potentialNewJobs = allJobs.filter(job => job.isFeatured);
    // This part is tricky: do we filter newJobs based on activeFilters too?
    // Or are "New Jobs" always the same set regardless of filters?
    // Let's assume "New Jobs" are a fixed set of featured jobs for now.
     return allJobs.filter(job => job.isFeatured);
  }, [allJobs]);


  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <HeroSection 
          heroTitle={heroTitle}
          onSearch={handleHeroSearch} 
          currentFilters={{
            keywords: activeFilters.keywords, 
            location: activeFilters.location,
            category: activeFilters.category // Pass current category to HeroSearchForm
          }} 
        />
        <CategoriesSection />
        <CallToActionSection />
        {/* Pass filteredJobs to LatestJobsSection so it reflects current search/category filters */}
        <LatestJobsSection jobs={filteredJobs} /> 
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
