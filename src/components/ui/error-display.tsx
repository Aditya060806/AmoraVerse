
import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorDisplayProps {
  error: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  error,
  onRetry,
  className = ""
}) => {
  return (
    <div className={`p-3 sm:p-4 bg-destructive/10 border border-destructive/20 rounded-lg ${className}`}>
      <div className="flex items-start gap-2 sm:gap-3">
        <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-destructive mt-0.5 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-destructive text-xs sm:text-sm font-medium mb-1">
            Upload Error
          </p>
          <p className="text-destructive/80 text-xs sm:text-sm">
            {error}
          </p>
          {onRetry && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRetry}
              className="mt-2 h-8 text-xs border-destructive/20 hover:bg-destructive/10"
            >
              <RefreshCw className="w-3 h-3 mr-1" />
              Try Again
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
