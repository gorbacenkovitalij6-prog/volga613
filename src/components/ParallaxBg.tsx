'use client';

interface ParallaxBgProps {
  imageUrl: string;
  opacity?: number;
}

export default function ParallaxBg({ imageUrl, opacity = 0.2 }: ParallaxBgProps) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url(${imageUrl})`,
          opacity: opacity
        }}
      />
    </div>
  );
}
