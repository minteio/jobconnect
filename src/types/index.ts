
export interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  snippet: string;
  fullDescription: string;
  jobUrl: string;
  industry: Industry; // Use Industry type
  jobType: JobType;
  experienceLevel: ExperienceLevel;
  postedDate: string; 
  logoUrl?: string;
  isFeatured?: boolean; // For featured jobs/new jobs section
  salaryRange?: string; // For job card display
}

export type JobType = "Full-time" | "Part-time" | "Contract" | "Internship" | "Freelance";
export type ExperienceLevel = "Entry" | "Mid-level" | "Senior" | "Lead" | "Manager";

export const industries = ["Technology", "Marketing", "Finance", "Healthcare", "Engineering", "Education", "Sales", "Design", "Customer Service", "Delivery", "HR", "Accounting", "Other"] as const;
export type Industry = typeof industries[number];

export const jobTypes: JobType[] = ["Full-time", "Part-time", "Contract", "Internship", "Freelance"];
export const experienceLevels: ExperienceLevel[] = ["Entry", "Mid-level", "Senior", "Lead", "Manager"];

export interface Filters {
  industry: Industry | "";
  jobType: JobType | "";
  experienceLevel: ExperienceLevel | "";
  companySearch: string;
  // For hero search
  category: Industry | ""; 
  location: string;
  keywords: string;
}

export interface Category {
  id: string;
  name: Industry;
  jobCount: number;
  imageUrl: string;
  aiHint: string;
}

export interface Employer {
  id: string;
  name: string;
  logoUrl: string;
  aiHint: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  authorName: string;
  authorTitle: string;
  avatarUrl: string;
  aiHint: string;
}
