
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Briefcase, DollarSign, MapPin, BuildingIcon, FileText, PlusCircle, Users } from 'lucide-react';
import { industries, jobTypes, experienceLevels } from '@/types';

export default function PostAJobPage() {
  return (
    <div className="flex flex-col min-h-screen bg-secondary/30">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <Card className="shadow-lg border max-w-3xl mx-auto">
            <CardHeader className="text-center bg-muted/30 pb-6">
              <div className="inline-block p-4 bg-primary text-primary-foreground rounded-full mx-auto mb-4">
                <PlusCircle size={40} />
              </div>
              <CardTitle className="text-3xl font-headline text-primary">Post a New Job</CardTitle>
              <CardDescription className="text-lg text-muted-foreground mt-2">
                Fill in the details below to reach qualified candidates on EthioJobsConnect.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="jobTitle" className="text-sm font-medium flex items-center"><Briefcase className="mr-2 h-4 w-4 text-primary" />Job Title</Label>
                    <Input id="jobTitle" placeholder="e.g., Senior Software Engineer" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="companyName" className="text-sm font-medium flex items-center"><BuildingIcon className="mr-2 h-4 w-4 text-primary" />Company Name</Label>
                    <Input id="companyName" placeholder="e.g., Tech Solutions PLC" className="mt-1" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="location" className="text-sm font-medium flex items-center"><MapPin className="mr-2 h-4 w-4 text-primary" />Location</Label>
                  <Input id="location" placeholder="e.g., Addis Ababa, Ethiopia" className="mt-1" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="industry" className="text-sm font-medium">Industry</Label>
                    <Select>
                      <SelectTrigger id="industry" className="mt-1">
                        <SelectValue placeholder="Select Industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {industries.map(industry => (
                          <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="jobType" className="text-sm font-medium">Job Type</Label>
                    <Select>
                      <SelectTrigger id="jobType" className="mt-1">
                        <SelectValue placeholder="Select Job Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {jobTypes.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="experienceLevel" className="text-sm font-medium">Experience Level</Label>
                    <Select>
                      <SelectTrigger id="experienceLevel" className="mt-1">
                        <SelectValue placeholder="Select Experience Level" />
                      </SelectTrigger>
                      <SelectContent>
                        {experienceLevels.map(level => (
                          <SelectItem key={level} value={level}>{level}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                    <Label htmlFor="salaryRange" className="text-sm font-medium flex items-center"><DollarSign className="mr-2 h-4 w-4 text-primary" />Salary Range (Optional)</Label>
                    <Input id="salaryRange" placeholder="e.g., 25,000 - 35,000 ETB or Competitive" className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="jobDescription" className="text-sm font-medium flex items-center"><FileText className="mr-2 h-4 w-4 text-primary" />Job Description</Label>
                  <Textarea id="jobDescription" placeholder="Provide a detailed description of the job responsibilities, requirements, and company culture." rows={6} className="mt-1" />
                </div>
                
                <div>
                  <Label htmlFor="skills" className="text-sm font-medium flex items-center"><Users className="mr-2 h-4 w-4 text-primary" />Required Skills (Comma-separated)</Label>
                  <Input id="skills" placeholder="e.g., JavaScript, Project Management, SEO" className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="applicationEmail" className="text-sm font-medium">Application Email or URL</Label>
                  <Input id="applicationEmail" placeholder="jobs@example.com or https://example.com/apply" className="mt-1" />
                </div>

                <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                  <PlusCircle className="mr-2 h-5 w-5" /> Post Job Listing
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
