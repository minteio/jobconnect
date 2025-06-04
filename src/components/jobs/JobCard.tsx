
import type React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, MapPin, Building, CalendarDays, ExternalLink, DollarSign } from 'lucide-react';
import type { JobListing } from '@/types';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

interface JobCardProps {
  job: JobListing;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const postedDate = job.postedDate ? new Date(job.postedDate) : null;
  const timeAgo = postedDate ? formatDistanceToNow(postedDate, { addSuffix: true }) : 'N/A';

  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-border">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-4">
          {job.logoUrl ? (
            <Image 
              src={job.logoUrl} 
              alt={`${job.company} logo`} 
              width={64} 
              height={64} 
              className="rounded-md border object-contain h-16 w-16 shrink-0"
              data-ai-hint="company logo"
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-md border bg-secondary shrink-0">
              <Building className="h-8 w-8 text-muted-foreground" />
            </div>
          )}
          <div className="flex-1">
            <CardTitle className="text-lg font-headline mb-1 leading-tight">
              <Link href={`/jobs/${job.id}`} className="hover:underline hover:text-primary transition-colors">
                {job.title}
              </Link>
            </CardTitle>
            <div className="flex items-center text-sm text-muted-foreground mb-1">
              <Building className="mr-1.5 h-4 w-4" />
              <span>{job.company}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="mr-1.5 h-4 w-4" />
              <span>{job.location}</span>
            </div>
          </div>
           {job.isFeatured && (
            <Badge variant="default" className="absolute top-2 right-2 bg-accent text-accent-foreground text-xs py-0.5 px-2">
              Featured
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-grow pb-4">
        <CardDescription className="line-clamp-3 text-sm mb-3 text-foreground/80">{job.snippet}</CardDescription>
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="secondary" className="py-1 px-2.5">{job.industry}</Badge>
          <Badge variant="secondary" className="py-1 px-2.5">{job.jobType}</Badge>
          <Badge variant="secondary" className="py-1 px-2.5">{job.experienceLevel}</Badge>
        </div>
         {job.salaryRange && (
          <div className="flex items-center text-sm text-muted-foreground mb-3">
            <DollarSign className="mr-1.5 h-4 w-4 text-green-600" />
            <span className="font-medium text-green-700">{job.salaryRange}</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-0 border-t pt-4 bg-muted/20">
         <div className="flex items-center text-xs text-muted-foreground">
            <CalendarDays className="mr-1.5 h-3 w-3" />
            Posted {timeAgo}
          </div>
        <Button asChild variant="default" size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto">
          <Link href={`/jobs/${job.id}`}>
            View Details
            <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JobCard;

