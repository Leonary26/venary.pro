import { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
  priority?: boolean;
  width?: number;
  height?: number;
}

export function SafeImage({
  src,
  alt,
  className = '',
  fallbackTitle = 'VENARY',
  priority = false,
  width,
  height,
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-zinc-100 via-white to-red-50/60 border border-zinc-200 text-zinc-500 p-6 text-center ${className}`}
      >
        <ImageOff className="w-6 h-6 text-[#D91E2A] mb-2" aria-hidden="true" />
        <span className="font-display text-sm font-semibold text-zinc-800">
          {fallbackTitle}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding={priority ? 'sync' : 'async'}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
