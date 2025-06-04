
import type { JobListing, Industry, JobType, ExperienceLevel, Category, Employer, Testimonial, RecruiterProfile, JobReview, SimilarJobSidebarItem } from '@/types';

export const mockRecruiters: RecruiterProfile[] = [
  {
    name: 'Robert McLean',
    title: 'HR Recruiter at Network Pvt ltd',
    memberSince: 'November 2018',
    avatarUrl: 'https://placehold.co/80x80.png',
    email: 'robert123@gmail.com',
    phone: '0-255-657-24587',
    website: 'http://spiruko.com/',
    aiHint: 'professional recruiter'
  },
  {
    name: 'Jane Doe',
    title: 'Talent Acquisition Lead',
    memberSince: 'June 2019',
    avatarUrl: 'https://placehold.co/80x80.png',
    aiHint: 'friendly professional'
  }
];

export const mockReviews: JobReview[] = [
  {
    id: 'review1',
    author: { name: 'Joanne Scott', avatarUrl: 'https://placehold.co/40x40.png', aiHint: 'female user' },
    rating: 4,
    date: 'Dec 21st, 08:12:30',
    comment: 'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue.'
  },
  {
    id: 'review2',
    author: { name: 'Edward', avatarUrl: 'https://placehold.co/40x40.png', aiHint: 'male user' },
    rating: 5,
    date: 'Dec 20th, 10:25:00',
    comment: 'A very good opportunity for those looking to advance their career. The company culture is great and the team is supportive.'
  }
];

export const mockJobs: JobListing[] = [
  {
    id: '1',
    title: 'Hard ware Technician',
    company: 'Network Pvt ltd',
    location: 'USA', // Simplified to match image
    snippet: 'Seeking an experienced Hardware Technician to manage and maintain hardware systems.',
    fullDescription: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.\n\nOn the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain.',
    jobUrl: 'https://example.com/job/1/apply',
    industry: 'Technology',
    jobType: 'Full-time',
    experienceLevel: 'Mid-level', // Generic, specific exp in max/min
    minExperience: '1yr',
    maxExperience: '2yrs',
    postedDate: '2023-12-25', // To match "Posted By Company / 25th Dec 2018" (year updated)
    logoUrl: 'https://placehold.co/100x100.png', // Placeholder for swirl logo
    isFeatured: true,
    isUrgent: true,
    minSalary: '$12,000',
    maxSalary: '$15,000',
    languages: ['English', 'Hindi'],
    locality: 'USA, UK, India',
    eligibility: 'Any Graduate',
    companyInfo: 'Acme Corporation pvt ltd',
    views: 765,
    postedByRecruiter: mockRecruiters[0],
    skills: ['Software', 'Hardware & Network', 'Job In USA'],
    reviews: mockReviews,
    ratingStats: [
      { rating: 5, count: 6550, percentage: 70 },
      { rating: 4, count: 7502, percentage: 80 },
      { rating: 3, count: 5524, percentage: 60 },
      { rating: 2, count: 465, percentage: 30 },
      { rating: 1, count: 128, percentage: 10 },
    ],
  },
  {
    id: '2',
    title: 'Digital Marketing Specialist',
    company: 'Connect Ethiopia',
    location: 'Addis Ababa',
    snippet: 'Join our marketing team to manage digital campaigns, SEO/SEM, and social media presence. Proven experience required.',
    fullDescription: 'Connect Ethiopia is expanding its marketing efforts and seeks a Digital Marketing Specialist. You will be responsible for planning and executing all digital marketing, including SEO/SEM, marketing database, email, social media, and display advertising campaigns. Measuring and reporting on the performance of all digital marketing campaigns is key. Requirements: 3+ years of digital marketing experience. Demonstrable experience leading and managing SEO/SEM, marketing database, email, social media and/or display advertising campaigns.',
    jobUrl: 'https://example.com/job/2/apply',
    industry: 'Marketing',
    jobType: 'Full-time',
    experienceLevel: 'Mid-level',
    postedDate: '2024-07-18',
    logoUrl: 'https://placehold.co/100x100.png',
    salaryRange: '$1500-$2500',
    views: 320,
    postedByRecruiter: mockRecruiters[1],
    skills: ['SEO', 'Social Media', 'Campaign Management'],
    reviews: [mockReviews[0]],
     ratingStats: [
      { rating: 5, count: 150, percentage: 60 },
      { rating: 4, count: 80, percentage: 30 },
      { rating: 3, count: 20, percentage: 10 },
      { rating: 2, count: 5, percentage: 5 },
      { rating: 1, count: 2, percentage: 2 },
    ],
  },
  {
    id: 'related1',
    title: 'Accountant Jobs',
    company: 'Sally Peake',
    location: 'Los Angeles',
    snippet: 'Urgent hiring for accountant jobs.',
    fullDescription: 'Detailed description for Accountant Jobs.',
    jobUrl: 'https://example.com/job/related1/apply',
    industry: 'Finance',
    jobType: 'Full-time',
    experienceLevel: 'Mid-level',
    postedDate: '2024-07-20',
    logoUrl: 'https://placehold.co/400x300.png',
    aiHint: 'woman working office',
    isFeatured: true, // For the "Featured" banner in related posts
    salaryRange: '$925', // Simplified for card display
  },
  {
    id: 'related2',
    title: 'Data Entry Jobs',
    company: 'Sally Peake',
    location: 'Los Angeles',
    snippet: 'Part-time data entry positions available.',
    fullDescription: 'Detailed description for Data Entry Jobs.',
    jobUrl: 'https://example.com/job/related2/apply',
    industry: 'Technology',
    jobType: 'Part-time',
    experienceLevel: 'Entry',
    postedDate: '2024-07-22',
    logoUrl: 'https://placehold.co/400x300.png',
    aiHint: 'people working computers',
    salaryRange: '$378', // Simplified for card display
  },
  // Add more mock jobs if needed
];

