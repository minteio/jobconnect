
"use client";

import { useState, useEffect, useMemo } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import JobSearch from '@/components/jobs/JobSearch';
import JobList from '@/components/jobs/JobList';
import JobFilters from '@/components/jobs/JobFilters';
import PaginationControls from '@/components/common/PaginationControls';
import AdSlot from '@/components/common/AdSlot';
import { mockJobs } from '@/constants/mockData';
import type { JobListing, Filters, Industry, JobType, ExperienceLevel } from '@/types';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarFooter,
  SidebarInset,
  SidebarGroup,
  SidebarGroupLabel
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Settings2 } from 'lucide-react';

const ITEMS_PER_PAGE = 6;

export default function HomePage() {
  const [allJobs] = useState<JobListing[]>(mockJobs);
  const [filteredJobs, setFilteredJobs] = useState<JobListing[]>(allJobs);
  const [currentPage, setCurrentPage] = useState(1);

  const [searchTerm, setSearchTerm] = useState('');
  const [locationTerm, setLocationTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState<Filters>({
    industry: '',
    jobType: '',
    experienceLevel: '',
    companySearch: '',
  });

  useEffect(() => {
    let jobs = allJobs;

    if (searchTerm) {
      jobs = jobs.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (locationTerm) {
      jobs = jobs.filter(job =>
        job.location.toLowerCase().includes(locationTerm.toLowerCase())
      );
    }

    if (activeFilters.industry) {
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
    setCurrentPage(1); // Reset to first page on new filter/search
  }, [allJobs, searchTerm, locationTerm, activeFilters]);

  const paginatedJobs = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredJobs.slice(startIndex, endIndex);
  }, [filteredJobs, currentPage]);

  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);

  const handleSearch = (keyword: string, location: string) => {
    setSearchTerm(keyword);
    setLocationTerm(location);
  };

  const handleFilterChange = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    setActiveFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setActiveFilters({
      industry: '',
      jobType: '',
      experienceLevel: '',
      companySearch: '',
    });
  };
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <div className="flex flex-1">
        <Sidebar 
            variant="sidebar" 
            collapsible="icon" 
            className="border-r hidden md:flex"
            style={{ '--sidebar-width': '280px' } as React.CSSProperties}
        >
          <SidebarHeader>
            <div className="flex items-center gap-2 p-2">
              <Settings2 className="h-5 w-5 text-primary" />
              <h2 className="font-headline text-lg">Filters</h2>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <JobFilters 
              filters={activeFilters} 
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
            />
          </SidebarContent>
          <SidebarFooter>
            <AdSlot type="sidebar" className="m-2" />
          </SidebarFooter>
        </Sidebar>

        <SidebarInset>
          <main className="container mx-auto px-4 md:px-6 py-8 flex-1">
            <JobSearch onSearch={handleSearch} initialKeyword={searchTerm} initialLocation={locationTerm} />
            <AdSlot type="leaderboard" className="mx-auto mb-8" />
            
            {/* Mobile Filters Button - This is a basic example. Consider a Sheet component for a better mobile filter UX */}
            {/* <div className="md:hidden mb-4">
              <Button variant="outline" className="w-full">
                <Settings2 className="mr-2 h-4 w-4" /> Show Filters
              </Button>
            </div> */}

            <JobList jobs={paginatedJobs} />
            {totalPages > 0 && (
               <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
            <AdSlot type="in-content" className="mx-auto mt-8" />
          </main>
        </SidebarInset>
      </div>
      <Footer />
    </div>
  );
}
