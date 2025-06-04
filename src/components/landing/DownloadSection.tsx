
import type React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Smartphone, Laptop } from 'lucide-react'; // Smartphone for app stores, Laptop for windows
import Link from 'next/link';

const DownloadButton = ({ href, icon: Icon, storeName, platform }: { href: string, icon: React.ElementType, storeName: string, platform: string }) => (
  <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/5 hover:text-primary w-full sm:w-auto">
    <Link href={href} target="_blank" rel="noopener noreferrer">
      <Icon className="mr-2 h-5 w-5" />
      <div>
        <p className="text-xs font-normal leading-none text-muted-foreground">Download on the</p>
        <p className="font-semibold leading-tight">{storeName}</p>
      </div>
    </Link>
  </Button>
);


const DownloadSection: React.FC = () => {
  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary mb-2">
            Download Our <span className="text-accent">App</span>
          </h2>
          <p className="text-md text-muted-foreground max-w-xl mx-auto">
            Get the full EthioJobsConnect experience on your favorite device. Access jobs anytime, anywhere.
          </p>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-4">
          <DownloadButton href="#" icon={Smartphone} storeName="App Store" platform="iOS" />
          <DownloadButton href="#" icon={Smartphone} storeName="Google Play" platform="Android" />
          <DownloadButton href="#" icon={Laptop} storeName="Windows Store" platform="Windows" />
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;