export const EthiopianMajorCities = [
  "Addis Ababa",
  "Adama",
  "Hawassa",
  "Bahir Dar",
  "Dire Dawa",
  "Gondar",
  "Mekelle",
  "Jimma",
  "Dessie",
  "Jijiga"
];

export const mockCategories: Category[] = [
  { id: 'cat1', name: 'Technology', jobCount: 3458, imageUrl: 'https://placehold.co/400x300.png', aiHint: 'laptop code' },
  { id: 'cat2', name: 'Customer Service', jobCount: 2354, imageUrl: 'https://placehold.co/400x300.png', aiHint: 'headset support' },
  { id: 'cat3', name: 'Delivery', jobCount: 1547, imageUrl: 'https://placehold.co/400x300.png', aiHint: 'delivery van' },
  { id: 'cat4', name: 'Marketing', jobCount: 1785, imageUrl: 'https://placehold.co/400x300.png', aiHint: 'marketing chart' },
  { id: 'cat5', name: 'HR', jobCount: 1754, imageUrl: 'https://placehold.co/400x300.png', aiHint: 'team meeting' },
  { id: 'cat6', name: 'Healthcare', jobCount: 3457, imageUrl: 'https://placehold.co/400x300.png', aiHint: 'doctor nurse' },
  { id: 'cat7', name: 'Accounting', jobCount: 6475, imageUrl: 'https://placehold.co/400x300.png', aiHint: 'calculator ledger' },
  { id: 'cat8', name: 'Design', jobCount: 1200, imageUrl: 'https://placehold.co/400x300.png', aiHint: 'design tools' },
];

export const mockEmployers: Employer[] = [
  { id: 'emp1', name: 'Tanner Fultzke', logoUrl: 'https://placehold.co/100x100.png', aiHint: 'professional portrait' },
  { id: 'emp2', name: 'Shela Boyko', logoUrl: 'https://placehold.co/100x100.png', aiHint: 'professional portrait' },
  { id: 'emp3', name: 'Tod Uli', logoUrl: 'https://placehold.co/100x100.png', aiHint: 'professional portrait' },
  { id: 'emp4', name: 'Catherina Shoof', logoUrl: 'https://placehold.co/100x100.png', aiHint: 'professional portrait' },
  { id: 'emp5', name: 'Rejoin', logoUrl: 'https://placehold.co/150x50.png', aiHint: 'company logo' },
];

export const mockTestimonials: Testimonial[] = [
  {
    id: 'test1',
    quote: 'EthioJobsConnect helped me find my dream job in just a week! The platform is user-friendly and has a vast number of opportunities.',
    authorName: 'Abebe Kebede',
    authorTitle: 'Software Engineer at Tech Solutions PLC',
    avatarUrl: 'https://placehold.co/80x80.png',
    aiHint: 'happy person'
  },
  {
    id: 'test2',
    quote: 'As a recruiter, EthioJobsConnect has been invaluable. We found highly qualified candidates quickly and efficiently.',
    authorName: 'Fatuma Ahmed',
    authorTitle: 'HR Manager at Connect Ethiopia',
    avatarUrl: 'https://placehold.co/80x80.png',
    aiHint: 'professional recruiter'
  },
];

export const mockRelatedJobs: JobListing[] = mockJobs.filter(job => ['related1', 'related2'].includes(job.id));


export const mockSimilarJobsSidebar: SimilarJobSidebarItem[] = [
    {id: 'related1', title: 'Accountant Jobs', company: 'Sally Peake', location: 'Los Angeles'},
    {id: 'related2', title: 'Data Entry Jobs', company: 'Sally Peake', location: 'Los Angeles'},
    // Example: if you had a job with ID '1' you wanted to show as similar
    // {id: '1', title: 'Hard ware Technician', company: 'Network Pvt ltd', location: 'USA'},
];

