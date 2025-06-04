
import { mockJobs, mockCategories } from '@/constants/mockData'; // Removed mockRelatedJobs and mockSimilarJobsSidebar as we'll derive or use full mockJobs
import type { JobListing, JobReview, SimilarJobSidebarItem } from '@/types';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowLeft, Building, CalendarDays, MapPin, ExternalLink, Briefcase, Users, 
  Star, MessageCircle, Phone, Mail, Globe as WebIcon, CheckCircle, Share2, Printer, AlertTriangle, Search, ThumbsUp, MessageSquare, Flag, Eye
} from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress'; // For rating bars

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

const JobDetailItem: React.FC<{ label: string; value?: string | string[] | null }> = ({ label, value }) => {
  if (!value) return null;
  return (
    <div className="grid grid-cols-2 py-2">
      <dt className="text-sm font-medium text-muted-foreground">{label}</dt>
      <dd className="text-sm text-foreground">
        {Array.isArray(value) ? value.join(', ') : value}
      </dd>
    </div>
  );
};

const ReviewCard: React.FC<{ review: JobReview }> = ({ review }) => (
  <div className="flex gap-4 py-4 border-b last:border-b-0">
    <Image src={review.author.avatarUrl} alt={review.author.name} width={40} height={40} className="rounded-full h-10 w-10 shrink-0" data-ai-hint={review.author.aiHint || "user avatar"}/>
    <div className="flex-1">
      <div className="flex justify-between items-center mb-1">
        <h4 className="font-semibold text-md">{review.author.name}</h4>
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
          ))}
        </div>
      </div>
      <p className="text-xs text-muted-foreground mb-2">{review.date}</p>
      <p className="text-sm text-foreground/80 leading-relaxed">{review.comment}</p>
      <div className="flex gap-3 mt-3 text-xs">
        <Button variant="link" size="sm" className="p-0 h-auto text-primary hover:underline"><ThumbsUp className="mr-1 h-3 w-3" /> Helpful</Button>
        <Button variant="link" size="sm" className="p-0 h-auto text-primary hover:underline"><MessageSquare className="mr-1 h-3 w-3" /> Comment</Button>
        <Button variant="link" size="sm" className="p-0 h-auto text-destructive/80 hover:underline"><Flag className="mr-1 h-3 w-3" /> Report</Button>
      </div>
    </div>
  </div>
);

const RelatedJobCard: React.FC<{ job: JobListing }> = ({ job }) => {
    const postedDate = job.postedDate ? new Date(job.postedDate) : null;
    const timeAgo = postedDate ? formatDistanceToNow(postedDate, { addSuffix: true }) : 'N/A';

    return (
      <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow border">
        <Link href={`/jobs/${job.id}`} className="block group">
          <div className="relative h-40">
            <Image 
              src={job.logoUrl || "https://placehold.co/400x300.png"} 
              alt={job.title} 
              fill // Use fill for responsive images
              style={{objectFit: 'cover'}} // Added style for objectFit with fill
              className="group-hover:scale-105 transition-transform duration-300"
              data-ai-hint={job.aiHint || "job image"}
            />
            {job.salaryRange && !job.salaryRange.includes("-") && <Badge className="absolute top-2 right-2 bg-blue-500 text-white">{job.salaryRange}</Badge>}
          </div>
          <CardContent className="p-4">
            <h3 className="font-semibold text-md mb-1 group-hover:text-primary transition-colors">{job.title}</h3>
            <div className="text-xs text-muted-foreground flex items-center gap-4">
              <span><MapPin className="h-3 w-3 inline mr-1"/>{job.location}</span>
              <span><CalendarDays className="h-3 w-3 inline mr-1"/>{timeAgo}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1"><Briefcase className="h-3 w-3 inline mr-1"/>{job.company}</p>
          </CardContent>
        </Link>
      </Card>
    );
};


