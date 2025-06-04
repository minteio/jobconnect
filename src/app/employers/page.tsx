
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Briefcase, PlusCircle, ArrowRight, BuildingIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function EmployersPage() {
  return (
    <div className="flex flex-col min-h-screen bg-secondary/30">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <Card className="shadow-lg border">
            <CardHeader className="text-center bg-muted/30 pb-6">
               <div className="inline-block p-4 bg-primary text-primary-foreground rounded-full mx-auto mb-4">
                <BuildingIcon size={40} />
              </div>
              <CardTitle className="text-3xl font-headline text-primary">For Employers</CardTitle>
              <CardDescription className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
                Find the perfect candidates to grow your team and achieve your business goals.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 md:p-8 space-y-10">
              <section className="text-center">
                <h2 className="text-2xl font-semibold text-primary mb-4">Ready to Hire Top Talent?</h2>
                <p className="text-foreground/80 leading-relaxed mb-6 max-w-xl mx-auto">
                  Post your job openings on EthioJobsConnect and reach thousands of qualified professionals across Ethiopia.
                </p>
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link href="/post-a-job">
                    <PlusCircle className="mr-2 h-5 w-5" /> Post a Job Now
                  </Link>
                </Button>
              </section>

              <div className="grid md:grid-cols-3 gap-6">
                <FeatureCard
                  icon={<PlusCircle className="h-8 w-8 text-primary" />}
                  title="Post Job Openings"
                  description="Easily create and publish job listings to attract suitable candidates."
                  imageUrl="https://placehold.co/600x400.png"
                  aiHint="job posting interface"
                />
                <FeatureCard
                  icon={<Users className="h-8 w-8 text-primary" />}
                  title="Access Talent Pool"
                  description="Search our database of resumes and connect with skilled professionals."
                  imageUrl="https://placehold.co/600x400.png"
                  aiHint="candidate database"
                />
                <FeatureCard
                  icon={<Briefcase className="h-8 w-8 text-primary" />}
                  title="Manage Applications"
                  description="Streamline your hiring process with our easy-to-use application management tools."
                  imageUrl="https://placehold.co/600x400.png"
                  aiHint="application management"
                />
              </div>

              <section className="bg-card p-6 rounded-lg shadow-md border">
                <h2 className="text-xl font-semibold text-primary mb-3">Why Choose EthioJobsConnect?</h2>
                <ul className="list-disc list-inside space-y-2 text-foreground/80">
                  <li><span className="font-medium">Targeted Reach:</span> Connect with a dedicated audience of Ethiopian professionals.</li>
                  <li><span className="font-medium">Cost-Effective:</span> Competitive pricing plans to fit your budget.</li>
                  <li><span className="font-medium">Easy to Use:</span> Intuitive platform for posting jobs and managing candidates.</li>
                  <li><span className="font-medium">Quality Candidates:</span> Access a pool of qualified and skilled talent.</li>
                </ul>
                <Button asChild variant="outline" className="mt-6 border-primary text-primary hover:bg-primary/5">
                  <Link href="/contact">
                    Learn More About Our Solutions <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </section>

            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  imageUrl: string;
  aiHint: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, imageUrl, aiHint }) => (
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
