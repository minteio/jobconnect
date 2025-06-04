
import type React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { industries, jobTypes, experienceLevels } from '@/types';
import type { Filters, Industry, JobType, ExperienceLevel } from '@/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { FilterX } from 'lucide-react';

interface JobFiltersProps {
  filters: Filters;
  onFilterChange: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
  onResetFilters: () => void;
}

const ALL_INDUSTRIES_SELECT_VALUE = "__ALL_INDUSTRIES__";
const ALL_EXPERIENCE_LEVELS_SELECT_VALUE = "__ALL_EXPERIENCE_LEVELS__";

const JobFilters: React.FC<JobFiltersProps> = ({ filters, onFilterChange, onResetFilters }) => {
  return (
    <ScrollArea className="h-full p-4">
      <div className="space-y-6">
        <div>
          <Label htmlFor="industry-filter" className="text-sm font-medium">Industry</Label>
          <Select
            value={filters.industry === "" ? ALL_INDUSTRIES_SELECT_VALUE : filters.industry}
            onValueChange={(value: string) => {
              if (value === ALL_INDUSTRIES_SELECT_VALUE) {
                onFilterChange('industry', "");
              } else {
                onFilterChange('industry', value as Industry);
              }
            }}
          >
            <SelectTrigger id="industry-filter" className="mt-1">
              <SelectValue placeholder="All Industries" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_INDUSTRIES_SELECT_VALUE}>All Industries</SelectItem>
              {industries.map((industry) => (
                <SelectItem key={industry} value={industry}>
                  {industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator />

        <div>
          <Label className="text-sm font-medium">Job Type</Label>
          <RadioGroup
            value={filters.jobType}
            onValueChange={(value: JobType | "") => onFilterChange('jobType', value)}
            className="mt-2 space-y-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="" id="jt-all" />
              <Label htmlFor="jt-all" className="font-normal">All Types</Label>
            </div>
            {jobTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <RadioGroupItem value={type} id={`jt-${type}`} />
                <Label htmlFor={`jt-${type}`} className="font-normal">{type}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <Separator />

        <div>
          <Label htmlFor="experience-filter" className="text-sm font-medium">Experience Level</Label>
          <Select
            value={filters.experienceLevel === "" ? ALL_EXPERIENCE_LEVELS_SELECT_VALUE : filters.experienceLevel}
            onValueChange={(value: string) => {
              if (value === ALL_EXPERIENCE_LEVELS_SELECT_VALUE) {
                onFilterChange('experienceLevel', "");
              } else {
                onFilterChange('experienceLevel', value as ExperienceLevel);
              }
            }}
          >
            <SelectTrigger id="experience-filter" className="mt-1">
              <SelectValue placeholder="All Levels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_EXPERIENCE_LEVELS_SELECT_VALUE}>All Levels</SelectItem>
              {experienceLevels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Separator />

        <div>
          <Label htmlFor="company-search-filter" className="text-sm font-medium">Company Name</Label>
          <Input
            id="company-search-filter"
            type="text"
            placeholder="Search by company"
            value={filters.companySearch}
            onChange={(e) => onFilterChange('companySearch', e.target.value)}
            className="mt-1"
          />
        </div>
        
        <Separator />

        <Button onClick={onResetFilters} variant="outline" className="w-full">
          <FilterX className="mr-2 h-4 w-4" />
          Reset Filters
        </Button>
      </div>
    </ScrollArea>
  );
};

export default JobFilters;
