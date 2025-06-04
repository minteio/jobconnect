
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import Image from 'next/image';

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-secondary/30">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <Card className="shadow-lg border">
            <CardHeader className="text-center bg-muted/30 pb-6">
              <div className="inline-block p-4 bg-primary text-primary-foreground rounded-full mx-auto mb-4">
                <Mail size={40} />
              </div>
              <CardTitle className="text-3xl font-headline text-primary">Contact Us</CardTitle>
              <CardDescription className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
                We're here to help! Reach out to us with any questions, support requests, or feedback.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
              <div className="grid md:grid-cols-2 gap-8 items-start">
                {/* Contact Form */}
                <form className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                    <Input id="name" type="text" placeholder="Enter your full name" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                    <Input id="email" type="email" placeholder="Enter your email address" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="subject" className="text-sm font-medium">Subject</Label>
                    <Input id="subject" type="text" placeholder="What is your message about?" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-sm font-medium">Message</Label>
                    <Textarea id="message" placeholder="Write your message here..." rows={5} className="mt-1" />
                  </div>
                  <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Send className="mr-2 h-4 w-4" /> Send Message
                  </Button>
                </form>

                {/* Contact Information & Map */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-primary mb-3">Get in Touch</h3>
                    <div className="space-y-3 text-foreground/80">
                      <p className="flex items-center">
                        <MapPin className="mr-3 h-5 w-5 text-primary" />
                        123 Bole Road, Addis Ababa, Ethiopia
                      </p>
                      <p className="flex items-center">
                        <Phone className="mr-3 h-5 w-5 text-primary" />
                        +251 91 123 4567
                      </p>
                      <p className="flex items-center">
                        <Mail className="mr-3 h-5 w-5 text-primary" />
                        support@ethiojobsconnect.com
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary mb-3">Our Location</h3>
                    <div className="rounded-lg overflow-hidden border shadow-md">
                       <Image
                        src="https://placehold.co/600x350.png?text=Office+Location+Map"
                        alt="Office Location Map"
                        width={600}
                        height={350}
                        className="w-full h-auto object-cover"
                        data-ai-hint="city map location"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
