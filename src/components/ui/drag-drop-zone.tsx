
import React, { useCallback, useState } from 'react';
import { Upload, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DragDropZoneProps {
  onFileSelect: (file: File) => void;
  isProcessing?: boolean;
  acceptedFileTypes?: string;
  maxFileSize?: string;
  children?: React.ReactNode;
  className?: string;
}

export const DragDropZone: React.FC<DragDropZoneProps> = ({
  onFileSelect,
  isProcessing = false,
  acceptedFileTypes = "JPEG, PNG, GIF, WebP",
  maxFileSize = "10MB",
  children,
  className
}) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [dragError, setDragError] = useState<string | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
      setDragError(null);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    setDragError(null);

    if (isProcessing) return;

    const files = Array.from(e.dataTransfer.files);
    
    if (files.length === 0) {
      setDragError("No files were dropped");
      return;
    }

    if (files.length > 1) {
      setDragError("Please drop only one file at a time");
      return;
    }

    const file = files[0];
    onFileSelect(file);
  }, [onFileSelect, isProcessing]);

  return (
    <div
      className={cn(
        "relative transition-all duration-300 border-2 border-dashed rounded-lg",
        isDragActive 
          ? "border-primary bg-primary/5 scale-105" 
          : "border-primary/20 hover:border-primary/40",
        isProcessing && "opacity-50 cursor-not-allowed",
        className
      )}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      {children}
      
      {/* Drag overlay */}
      {isDragActive && (
        <div className="absolute inset-0 bg-primary/10 border-2 border-dashed border-primary rounded-lg flex items-center justify-center pointer-events-none z-10">
          <div className="text-center">
            <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-primary mx-auto mb-2" />
            <p className="text-primary font-soft text-xs sm:text-sm font-medium">
              Drop your photo here
            </p>
          </div>
        </div>
      )}

      {/* Error display */}
      {dragError && (
        <div className="absolute -bottom-8 left-0 right-0 flex items-center justify-center">
          <div className="flex items-center text-destructive text-xs bg-destructive/10 px-2 py-1 rounded">
            <AlertCircle className="w-3 h-3 mr-1" />
            {dragError}
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="absolute -bottom-12 left-0 right-0 text-center">
        <p className="text-xs text-muted-foreground/70 font-soft">
          Support: {acceptedFileTypes} • Max size: {maxFileSize} • Drag & drop supported
        </p>
      </div>
    </div>
  );
};
