'use client';

import { ReactNode } from 'react';
import { Card } from '@/components/ui/card';

interface AnimatedCardProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function AnimatedCard({ children, className = '' }: AnimatedCardProps) {
  return (
    <div className={className}>
      <Card className="h-full hover:shadow-lg transition-shadow">
        {children}
      </Card>
    </div>
  );
}
