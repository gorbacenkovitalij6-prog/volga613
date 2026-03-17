'use client';

import { ReactNode } from 'react';

interface ParallaxSectionProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export default function ParallaxSection({
  children,
  className = ''
}: ParallaxSectionProps) {
  return (
    <div className={`relative ${className}`}>
      {children}
    </div>
  );
}
