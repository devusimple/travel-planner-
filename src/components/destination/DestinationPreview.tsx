import React, { useState } from "react";
import { Heart, Share, ArrowLeft, MapPin, Calendar, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PhotoCarousel from "./PhotoCarousel";
import InfoCard from "./InfoCard";

interface DestinationPreviewProps {
  destination?: {
    id: string;
    name: string;
    country: string;
    description: string;
    location: string;
    bestTimeToVisit: string;
    averageDuration: string;
    costLevel: string;
    crowdLevel: string;
    localCuisine: string[];
    wifiAvailability: string;
    languages: string[];
    emergencyContact: string;
    attractions: string[];
    culturalNotes: string;
    photos: Array<{
      id: string;
      url: string;
      alt: string;
      caption: string;
    }>;
    tags: string[];
  };
  onClose?: () => void;
  onAddToItinerary?: () => void;
  isOpen?: boolean;
}

const DestinationPreview = ({
  destination = {
    id: "paris-123",
    name: "Paris",
    country: "France",
    description: "The City of Light, known for its art, culture, and cuisine.",
    location: "48.8566° N, 2.3522° E",
    bestTimeToVisit: "April to June, September to October",
    averageDuration: "4-5 days",
    costLevel: "High",
    crowdLevel: "High during summer, Moderate in spring/fall",
    localCuisine: [
      "Croissants",
      "Escargot",
      "Coq au Vin",
      "Macarons",
      "Crème Brûlée",
    ],
    wifiAvailability: "Widely available in hotels, cafes, and public spaces",
    languages: ["French", "English in tourist areas"],
    emergencyContact: "112 (European Emergency Number)",
    attractions: [
      "Eiffel Tower",
      "Louvre Museum",
      "Notre-Dame Cathedral",
      "Arc de Triomphe",
      "Seine River Cruise",
    ],
    culturalNotes:
      "The French appreciate when visitors attempt to speak French. Greet with 'Bonjour' during the day and 'Bonsoir' in the evening. Tipping is not required but appreciated for good service.",
    photos: [
      {
        id: "paris-1",
        url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
        alt: "Eiffel Tower in Paris with blue sky",
        caption: "Iconic Eiffel Tower",
      },
      {
        id: "paris-2",
        url: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80",
        alt: "Seine River with Notre-Dame Cathedral in the background",
        caption: "Seine River and Notre-Dame",
      },
      {
        id: "paris-3",
        url: "https://images.unsplash.com/photo-1520939817895-060bdaf4fe1b?w=800&q=80",
        alt: "Arc de Triomphe illuminated at night",
        caption: "Arc de Triomphe at night",
      },
      {
        id: "paris-4",
        url: "https://images.unsplash.com/photo-1550340499-a6c60fc8287c?w=800&q=80",
        alt: "Louvre Museum with glass pyramid",
        caption: "The Louvre Museum",
      },
      {
        id: "paris-5",
        url: "https://images.unsplash.com/photo-1551887196-72e32bfc7bf3?w=800&q=80",
        alt: "Parisian cafe with outdoor seating",
        caption: "Typical Parisian cafe",
      },
    ],
    tags: ["romantic", "cultural", "historical", "cuisine", "art"],
  },
  onClose = () => {},
  onAddToItinerary = () => {},
  isOpen = true,
}: DestinationPreviewProps) => {
  const [activeTab, setActiveTab] = useState("photos");
  const [isFavorite, setIsFavorite] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="w-full h-full bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
      {/* Header with back button and actions */}
      <div className="p-4 flex justify-between items-center border-b">
        <Button variant="ghost" size="icon" onClick={onClose}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1 text-center">
          <h2 className="text-xl font-bold">{destination.name}</h2>
          <div className="flex items-center justify-center gap-1 text-sm text-gray-500">
            <MapPin className="h-3 w-3" />
            <span>{destination.country}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart
              className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`}
            />
          </Button>
          <Button variant="ghost" size="icon">
            <Share className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Tags */}
      <div className="px-4 py-2 flex flex-wrap gap-1">
        {destination.tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="text-xs">
            {tag}
          </Badge>
        ))}
      </div>

      {/* Main content with tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex-1 flex flex-col overflow-hidden"
      >
        <TabsList className="px-4 pt-2 justify-start border-b rounded-none bg-transparent">
          <TabsTrigger
            value="photos"
            className="data-[state=active]:bg-blue-50"
          >
            Photos
          </TabsTrigger>
          <TabsTrigger value="info" className="data-[state=active]:bg-blue-50">
            Information
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 overflow-auto">
          <TabsContent value="photos" className="h-full mt-0 p-4">
            <PhotoCarousel photos={destination.photos} />
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">
                About {destination.name}
              </h3>
              <p className="text-gray-700">{destination.description}</p>
            </div>
          </TabsContent>

          <TabsContent value="info" className="h-full mt-0 p-4">
            <InfoCard
              title={`${destination.name}, ${destination.country}`}
              location={destination.location}
              bestTimeToVisit={destination.bestTimeToVisit}
              averageDuration={destination.averageDuration}
              costLevel={destination.costLevel}
              crowdLevel={destination.crowdLevel}
              localCuisine={destination.localCuisine}
              wifiAvailability={destination.wifiAvailability}
              languages={destination.languages}
              emergencyContact={destination.emergencyContact}
              attractions={destination.attractions}
              culturalNotes={destination.culturalNotes}
            />
          </TabsContent>
        </div>
      </Tabs>

      {/* Footer with add to itinerary button */}
      <div className="p-4 border-t">
        <Button
          onClick={onAddToItinerary}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        >
          <Plus className="h-4 w-4 mr-2" /> Add to Itinerary
        </Button>
      </div>
    </div>
  );
};

export default DestinationPreview;
