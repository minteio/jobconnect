
import type React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface AdSlotProps {
  type: 'leaderboard' | 'sidebar' | 'in-content';
  className?: string;
}

const AdSlot: React.FC<AdSlotProps> = ({ type, className }) => {
  let width = 'w-full';
  let height = 'h-24'; // Default for in-content
  let text = "Ad Slot - In-Content";

  if (type === 'leaderboard') {
    width = 'w-full md:w-[728px]';
    height = 'h-[90px]';
    text = "Ad Slot - Leaderboard (728x90)";
  } else if (type === 'sidebar') {
    width = 'w-full';
    height = 'h-[250px] md:h-[600px]';
    text = "Ad Slot - Sidebar";
  }

  return (
    <Card className={cn('my-4 flex items-center justify-center bg-secondary/50 border-dashed', width, height, className)}>
      <CardContent className="p-4 text-center">
        <p className="text-muted-foreground font-code">{text}</p>
      </CardContent>
    </Card>
  );
};

export default AdSlot;