export default function JobDetailPage({ params }: JobDetailPageProps) {
  const job = mockJobs.find((j) => j.id === params.id);

  if (!job) {
    notFound(); 
  }

  const postedDate = job.postedDate ? new Date(job.postedDate) : null;
  const timeSincePosted = postedDate ? formatDistanceToNow(postedDate, { addSuffix: true }) : 'N/A';
  const formattedPostedDate = postedDate ? format(postedDate, 'dd MMM yyyy') : 'N/A';

  const mockRelatedJobs = mockJobs.filter(j => j.id !== job.id && j.industry === job.industry).slice(0, 2); // Example: jobs in same industry
  const mockSimilarJobsForSidebar = mockJobs.filter(j => j.id !== job.id && (j.industry === job.industry || j.jobType === job.jobType)).slice(0, 4).map(j => ({ id: j.id, title: j.title, company: j.company, location: j.location }));


  return (
    <div className="flex flex-col min-h-screen bg-secondary/30">
      <Header />
      <div className="py-6 bg-card shadow-sm">
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-primary">Job Details</h1>
          <nav aria-label="breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-primary">Home</Link></li>
              <li><span>/</span></li>
              <li><Link href="/jobs" className="hover:text-primary">Jobs</Link></li> {/* Assuming a /jobs listing page exists */}
              <li><span>/</span></li>
              <li className="text-foreground" aria-current="page">{job.title}</li>
            </ol>
          </nav>
        </div>
      </div>

      <main className="container mx-auto px-4 md:px-6 py-8 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="shadow-lg border">
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row items-start gap-6">
                  {job.logoUrl ? (
                    <Image
                      src={job.logoUrl}
                      alt={`${job.company} logo`}
                      width={80}
                      height={80}
                      className="rounded-lg border object-contain h-20 w-20 shrink-0"
                      data-ai-hint="company logo abstract"
                    />
                  ) : (
                    <div className="flex h-20 w-20 items-center justify-center rounded-lg border bg-secondary shrink-0">
                      <Briefcase className="h-10 w-10 text-muted-foreground" />
                    </div>
                  )}
                  <div className="flex-1 relative">
                    <CardTitle className="text-2xl lg:text-3xl font-headline mb-1 text-primary">{job.title}</CardTitle>
                    <div className="flex flex-wrap items-center text-sm text-muted-foreground gap-x-3 gap-y-1 mb-3">
                      <span><Building className="mr-1 h-4 w-4 inline-block" /> {job.company}</span>
                      <span><MapPin className="mr-1 h-4 w-4 inline-block" /> {job.location}</span>
                      <span><CalendarDays className="mr-1 h-4 w-4 inline-block" /> {timeSincePosted}</span>
                      {job.views && <span><Eye className="mr-1 h-4 w-4 inline-block" /> {job.views}</span>}
                    </div>
                     {/* Star rating would go here if data available */}
                    <div className="flex gap-2">
                        <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                            <Link href={job.jobUrl} target="_blank" rel="noopener noreferrer">
                                <CheckCircle className="mr-2 h-4 w-4" /> Apply
                            </Link>
                        </Button>
                        <Button variant="outline">Contact Now</Button>
                    </div>
                    {job.isUrgent && <Badge className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 text-xs transform rotate-[30deg] translate-x-1/4 -translate-y-1/4 origin-bottom-right">Urgent</Badge>}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-6 space-y-6">
                <div>
                    <h3 className="text-lg font-semibold mb-2 font-headline text-foreground/90">Job Description</h3>
                    <div
                        className="prose prose-sm sm:prose-base max-w-none text-foreground/80 whitespace-pre-line leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: job.fullDescription.replace(/\n/g, '<br />') }}
                    />
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-3 font-headline text-foreground/90">Job Details</h3>
                    <dl className="divide-y divide-border">
                        <JobDetailItem label="Job Type" value={job.jobType} />
                        <JobDetailItem label="Max Exp" value={job.maxExperience} />
                        <JobDetailItem label="Role" value={job.industry} /> {/* Using industry as role for now */}
                        <JobDetailItem label="Languages" value={job.languages} />
                        <JobDetailItem label="Min Salary" value={job.minSalary} />
                        <JobDetailItem label="Locality" value={job.locality} />
                        <JobDetailItem label="Max Salary" value={job.maxSalary} />
                        <JobDetailItem label="Eligibility" value={job.eligibility} />
                        <JobDetailItem label="Min Exp" value={job.minExperience} />
                        <JobDetailItem label="Company" value={job.companyInfo || job.company} />
                    </dl>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4 pb-4 bg-muted/30 flex flex-col sm:flex-row justify-between items-center gap-3">
                <p className="text-xs text-muted-foreground">Job ID: {job.id}</p>
                <p className="text-xs text-muted-foreground">Posted By {job.companyInfo || job.company} / {formattedPostedDate}</p>
              </CardFooter>
            </Card>

            <div className="flex flex-wrap gap-2">
                <Button asChild className="bg-green-600 hover:bg-green-700 text-white">
                    <Link href={job.jobUrl} target="_blank" rel="noopener noreferrer"><CheckCircle className="mr-2 h-4 w-4" /> Apply</Link>
                </Button>
                <Button variant="outline"><Share2 className="mr-2 h-4 w-4" /> Share Job</Button>
                <Button variant="outline"><Printer className="mr-2 h-4 w-4" /> Print</Button>
                <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-500/10"><AlertTriangle className="mr-2 h-4 w-4" /> Report Abuse</Button>
            </div>
            
            {/* Related Posts */}
            {mockRelatedJobs.length > 0 && (
              <Card>
                  <CardHeader>
                      <CardTitle className="text-xl font-headline">Related Posts</CardTitle>
                  </CardHeader>
                  <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {mockRelatedJobs.map(relatedJob => <RelatedJobCard key={relatedJob.id} job={relatedJob} />)}
                      </div>
                  </CardContent>
              </Card>
            )}


            {/* Rating and Reviews */}
            {job.reviews && job.reviews.length > 0 && (
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl font-headline">Rating and Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                    {job.ratingStats && (
                        <div className="space-y-2 mb-6">
                            {job.ratingStats.map(stat => (
                                <div key={stat.rating} className="flex items-center gap-2">
                                    <span className="text-xs w-6 text-right">{stat.rating} <Star className="h-3 w-3 inline text-yellow-400 fill-yellow-400"/></span>
                                    <Progress value={stat.percentage} className="h-2 flex-1" />
                                    <span className="text-xs text-muted-foreground w-12 text-right">{stat.count}</span>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="space-y-4">
                        {job.reviews.map(review => <ReviewCard key={review.id} review={review} />)}
                    </div>
                </CardContent>
            </Card>
            )}

            {/* Leave a Reply */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl font-headline">Leave a Reply</CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4">
                        <div>
                            <label htmlFor="replyName" className="block text-sm font-medium mb-1">Your Name</label>
                            <Input id="replyName" placeholder="Enter your name" />
                        </div>
                        <div>
                            <label htmlFor="replyEmail" className="block text-sm font-medium mb-1">Email Address</label>
                            <Input id="replyEmail" type="email" placeholder="Enter your email" />
                        </div>
                        <div>
                            <label htmlFor="replyComment" className="block text-sm font-medium mb-1">Comment</label>
                            <Textarea id="replyComment" placeholder="Write your comment here..." rows={4} />
                        </div>
                        <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">Send Reply</Button>
                    </form>
                </CardContent>
            </Card>

          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-1 space-y-6">
            {job.postedByRecruiter && (
                <Card>
                    <CardHeader className="bg-muted/30">
                        <CardTitle className="text-md font-semibold">Posted By</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center p-4">
                        <Image src={job.postedByRecruiter.avatarUrl} alt={job.postedByRecruiter.name} width={80} height={80} className="rounded-full mx-auto mb-3 border-2 border-primary" data-ai-hint={job.postedByRecruiter.aiHint || "recruiter avatar"}/>
                        <h4 className="font-semibold text-lg text-primary">{job.postedByRecruiter.name}</h4>
                        <p className="text-xs text-muted-foreground">{job.postedByRecruiter.title}</p>
                        <p className="text-xs text-muted-foreground">Member Since {job.postedByRecruiter.memberSince}</p>
                        <Button variant="outline" size="sm" className="mt-3 w-full">See All Ads</Button>
                    </CardContent>
                </Card>
            )}
            {job.postedByRecruiter && (job.postedByRecruiter.email || job.postedByRecruiter.phone || job.postedByRecruiter.website) && (
                 <Card>
                    <CardHeader className="bg-muted/30">
                        <CardTitle className="text-md font-semibold">Contact Info</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 space-y-2">
                        {job.postedByRecruiter.email && <p className="text-sm flex items-center"><Mail className="mr-2 h-4 w-4 text-primary"/> {job.postedByRecruiter.email}</p>}
                        {job.postedByRecruiter.phone && <p className="text-sm flex items-center"><Phone className="mr-2 h-4 w-4 text-primary"/> {job.postedByRecruiter.phone}</p>}
                        {job.postedByRecruiter.website && <p className="text-sm flex items-center"><WebIcon className="mr-2 h-4 w-4 text-primary"/> <Link href={job.postedByRecruiter.website} target="_blank"  rel="noopener noreferrer" className="text-primary hover:underline truncate block">{job.postedByRecruiter.website}</Link></p>}
                       <div className="flex gap-2 pt-2">
                           <Button variant="default" size="sm" className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"><MessageCircle className="mr-1.5 h-4 w-4"/> Chat</Button>
                           <Button variant="outline" size="sm" className="flex-1">Contact Me</Button>
                       </div>
                    </CardContent>
                </Card>
            )}
             {job.skills && job.skills.length > 0 && (
                <Card>
                    <CardHeader className="bg-muted/30">
                        <CardTitle className="text-md font-semibold">Keywords</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 flex flex-wrap gap-2">
                        {job.skills.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                    </CardContent>
                </Card>
            )}
             <Card>
                <CardHeader className="bg-muted/30">
                    <CardTitle className="text-md font-semibold">Shares</CardTitle>
                </CardHeader>
                <CardContent className="p-4 flex gap-2 justify-center">
                    {/* Placeholder social icons */}
                    <Button variant="outline" size="icon" className="rounded-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/></svg></Button>
                    <Button variant="outline" size="icon" className="rounded-full border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.231.047s-2.389-.009-3.232-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.231s.008-2.389.046-3.232c.036-.78.166-1.204.275-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/></svg></Button>
                    <Button variant="outline" size="icon" className="rounded-full border-red-600 text-red-600 hover:bg-red-600 hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.171-.006.087-.004.171-.007.17-.006c1.274-.043 2.547-.05 2.824-.05h.093zM6.75 5.443c.001-.169.11-.304.27-.304.051 0 .102.014.146.041l3.782 2.101c.126.07.188.207.188.336 0 .129-.062.265-.188.335l-3.782 2.101c-.044.028-.095.041-.146.041-.16 0-.271-.136-.271-.305V5.443z"/></svg></Button>
                    <Button variant="outline" size="icon" className="rounded-full border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/></svg></Button>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="bg-muted/30">
                    <CardTitle className="text-md font-semibold">Map Location</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    {/* Placeholder for map */}
                    <Image src="https://placehold.co/300x200.png?text=Map+Location" alt="Map Location" width={300} height={200} className="w-full h-auto" data-ai-hint="map placeholder"/>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="bg-muted/30">
                    <CardTitle className="text-md font-semibold">Search Jobs</CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                    <Input placeholder="What are you looking for?" />
                    <Select>
                        <SelectTrigger><SelectValue placeholder="All Categories" /></SelectTrigger>
                        <SelectContent>
                            {mockCategories.map(cat => <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>)}
                        </SelectContent>
                    </Select>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Search</Button>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="bg-muted/30">
                    <CardTitle className="text-md font-semibold">Similar Jobs</CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                    {mockSimilarJobsForSidebar.map(sj => {
                      const similarJobDetails = mockJobs.find(j => j.id === sj.id);
                      const applyUrl = similarJobDetails ? similarJobDetails.jobUrl : '#';
                      const viewDetailsUrl = `/jobs/${sj.id}`;

                      return (
                        <div key={sj.id} className="pb-3 border-b last:border-b-0 last:pb-0">
                           <Link href={viewDetailsUrl} className="font-medium text-sm hover:text-primary block leading-tight">{sj.title}</Link>
                           <p className="text-xs text-muted-foreground">{sj.company} - {sj.location}</p>
                           <div className="mt-1.5 flex gap-1">
                               <Button asChild variant="default" size="sm" className="h-6 px-2 py-0.5 text-xs bg-primary hover:bg-primary/90 text-primary-foreground">
                                 <Link href={applyUrl} target="_blank" rel="noopener noreferrer">Apply</Link>
                               </Button>
                               <Button asChild variant="outline" size="sm" className="h-6 px-2 py-0.5 text-xs">
                                 <Link href={viewDetailsUrl}>View Details</Link>
                               </Button>
                           </div>
                        </div>
                      );
                    })}
                </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
