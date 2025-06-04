
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
import { translateText } from '@/ai/flows/translate-text-flow';

const BASE_HERO_TITLE_EN = "Find Your Best Job";
const TRANSLATING_TEXT_AM = "ተርጓሚ..."; // "Translating..." in Amharic
const TRANSLATING_TEXT_EN = "Translating...";

export default function HomePage() {
  const [allJobs] = useState<JobListing[]>(mockJobs);
  const [filteredJobs, setFilteredJobs] = useState<JobListing[]>(allJobs);
  const [heroTitle, setHeroTitle] = useState(BASE_HERO_TITLE_EN);
  
  const [activeFilters, setActiveFilters] = useState<Filters>({
    industry: '', 
    jobType: '', 
    experienceLevel: '', 
    companySearch: '', 
    keywords: '',
    location: '',
    category: '', 
  });

  const updateHeroTitleWithTranslation = async () => {
    const storedLanguage = typeof window !== 'undefined' ? localStorage.getItem('selectedLanguage') : 'en';
    if (storedLanguage === 'am') {
      setHeroTitle(TRANSLATING_TEXT_AM);
      try {
        const translationOutput = await translateText({ text: BASE_HERO_TITLE_EN, targetLanguage: 'am' });
        setHeroTitle(translationOutput.translatedText);
      } catch (error) {
        console.error("Translation to Amharic failed:", error);
        setHeroTitle("ምርጥ ስራዎን ያግኙ"); // Fallback Amharic title
      }
    } else {
      // Optionally, translate back to English if the base title could be different or for consistency
      // For now, just set to the base English title
      setHeroTitle(BASE_HERO_TITLE_EN);
    }
  };

  useEffect(() => {
    updateHeroTitleWithTranslation(); // Initial set

    const handleStorageChange = () => {
      updateHeroTitleWithTranslation();
    };
    
    window.addEventListener('languageChanged', handleStorageChange);
    // No need for 'storage' event listener if 'languageChanged' custom event is reliably dispatched

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
    
    if (activeFilters.category) {
      jobs = jobs.filter(job => job.industry === activeFilters.category);
    } else if (activeFilters.industry) { 
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
      category,
      industry: category, 
    }));
  };

  const latestJobs = useMemo(() => {
    return allJobs; 
  }, [allJobs]);

  const newJobs = useMemo(() => {
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
