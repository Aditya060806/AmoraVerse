
import React from 'react';
import { Heart, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImagePreviewProps {
  src: string;
  alt: string;
  isProcessing?: boolean;
  processingText?: string;
  onRemove?: () => void;
  className?: string;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  src,
  alt,
  isProcessing = false,
  processingText = "Processing...",
  onRemove,
  className = ""
}) => {
  return (
    <div className={`relative inline-block rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden shadow-love group ${className}`}>
      <img 
        src={src} 
        alt={alt} 
        className="w-24 h-24 xs:w-28 xs:h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 object-cover transition-transform duration-200 group-hover:scale-105"
      />
      
      {/* Processing overlay */}
      {isProcessing && (
        <div className="absolute inset-0 bg-primary/20 backdrop-blur-sm flex items-center justify-center">
          <div className="text-center text-white">
            <Heart className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 animate-pulse-love mx-auto mb-1 sm:mb-2" />
            <p className="font-soft text-xs sm:text-sm px-1 sm:px-2">{processingText}</p>
          </div>
        </div>
      )}

      {/* Remove button */}
      {onRemove && !isProcessing && (
        <Button
          variant="destructive"
          size="sm"
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          onClick={onRemove}
          aria-label="Remove image"
        >
          <X className="w-3 h-3" />
        </Button>
      )}
    </div>
  );
};
