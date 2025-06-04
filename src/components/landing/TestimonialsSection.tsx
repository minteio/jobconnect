
import type React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import type { Testimonial } from '@/types';
import { mockTestimonials } from '@/constants/mockData';
import { Star } from 'lucide-react';

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
  <Card className="shadow-lg border-border p-6 md:p-8 h-full flex flex-col">
    <CardContent className="p-0 flex-grow">
      <p className="text-muted-foreground italic leading-relaxed mb-6">"{testimonial.quote}"</p>
    </CardContent>
    <div className="flex items-center mt-auto">
      <Image
        src={testimonial.avatarUrl}
        alt={testimonial.authorName}
        width={50}
        height={50}
        className="rounded-full mr-4 border-2 border-accent"
        data-ai-hint={testimonial.aiHint}
      />
      <div>
        <p className="font-semibold text-primary">{testimonial.authorName}</p>
        <p className="text-sm text-muted-foreground">{testimonial.authorTitle}</p>
        <div className="flex mt-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
          ))}
        </div>
      </div>
    </div>
  </Card>
);

const TestimonialsSection: React.FC = () => {
  const testimonialsToShow = mockTestimonials.slice(0, 2); // Show first 2 testimonials

  return (
    <section className="py-12 md:py-20 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary mb-2">
            What Our <span className="text-accent">Users Say</span>
          </h2>
          <p className="text-md text-muted-foreground max-w-xl mx-auto">
            Hear from job seekers and employers who found success with EthioJobsConnect.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonialsToShow.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
