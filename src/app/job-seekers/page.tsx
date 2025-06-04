
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Briefcase, FileText, ArrowRight, Users } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function JobSeekersPage() {
  return (
    <div className="flex flex-col min-h-screen bg-secondary/30">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <Card className="shadow-lg border">
            <CardHeader className="text-center bg-muted/30 pb-6">
              <div className="inline-block p-4 bg-primary text-primary-foreground rounded-full mx-auto mb-4">
                <Users size={40} />
              </div>
              <CardTitle className="text-3xl font-headline text-primary">For Job Seekers</CardTitle>
              <CardDescription className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
                Your next career move starts here. Discover opportunities and resources to help you succeed.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 md:p-8 space-y-10">
              <section className="text-center">
                <h2 className="text-2xl font-semibold text-primary mb-4">Ready to Find Your Dream Job?</h2>
                <p className="text-foreground/80 leading-relaxed mb-6 max-w-xl mx-auto">
                  Browse thousands of job listings from top companies across Ethiopia. Our platform makes it easy to search, apply, and get noticed.
                </p>
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link href="/">
                    <Search className="mr-2 h-5 w-5" /> Search Jobs Now
                  </Link>
                </Button>
              </section>

              <div className="grid md:grid-cols-3 gap-6">
                <InfoCard
                  icon={<Briefcase className="h-8 w-8 text-primary" />}
                  title="Explore Opportunities"
                  description="Access a wide range of job listings in various industries and locations."
                  imageUrl="https://placehold.co/600x400.png"
                  aiHint="job search diverse"
                />
                <InfoCard
                  icon={<FileText className="h-8 w-8 text-primary" />}
                  title="Build Your Profile"
                  description="Create a professional profile to showcase your skills and experience to potential employers."
                  imageUrl="https://placehold.co/600x400.png"
                  aiHint="resume profile"
                />
                <InfoCard
                  icon={<Users className="h-8 w-8 text-primary" />}
                  title="Career Resources"
                  description="Get tips on resume writing, interview skills, and career development to boost your chances."
                  imageUrl="https://placehold.co/600x400.png"
                  aiHint="career advice"
                />
              </div>

              <section className="bg-card p-6 rounded-lg shadow-md border">
                <h2 className="text-xl font-semibold text-primary mb-3">How It Works</h2>
                <ol className="list-decimal list-inside space-y-2 text-foreground/80">
                  <li><span className="font-medium">Create Your Account:</span> Sign up for free and build your professional profile.</li>
                  <li><span className="font-medium">Search Jobs:</span> Use our advanced filters to find relevant job openings.</li>
                  <li><span className="font-medium">Apply Online:</span> Submit your application directly through our platform.</li>
                  <li><span className="font-medium">Get Noticed:</span> Let employers find you based on your skills and experience.</li>
                </ol>
              </section>

            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  imageUrl: string;
  aiHint: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, title, description, imageUrl, aiHint }) => (
  <Card className="text-center flex flex-col">
    <CardHeader className="items-center">
      <div className="p-3 bg-primary/10 rounded-full mb-2">
        {icon}
      </div>
      <CardTitle className="text-lg text-primary">{title}</CardTitle>
    </CardHeader>
    <CardContent className="flex-grow">
      <Image src={imageUrl} alt={title} width={600} height={400} className="w-full h-auto object-cover rounded-md mb-3" data-ai-hint={aiHint} />
      <p className="text-sm text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);
