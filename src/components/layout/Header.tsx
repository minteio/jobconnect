
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Briefcase, Facebook, Twitter, Linkedin, Instagram, Globe, DollarSign, User, LogIn, Menu } from 'lucide-react'; // Added Menu for mobile
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"; // For mobile menu

const SocialLink = ({ href, icon: Icon, label }: { href: string, icon: React.ElementType, label: string }) => (
  <Link href={href} aria-label={label} className="text-primary-foreground/80 hover:text-primary-foreground">
    <Icon className="h-4 w-4" />
  </Link>
);

const TopBarLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
  <Link href={href} className="text-xs text-primary-foreground/80 hover:text-primary-foreground">
    {children}
  </Link>
);

const MainNavLink = ({ href, children, isActive = false }: { href: string, children: React.ReactNode, isActive?: boolean }) => (
  <Link 
    href={href} 
    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive 
        ? 'bg-primary-foreground/10 text-primary-foreground' 
        : 'text-primary-foreground/80 hover:bg-primary-foreground/5 hover:text-primary-foreground'
    }`}
  >
    {children}
  </Link>
);


const Header = () => {
  // Simplified mobile navigation for now
  const MobileNav = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden text-primary-foreground hover:bg-primary/80">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="bg-primary text-primary-foreground p-0">
        <nav className="flex flex-col gap-4 p-6">
          <Link href="/" className="flex items-center gap-2 mb-4">
            <Briefcase className="h-8 w-8" />
            <h1 className="text-2xl font-bold font-headline">EthioJobsConnect</h1>
          </Link>
          <MainNavLink href="/" isActive>Home</MainNavLink>
          <MainNavLink href="#">About Us</MainNavLink>
          <MainNavLink href="#">Job Seekers</MainNavLink>
          <MainNavLink href="#">Employers</MainNavLink>
          <MainNavLink href="#">Contact</MainNavLink>
          <div className="mt-4 border-t border-primary-foreground/20 pt-4">
            <Button variant="outline" className="w-full text-primary border-primary-foreground/50 hover:bg-primary-foreground/10 mb-2">Register</Button>
            <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">Login</Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-primary text-primary-foreground shadow-md">
      {/* Top Bar */}
      <div className="bg-primary/90 hidden md:block">
        <div className="container mx-auto flex h-10 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-4">
            <SocialLink href="#" icon={Facebook} label="Facebook" />
            <SocialLink href="#" icon={Twitter} label="Twitter" />
            <SocialLink href="#" icon={Linkedin} label="LinkedIn" />
            {/* Instagram might need a custom SVG or a different Lucide icon */}
            <SocialLink href="#" icon={Instagram} label="Instagram" /> 
          </div>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-xs text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/5 px-2 py-1 h-auto">
                  <Globe className="mr-1 h-3 w-3" /> English
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>Amharic</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                 <Button variant="ghost" size="sm" className="text-xs text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/5 px-2 py-1 h-auto">
                  <DollarSign className="mr-1 h-3 w-3" /> USD
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>USD</DropdownMenuItem>
                <DropdownMenuItem>ETB</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <TopBarLink href="#"><User className="mr-1 h-3 w-3 inline-block"/>Register</TopBarLink>
            <TopBarLink href="#"><LogIn className="mr-1 h-3 w-3 inline-block"/>Login</TopBarLink>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Briefcase className="h-8 w-8" />
          <h1 className="text-2xl font-bold font-headline">EthioJobsConnect</h1>
        </Link>
        
        <nav className="hidden md:flex items-center gap-2">
          <MainNavLink href="/" isActive>Home</MainNavLink>
          <MainNavLink href="#">About Us</MainNavLink>
          <MainNavLink href="#">Job Seekers</MainNavLink>
          <MainNavLink href="#">Employers</MainNavLink>
          <MainNavLink href="#">Contact</MainNavLink>
          <Button className="ml-2 bg-accent hover:bg-accent/90 text-accent-foreground">Post a Job</Button>
        </nav>
        <div className="md:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
