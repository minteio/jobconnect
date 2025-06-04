
"use client";
import type React from 'react';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import JobCard from '@/components/jobs/JobCard';
import type { JobListing, JobType } from '@/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface LatestJobsSectionProps {
  jobs: JobListing[];
}

const jobTypeTabs: (JobType | 'All')[] = ['All', 'Full-time', 'Part-time', 'Contract', 'Internship'];

const LatestJobsSection: React.FC<LatestJobsSectionProps> = ({ jobs }) => {
  const [activeTab, setActiveTab] = useState<JobType | 'All'>('All');

  const filteredJobs = activeTab === 'All'
    ? jobs.slice(0, 6) // Show up to 6 jobs for "All"
    : jobs.filter(job => job.jobType === activeTab).slice(0, 6); // Show up to 6 for specific types

  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary mb-2">
            Latest <span className="text-accent">Job Openings</span>
          </h2>
          <p className="text-md text-muted-foreground max-w-xl mx-auto">
            Stay updated with the most recent job postings from top companies in Ethiopia.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as JobType | 'All')} className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 mb-8">
            {jobTypeTabs.map((tab) => (
              <TabsTrigger key={tab} value={tab}>{tab === 'All' ? 'All Jobs' : tab}</TabsTrigger>
            ))}
          </TabsList>
          
          {jobTypeTabs.map((tab) => (
            <TabsContent key={tab} value={tab}>
              {filteredJobs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredJobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">No jobs found for this type.</p>
              )}
            </TabsContent>
          ))}
        </Tabs>

        <div className="text-center mt-12">
          <Button asChild size="lg" variant="outline" className="border-accent text-accent hover:bg-accent/10">
            <Link href="/jobs">
              View More Jobs <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LatestJobsSection;
