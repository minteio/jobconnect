
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Users, Target } from 'lucide-react';
import Image from 'next/image';

export default function AboutUsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-secondary/30">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <Card className="shadow-lg border">
            <CardHeader className="text-center bg-muted/30 pb-6">
              <div className="inline-block p-4 bg-primary text-primary-foreground rounded-full mx-auto mb-4">
                <Briefcase size={40} />
              </div>
              <CardTitle className="text-3xl font-headline text-primary">About EthioJobsConnect</CardTitle>
              <CardDescription className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
                Connecting Ethiopia's brightest talent with outstanding career opportunities.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 md:p-8 space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-primary mb-3 flex items-center">
                  <Target className="mr-2 h-6 w-6 text-accent" /> Our Mission
                </h2>
                <p className="text-foreground/80 leading-relaxed">
                  At EthioJobsConnect, our mission is to bridge the gap between skilled professionals and employers in Ethiopia.
                  We aim to empower job seekers by providing a comprehensive platform to discover diverse job openings, and to equip
                  companies with the tools to find the perfect candidates to drive their success. We believe in fostering economic
                  growth by facilitating meaningful employment connections.
                </p>
              </section>

              <section className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl font-semibold text-primary mb-3 flex items-center">
                     Our Story
                  </h2>
                  <p className="text-foreground/80 leading-relaxed mb-4">
                    Founded with a vision to revolutionize the job market in Ethiopia, EthioJobsConnect started as a small initiative
                    to address the challenges faced by both job seekers and employers. We recognized the need for a centralized,
                    user-friendly platform that could simplify the hiring process and make job searching more efficient.
                  </p>
                  <p className="text-foreground/80 leading-relaxed">
                    Over the years, we've grown into a trusted resource, continuously innovating and expanding our services to
                    better serve the Ethiopian workforce and business community. Our commitment to quality and integrity
                    guides every decision we make.
                  </p>
                </div>
                <div className="rounded-lg overflow-hidden shadow-md">
                  <Image
                    src="https://placehold.co/600x400.png"
                    alt="Modern office in Ethiopia"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                    data-ai-hint="modern office Ethiopia"
                  />
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-primary mb-3 flex items-center">
                  <Users className="mr-2 h-6 w-6 text-accent" /> Our Values
                </h2>
                <ul className="list-disc list-inside space-y-2 text-foreground/80 pl-5">
                  <li><span className="font-semibold">Integrity:</span> Upholding the highest ethical standards in all our interactions.</li>
                  <li><span className="font-semibold">Empowerment:</span> Providing tools and resources for individuals and businesses to thrive.</li>
                  <li><span className="font-semibold">Innovation:</span> Continuously improving our platform and services.</li>
                  <li><span className="font-semibold">Collaboration:</span> Fostering strong relationships within the Ethiopian professional community.</li>
                  <li><span className="font-semibold">Accessibility:</span> Ensuring our platform is easy to use for everyone.</li>
                </ul>
              </section>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
