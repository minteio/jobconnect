
import type React from 'react';
import JobCard from './JobCard';
import type { JobListing } from '@/types';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface JobListProps {
  jobs: JobListing[];
}

const JobList: React.FC<JobListProps> = ({ jobs }) => {
  if (jobs.length === 0) {
    return (
      <Alert variant="default" className="my-8">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>No Jobs Found</AlertTitle>
        <AlertDescription>
          Try adjusting your search terms or filters. New opportunities are added daily!
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};

export default JobList;
