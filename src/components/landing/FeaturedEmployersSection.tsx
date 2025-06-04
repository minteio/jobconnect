
import type React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import type { Employer } from '@/types';
import { mockEmployers } from '@/constants/mockData';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const FeaturedEmployersSection: React.FC = () => {
  const employersToShow = mockEmployers.slice(0, 4); // Show first 4 employers

  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary mb-2">
            Featured <span className="text-accent">Employers</span>
          </h2>
          <p className="text-md text-muted-foreground max-w-xl mx-auto">
            Companies actively hiring on our platform. Explore opportunities with leading organizations.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {employersToShow.map((employer) => (
            <Link key={employer.id} href="#" className="group block">
              <Card className="h-full overflow-hidden text-center p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <CardContent className="flex flex-col items-center justify-center p-0">
                  <div className="relative h-24 w-full max-w-[150px] mb-4">
                    <Image
                      src={employer.logoUrl}
                      alt={`${employer.name} logo`}
                      layout="fill"
                      objectFit="contain"
                      data-ai-hint={employer.aiHint}
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-primary group-hover:text-accent transition-colors">{employer.name}</h3>
                  <Button variant="link" size="sm" className="text-sm text-accent mt-2 p-0 h-auto">
                    View Profile <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
         <div className="flex justify-center mt-8">
          <Image src="https://placehold.co/120x40.png?text=Rejoin" alt="Rejoin Logo" width={120} height={40} data-ai-hint="company logo"/>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEmployersSection;
