
import { Linkedin, Facebook, Twitter, Github } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="border-t bg-background text-foreground/80">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row md:px-6">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} EthioJobsConnect. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link href="#" aria-label="LinkedIn" className="hover:text-primary">
            <Linkedin className="h-5 w-5" />
          </Link>
          <Link href="#" aria-label="Facebook" className="hover:text-primary">
            <Facebook className="h-5 w-5" />
          </Link>
          <Link href="#" aria-label="Twitter" className="hover:text-primary">
            <Twitter className="h-5 w-5" />
          </Link>
          <Link href="https://github.com/firebase/studio-examples" aria-label="GitHub" className="hover:text-primary">
            <Github className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
