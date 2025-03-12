import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Photo {
  id: string;
  url: string;
  alt: string;
  caption: string;
}

interface PhotoCarouselProps {
  photos?: Photo[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showCaptions?: boolean;
}

const PhotoCarousel = ({
  photos = [
    {
      id: "1",
      url: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=800&q=80",
      alt: "Santorini, Greece with white buildings and blue domes",
      caption: "Stunning views of Santorini, Greece",
    },
    {
      id: "2",
      url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80",
      alt: "Lush green mountains and waterfall in Hawaii",
      caption: "Tropical paradise in Hawaii",
    },
    {
      id: "3",
      url: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80",
      alt: "Venice canal with gondolas and historic buildings",
      caption: "Romantic canals of Venice, Italy",
    },
    {
      id: "4",
      url: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=80",
      alt: "Snowy mountain peaks in Switzerland",
      caption: "Majestic Swiss Alps",
    },
    {
      id: "5",
      url: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&q=80",
      alt: "Colorful buildings in Cinque Terre, Italy",
      caption: "Picturesque Cinque Terre coastline",
    },
  ],
  autoPlay = true,
  autoPlayInterval = 5000,
  showCaptions = true,
}: PhotoCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play functionality
  React.useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, photos.length]);

  return (
    <div className="w-full h-full bg-gray-100 rounded-lg overflow-hidden shadow-md">
      <Carousel className="w-full h-full">
        <CarouselContent>
          {photos.map((photo) => (
            <CarouselItem key={photo.id}>
              <div className="relative w-full h-full aspect-video">
                <img
                  src={photo.url}
                  alt={photo.alt}
                  className="w-full h-full object-cover rounded-lg"
                />
                {showCaptions && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-3 rounded-b-lg">
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-medium">{photo.caption}</p>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-white hover:bg-white/20"
                            >
                              <Info className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{photo.alt}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 bg-white/80 hover:bg-white" />
        <CarouselNext className="right-2 bg-white/80 hover:bg-white" />
      </Carousel>

      {/* Thumbnail navigation */}
      <div className="flex justify-center mt-2 gap-1 p-2">
        {photos.map((photo, index) => (
          <button
            key={photo.id}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? "bg-blue-600 w-4" : "bg-gray-300"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default PhotoCarousel;
