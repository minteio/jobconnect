
export interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  snippet: string;
  jobUrl: string;
  industry: string;
  jobType: JobType;
  experienceLevel: ExperienceLevel;
  postedDate: string; // Could be Date object if preferred
  logoUrl?: string; // Optional company logo
}

export type JobType = "Full-time" | "Part-time" | "Contract" | "Internship";
export type ExperienceLevel = "Entry" | "Mid-level" | "Senior" | "Lead" | "Manager";

export const industries = ["Technology", "Marketing", "Finance", "Healthcare", "Engineering", "Education", "Sales", "Other"] as const;
export type Industry = typeof industries[number];

export const jobTypes: JobType[] = ["Full-time", "Part-time", "Contract", "Internship"];
export const experienceLevels: ExperienceLevel[] = ["Entry", "Mid-level", "Senior", "Lead", "Manager"];

export interface Filters {
  industry: Industry | "";
  jobType: JobType | "";
  experienceLevel: ExperienceLevel | "";
  companySearch: string;
}
