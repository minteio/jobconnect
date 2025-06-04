
import type React from 'react';
import { Users, Briefcase, Building, Smile } from 'lucide-react'; // Assuming Happy Customers -> Smile

interface StatItemProps {
  icon: React.ElementType;
  count: string;
  label: string;
}

const StatItem: React.FC<StatItemProps> = ({ icon: Icon, count, label }) => (
  <div className="flex flex-col items-center text-center">
    <div className="bg-accent/20 text-accent rounded-full h-20 w-20 flex items-center justify-center mb-4">
      <Icon className="h-10 w-10" />
    </div>
    <p className="text-4xl font-bold text-white mb-1">{count}</p>
    <p className="text-md text-primary-foreground/80">{label}</p>
  </div>
);

const StatsSection: React.FC = () => {
  return (
    <section className="py-12 md:py-20 bg-primary">
       <div 
        className="absolute inset-0 opacity-10"
        style={{ 
          backgroundImage: "url('https://placehold.co/1920x300.png?text=')", // Placeholder for subtle background pattern
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
        data-ai-hint="geometric pattern"
      ></div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <StatItem icon={Users} count="2569+" label="Members" />
          <StatItem icon={Briefcase} count="1765+" label="Jobs" />
          <StatItem icon={Building} count="846+" label="Companies" />
          <StatItem icon={Smile} count="7253+" label="Happy Customers" />
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
