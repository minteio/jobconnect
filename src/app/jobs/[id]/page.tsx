
import { mockJobs } from '@/constants/mockData';
import type { JobListing } from '@/types';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Building, CalendarDays, MapPin, ExternalLink } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface JobDetailPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: JobDetailPageProps): Promise<Metadata> {
  const job = mockJobs.find((j) => j.id === params.id);
  if (!job) {
    return {
      title: 'Job Not Found | EthioJobsConnect',
    };
  }
  return {
    title: `${job.title} at ${job.company} | EthioJobsConnect`,
    description: job.snippet,
  };
}

export default function JobDetailPage({ params }: JobDetailPageProps) {
  const job = mockJobs.find((j) => j.id === params.id);

  if (!job) {
    notFound(); 
  }

  const postedDate = job.postedDate ? new Date(job.postedDate) : null;
  const timeAgo = postedDate ? formatDistanceToNow(postedDate, { addSuffix: true }) : 'N/A';

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 md:px-6 py-8 flex-1">
        <div className="mb-6">
          <Button variant="outline" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Jobs
            </Link>
          </Button>
        </div>

        <Card className="w-full max-w-4xl mx-auto shadow-xl border">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              {job.logoUrl ? (
                <Image
                  src={job.logoUrl}
                  alt={`${job.company} logo`}
                  width={80}
                  height={80}
                  className="rounded-lg border object-contain h-20 w-20 shrink-0"
                  data-ai-hint="company logo"
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-lg border bg-secondary shrink-0">
                  <Building className="h-10 w-10 text-muted-foreground" />
                </div>
              )}
              <div className="flex-1">
                <CardTitle className="text-2xl lg:text-3xl font-headline mb-2 text-primary">{job.title}</CardTitle>
                <div className="flex items-center text-md text-muted-foreground mb-1">
                  <Building className="mr-2 h-5 w-5" />
                  <span className="font-medium">{job.company}</span>
                </div>
                <div className="flex items-center text-md text-muted-foreground">
                  <MapPin className="mr-2 h-5 w-5" />
                  <span>{job.location}</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pb-6">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary" className="text-sm py-1 px-3">{job.industry}</Badge>
              <Badge variant="secondary" className="text-sm py-1 px-3">{job.jobType}</Badge>
              <Badge variant="secondary" className="text-sm py-1 px-3">{job.experienceLevel}</Badge>
            </div>
            
            <div className="text-sm text-muted-foreground mb-6">
              <CalendarDays className="mr-1.5 h-4 w-4 inline-block align-text-bottom" />
              Posted {timeAgo}
            </div>

            <h3 className="text-xl font-semibold mb-3 font-headline text-foreground/90">Job Description</h3>
            <div className="prose prose-sm sm:prose-base max-w-none text-foreground/80 whitespace-pre-line leading-relaxed">
              {job.fullDescription || job.snippet}
            </div>
            
          </CardContent>
          <CardFooter className="border-t pt-6 bg-muted/30">
            <Button asChild size="lg" className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href={job.jobUrl} target="_blank" rel="noopener noreferrer">
                Apply Now
                <ExternalLink className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
}

// Optional: Generate static paths if you want to pre-render these pages at build time
// export async function generateStaticParams() {
//   return mockJobs.map((job) => ({
//     id: job.id,
//   }));
// }
