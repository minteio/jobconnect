
"use client";

import type { HTMLAttributes } from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Briefcase, Facebook, Twitter, Linkedin, Instagram, Globe, User, LogIn, LogOut, Menu, PlusCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface SocialLinkProps extends HTMLAttributes<HTMLAnchorElement> {
  href: string;
  icon: React.ElementType;
  label: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon: Icon, label, ...props }) => (
  <Link href={href} aria-label={label} className="text-primary-foreground/80 hover:text-primary-foreground" {...props}>
    <Icon className="h-4 w-4" />
  </Link>
);

const TopBarLink = ({ href, children, onClick }: { href?: string, children: React.ReactNode, onClick?: () => void }) => {
  if (onClick) {
    return (
      <button onClick={onClick} className="text-xs text-primary-foreground/80 hover:text-primary-foreground">
        {children}
      </button>
    );
  }
  return (
    <Link href={href!} className="text-xs text-primary-foreground/80 hover:text-primary-foreground">
      {children}
    </Link>
  );
};


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
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [siteName, setSiteName] = useState('EthioJobsConnect');
  const [languageButtonText, setLanguageButtonText] = useState('English');
  const [isEmployerLoggedIn, setIsEmployerLoggedIn] = useState(false);
  const router = useRouter();

  const updateLoginStatus = () => {
    if (typeof window !== 'undefined') {
      const loggedIn = localStorage.getItem('isEmployerLoggedIn') === 'true';
      setIsEmployerLoggedIn(loggedIn);
    }
  };

  useEffect(() => {
    updateLoginStatus(); // Initial check
    if (typeof window !== 'undefined') {
      const storedLanguage = localStorage.getItem('selectedLanguage');
      if (storedLanguage) {
        handleLanguageChange(storedLanguage, false);
      }
      window.addEventListener('authChanged', updateLoginStatus);
      window.addEventListener('languageChanged', handleLanguageEvent); // Renamed to avoid conflict
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('authChanged', updateLoginStatus);
        window.removeEventListener('languageChanged', handleLanguageEvent);
      }
    };
  }, []);

  const handleLanguageEvent = (event: Event) => {
    const customEvent = event as CustomEvent<{ lang: string }>;
    if (customEvent.detail && customEvent.detail.lang) {
      handleLanguageChange(customEvent.detail.lang, false);
    }
  };

  const handleLanguageChange = (lang: string, updateLocalStorage = true) => {
    setCurrentLanguage(lang);
    if (lang === 'am') {
      setSiteName('ኢትዮጆብስኮኔክት');
      setLanguageButtonText('አማርኛ');
    } else {
      setSiteName('EthioJobsConnect');
      setLanguageButtonText('English');
    }
    if (updateLocalStorage && typeof window !== 'undefined') {
      localStorage.setItem('selectedLanguage', lang);
      window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
    }
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isEmployerLoggedIn');
      window.dispatchEvent(new Event('authChanged'));
    }
    router.push('/');
  };
  
  const MobileNav = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden text-primary-foreground hover:bg-primary/80">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="bg-primary text-primary-foreground p-0 w-[280px] sm:w-[320px]">
        <nav className="flex flex-col gap-2 p-6">
          <Link href="/" className="flex items-center gap-2 mb-4">
            <Briefcase className="h-8 w-8" />
            <h1 className="text-2xl font-bold font-headline">{siteName}</h1>
          </Link>
          <MainNavLink href="/" isActive>Home</MainNavLink>
          <MainNavLink href="/about-us">About Us</MainNavLink>
          <MainNavLink href="/job-seekers">Job Seekers</MainNavLink>
          <MainNavLink href="/employers">Employers</MainNavLink>
          <MainNavLink href="/contact">Contact</MainNavLink>
          <div className="mt-4 border-t border-primary-foreground/20 pt-4 space-y-2">
            {isEmployerLoggedIn ? (
              <>
                <Button asChild className="w-full bg-accent hover:bg-accent/80 text-accent-foreground">
                    <Link href="/post-a-job"><PlusCircle className="mr-2 h-4 w-4" /> Post a Job</Link>
                </Button>
                <Button variant="outline" className="w-full text-primary border-primary-foreground/50 hover:bg-primary-foreground/10" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="outline" className="w-full text-primary border-primary-foreground/50 hover:bg-primary-foreground/10">
                  <Link href="/register">Register</Link>
                </Button>
                <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link href="/login">Login</Link>
                </Button>
              </>
            )}
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
            <SocialLink href="#" icon={Instagram} label="Instagram" />
          </div>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-xs text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/5 px-2 py-1 h-auto">
                  <Globe className="mr-1 h-3 w-3" /> {languageButtonText}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleLanguageChange('en')}>English</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange('am')}>አማርኛ</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {isEmployerLoggedIn ? (
              <TopBarLink onClick={handleLogout}>
                <LogOut className="mr-1 h-3 w-3 inline-block"/>Logout
              </TopBarLink>
            ) : (
              <>
                <TopBarLink href="/register"><User className="mr-1 h-3 w-3 inline-block"/>Register</TopBarLink>
                <TopBarLink href="/login"><LogIn className="mr-1 h-3 w-3 inline-block"/>Login</TopBarLink>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Briefcase className="h-8 w-8" />
          <h1 className="text-2xl font-bold font-headline">{siteName}</h1>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <MainNavLink href="/" >Home</MainNavLink>
          <MainNavLink href="/about-us">About Us</MainNavLink>
          <MainNavLink href="/job-seekers">Job Seekers</MainNavLink>
          <MainNavLink href="/employers">Employers</MainNavLink>
          <MainNavLink href="/contact">Contact</MainNavLink>
          {isEmployerLoggedIn && (
            <Button asChild className="ml-2 bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/post-a-job"><PlusCircle className="mr-2 h-4 w-4" /> Post a Job</Link>
            </Button>
          )}
        </nav>
        <div className="md:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
