
import Link from 'next/link';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Briefcase } from 'lucide-react';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="md:hidden text-primary-foreground hover:bg-primary/80" />
          <Link href="/" className="flex items-center gap-2">
            <Briefcase className="h-7 w-7" />
            <h1 className="text-xl font-bold font-headline">EthioJobsConnect</h1>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-4">
          {/* Future navigation links can go here */}
          {/* <Button variant="ghost" className="text-primary-foreground hover:bg-primary/80">Post a Job</Button> */}
        </nav>
      </div>
    </header>
  );
};

export default Header;
