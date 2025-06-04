
"use client";

import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LogIn } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    // Simulate successful login
    localStorage.setItem('isEmployerLoggedIn', 'true');
    window.dispatchEvent(new Event('authChanged')); // Notify header or other components
    router.push('/'); // Redirect to homepage or dashboard
  };

  return (
    <div className="flex flex-col min-h-screen bg-secondary/30">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="container mx-auto px-4 md:px-6 max-w-md">
          <Card className="shadow-lg border">
            <CardHeader className="text-center bg-muted/30 pb-6">
              <div className="inline-block p-4 bg-primary text-primary-foreground rounded-full mx-auto mb-4">
                <LogIn size={40} />
              </div>
              <CardTitle className="text-3xl font-headline text-primary">Login</CardTitle>
              <CardDescription className="text-lg text-muted-foreground mt-2">
                Welcome back! Sign in to your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
              <form className="space-y-6" onSubmit={handleLogin}>
                <div>
                  <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                  <Input id="email" type="email" placeholder="Enter your email" className="mt-1" defaultValue="employer@example.com" />
                </div>
                <div>
                  <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                  <Input id="password" type="password" placeholder="Enter your password" className="mt-1" defaultValue="password" />
                </div>
                <div className="flex items-center justify-between">
                  <Link href="#" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                  <LogIn className="mr-2 h-4 w-4" /> Sign In
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  Don&apos;t have an account?{' '}
                  <Link href="/register" className="font-medium text-primary hover:underline">
                    Sign up
                  </Link>
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
