
import { Linkedin, Facebook, Twitter, Github, Send, Briefcase, Rss } from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const FooterLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
  <Link href={href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
    {children}
  </Link>
);

const SocialIconLink = ({ href, icon: Icon, label }: { href: string, icon: React.ElementType, label: string }) => (
  <Link href={href} aria-label={label} className="text-muted-foreground hover:text-primary transition-colors">
    <Icon className="h-5 w-5" />
  </Link>
);

const Footer = () => {
  return (
    <footer className="border-t bg-card text-card-foreground">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* About Us */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 mb-2">
              <Briefcase className="h-8 w-8 text-primary" />
              <h2 className="text-xl font-bold font-headline text-primary">EthioJobsConnect</h2>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Connecting talent with opportunity in Ethiopia. Find your dream job or the perfect candidate with us.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <SocialIconLink href="#" icon={Facebook} label="Facebook" />
              <SocialIconLink href="#" icon={Twitter} label="Twitter" />
              <SocialIconLink href="#" icon={Linkedin} label="LinkedIn" />
              <SocialIconLink href="https://github.com/firebase/studio-examples" icon={Github} label="GitHub" />
            </div>
          </div>

          {/* Job Categories */}
          <div className="space-y-4">
            <h3 className="text-md font-semibold font-headline tracking-wide">Job Categories</h3>
            <ul className="space-y-2">
              <li><FooterLink href="#">Technology</FooterLink></li>
              <li><FooterLink href="#">Marketing & Sales</FooterLink></li>
              <li><FooterLink href="#">Design & Creative</FooterLink></li>
              <li><FooterLink href="#">Finance & Accounting</FooterLink></li>
              <li><FooterLink href="#">View All Categories</FooterLink></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-md font-semibold font-headline tracking-wide">Resources</h3>
            <ul className="space-y-2">
              <li><FooterLink href="#">Blog</FooterLink></li>
              <li><FooterLink href="#">FAQ</FooterLink></li>
              <li><FooterLink href="#">Support</FooterLink></li>
              <li><FooterLink href="#">Terms of Service</FooterLink></li>
              <li><FooterLink href="#">Privacy Policy</FooterLink></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-md font-semibold font-headline tracking-wide">Subscribe to our Newsletter</h3>
            <p className="text-sm text-muted-foreground">
              Get the latest job alerts and news straight to your inbox.
            </p>
            <form className="flex gap-2">
              <Input type="email" placeholder="Enter your email" className="flex-1" aria-label="Email for newsletter"/>
              <Button type="submit" variant="default" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Send className="h-4 w-4" />
              </Button>
            </form>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
              <Rss className="h-4 w-4" />
              <FooterLink href="#">RSS Feed</FooterLink>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} EthioJobsConnect. All rights reserved. Built with Firebase Studio.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
