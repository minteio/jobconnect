
import type React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const CallToActionSection: React.FC = () => {
  return (
    <section className="py-12 md:py-20 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="shadow-lg border-border text-center p-6 md:p-8">
            <CardHeader className="p-0 mb-4">
              <div className="mx-auto bg-primary/10 text-primary rounded-full h-16 w-16 flex items-center justify-center mb-4">
                <Search className="h-8 w-8" />
              </div>
              <CardTitle className="text-2xl font-headline text-primary">Do you want to find a job?</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <CardDescription className="text-muted-foreground mb-6">
                Explore thousands of exciting career opportunities. Your dream job is just a few clicks away.
              </CardDescription>
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/">
                  Find Job <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-border text-center p-6 md:p-8">
            <CardHeader className="p-0 mb-4">
              <div className="mx-auto bg-primary/10 text-primary rounded-full h-16 w-16 flex items-center justify-center mb-4">
                <Users className="h-8 w-8" />
              </div>
              <CardTitle className="text-2xl font-headline text-primary">Are you looking for a candidate?</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <CardDescription className="text-muted-foreground mb-6">
                Post your job openings and connect with top talent from across Ethiopia.
              </CardDescription>
               <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/5">
                <Link href="#">
                  Find Candidate <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
