
export interface RecruiterProfile {
  name: string;
  title: string;
  memberSince: string;
  avatarUrl: string;
  email?: string;
  phone?: string;
  website?: string;
  aiHint?: string;
}

export interface JobReview {
  id: string;
  author: {
    name: string;
    avatarUrl: string;
    aiHint?: string;
  };
  rating: number; // 1-5
  date: string;
  comment: string;
}

export interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  snippet: string;
  fullDescription: string;
  jobUrl: string;
  industry: Industry;
  jobType: JobType;
  experienceLevel: ExperienceLevel; // e.g., 2yrs
  minExperience?: string; // for "Min Exp" field
  maxExperience?: string; // for "Max Exp" field
  postedDate: string;
  logoUrl?: string;
  isFeatured?: boolean;
  salaryRange?: string; // e.g. "$12,000 - $15,000"
  minSalary?: string; // e.g. $12,000
  maxSalary?: string; // e.g. $15,000
  languages?: string[]; // e.g. ["English", "Hindi"]
  locality?: string; // e.g. "USA, UK, India"
  eligibility?: string; // e.g. "Any Graduate"
  companyInfo?: string; // Short info about the company if different from main description
  views?: number;
  isUrgent?: boolean;
  postedByRecruiter?: RecruiterProfile;
  skills?: string[];
  reviews?: JobReview[];
  ratingStats?: { rating: number; count: number; percentage: number }[]; // For rating bars
}

export type JobType = "Full-time" | "Part-time" | "Contract" | "Internship" | "Freelance";
export type ExperienceLevel = "Entry" | "Mid-level" | "Senior" | "Lead" | "Manager" | string; // Allow string for "2yrs"

export const industries = ["Technology", "Marketing", "Finance", "Healthcare", "Engineering", "Education", "Sales", "Design", "Customer Service", "Delivery", "HR", "Accounting", "Other"] as const;
export type Industry = typeof industries[number];

export const jobTypes: JobType[] = ["Full-time", "Part-time", "Contract", "Internship", "Freelance"];
export const experienceLevels: ExperienceLevel[] = ["Entry", "Mid-level", "Senior", "Lead", "Manager"];

export interface Filters {
  industry: Industry | "";
  jobType: JobType | "";
  experienceLevel: ExperienceLevel | "";
  companySearch: string;
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

export interface SimilarJobSidebarItem {
  id: string;
  title: string;
  company: string;
  location: string;
}
