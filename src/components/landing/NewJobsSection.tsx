
import type React from 'react';
import JobCard from '@/components/jobs/JobCard';
import type { JobListing } from '@/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Eye } from 'lucide-react';

interface NewJobsSectionProps {
  jobs: JobListing[];
}

const NewJobsSection: React.FC<NewJobsSectionProps> = ({ jobs }) => {
  const newJobs = jobs.filter(job => job.isFeatured).slice(0, 3); // Show up to 3 featured/new jobs

  if (newJobs.length === 0) {
    return null; // Or a placeholder if no new jobs
  }

  return (
    <section className="py-12 md:py-20 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary mb-2">
            Freshly <span className="text-accent">Posted Jobs</span>
          </h2>
          <p className="text-md text-muted-foreground max-w-xl mx-auto">
            Be the first to apply to these newly listed opportunities.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/jobs">
              <Eye className="mr-2 h-5 w-5" /> See All New Jobs
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewJobsSection;
