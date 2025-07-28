
import React, { useState, useCallback, useRef } from 'react';
import { Upload, Camera, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DragDropZone } from '@/components/ui/drag-drop-zone';
import { ImagePreview } from '@/components/ui/image-preview';
import { ErrorDisplay } from '@/components/ui/error-display';
import { useToast } from '@/hooks/use-toast';
import { useAIPoetry } from '@/hooks/useAIPoetry';
import { useLoveVault } from '@/hooks/useLoveVault';
import { validateImageFile, formatFileSize } from '@/utils/fileValidation';

interface PhotoUploadProps {
  onPhotoAnalyzed: (analysis: string) => void;
}

export const PhotoUpload: React.FC<PhotoUploadProps> = ({ onPhotoAnalyzed }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();
  const { analyzePhotoForPoetry } = useAIPoetry();
  const { savePoem } = useLoveVault();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback(async (file: File) => {
    setUploadError(null);
    
    const validation = validateImageFile(file);
    if (!validation.isValid) {
      setUploadError(validation.error!);
      toast({
        title: "Upload Error",
        description: validation.error,
        variant: "destructive"
      });
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl);
    setSelectedFile(file);
    setIsAnalyzing(true);

    try {
      const analysisPrompts = [
        `A tender moment captured between two souls, where love speaks louder than words. The gentle light dances across their faces, creating poetry in motion. This image whispers of stolen glances, shared dreams, and a love that feels infinite and timeless.`,
        `In this frame, emotions bloom like flowers in spring. The soft interplay of light and shadow tells a story of hearts intertwined, of moments too precious for words. Love lives in the quiet spaces between smiles.`,
        `Time stands still in this captured embrace of hearts. The warmth radiating from this scene speaks of promises kept and dreams shared. Every pixel holds a universe of affection, painted in hues of forever.`,
        `Here lives a love story written in gestures and glances. The atmosphere itself seems to shimmer with romance, as if the very air holds the weight of whispered secrets and gentle promises.`,
        `This image breathes with the rhythm of two hearts beating as one. In the gentle composition of light and love, we see poetry in motion—a visual sonnet of souls connected beyond words.`
      ];

      const randomAnalysis = analysisPrompts[Math.floor(Math.random() * analysisPrompts.length)];
      const generatedPoem = await analyzePhotoForPoetry(randomAnalysis);
      
      savePoem(generatedPoem, 'Image', {
        title: 'From a Cherished Photo',
        associatedImage: imageUrl,
        tags: ['photo', 'memory', 'moment']
      });
      
      onPhotoAnalyzed(generatedPoem);
      
      toast({
        title: "📸 Photo transformed into poetry!",
        description: "Your precious moment has become beautiful verse...",
        duration: 4000,
      });
    } catch (error) {
      console.error('Photo analysis error:', error);
      setUploadError("Could not analyze the photo. Please try again.");
      toast({
        title: "Analysis Error",
        description: "Could not analyze the photo. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  }, [onPhotoAnalyzed, toast, analyzePhotoForPoetry, savePoem]);

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    await processFile(file);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [processFile]);

  const handleButtonClick = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  const handleRemoveImage = useCallback(() => {
    setUploadedImage(null);
    setSelectedFile(null);
    setUploadError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  const handleRetry = useCallback(() => {
    if (selectedFile) {
      processFile(selectedFile);
    }
  }, [selectedFile, processFile]);

  return (
    <Card className="romance-card p-3 sm:p-4 md:p-6 lg:p-8 text-center relative overflow-hidden">
      <div className="floating-hearts absolute top-2 right-2 sm:top-4 sm:right-4"></div>
      
      <div className="mb-3 sm:mb-4 md:mb-6">
        <div className="flex justify-center mb-2 sm:mb-3 md:mb-4">
          <div className="relative">
            <Camera className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-primary animate-pulse-love" />
            <Sparkles className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 text-accent absolute -top-0.5 sm:-top-1 -right-0.5 sm:-right-1 animate-float-heart" />
          </div>
        </div>
        
        <h3 className="text-lg sm:text-xl md:text-2xl font-elegant font-semibold text-primary mb-1 sm:mb-2">
          Generate from Photo
        </h3>
        <p className="text-xs sm:text-sm md:text-base text-muted-foreground font-soft px-1 sm:px-2 md:px-0">
          Upload a cherished photo and let AI weave poetry from your memories
        </p>
      </div>

      {/* Error Display */}
      {uploadError && (
        <div className="mb-3 sm:mb-4">
          <ErrorDisplay error={uploadError} onRetry={handleRetry} />
        </div>
      )}

      {/* Image Preview */}
      {uploadedImage && (
        <div className="mb-3 sm:mb-4 md:mb-6">
          <ImagePreview 
            src={uploadedImage}
            alt="Uploaded memory for poetry generation"
            isProcessing={isAnalyzing}
            processingText="Interpreting your love..."
            onRemove={handleRemoveImage}
          />
          {selectedFile && (
            <p className="text-xs text-muted-foreground mt-2 font-soft">
              {selectedFile.name} ({formatFileSize(selectedFile.size)})
            </p>
          )}
        </div>
      )}

      {/* Enhanced Upload Area */}
      <DragDropZone
        onFileSelect={processFile}
        isProcessing={isAnalyzing}
        className="mb-8"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="sr-only"
          disabled={isAnalyzing}
          aria-describedby="upload-description"
          id="photo-upload-input"
        />

        <Button 
          variant="love" 
          size="lg"
          className="w-full relative overflow-hidden text-xs sm:text-sm md:text-base h-12 sm:h-14 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          disabled={isAnalyzing}
          onClick={handleButtonClick}
          aria-describedby="upload-description"
          aria-label={isAnalyzing ? "Creating poetry from your photo" : "Upload a photo to generate poetry"}
        >
          <Upload className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 sm:mr-2" />
          <span className="hidden md:inline">
            {isAnalyzing ? 'Crafting poetry from your moment...' : 'Upload Your Love Story'}
          </span>
          <span className="hidden sm:inline md:hidden">
            {isAnalyzing ? 'Creating poetry...' : 'Upload Love Story'}
          </span>
          <span className="sm:hidden">
            {isAnalyzing ? 'Creating...' : 'Upload'}
          </span>
        </Button>
      </DragDropZone>

      <div className="mt-2 sm:mt-3 md:mt-4">
        <p 
          id="upload-description" 
          className="text-xs text-muted-foreground font-soft italic px-1 sm:px-2 md:px-0"
        >
          "Every photo holds a thousand unspoken words"
        </p>
      </div>
    </Card>
  );
};
