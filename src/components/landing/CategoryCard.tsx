
import type React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import type { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link href={`/?category=${encodeURIComponent(category.name)}`} className="group block">
      <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className="relative h-48 w-full">
          <Image
            src={category.imageUrl}
            alt={category.name}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={category.aiHint}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-4">
            <h3 className="text-lg font-semibold text-white font-headline">{category.name}</h3>
          </div>
        </div>
        <CardContent className="p-4 bg-card">
          <p className="text-sm text-muted-foreground">{category.jobCount} Jobs Available</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CategoryCard;
