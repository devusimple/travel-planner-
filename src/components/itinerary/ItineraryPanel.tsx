import React, { useState } from "react";
import { MapPin, Calendar, Clock, Plane, Settings } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

import ItineraryList from "./ItineraryList";
import AIPlanner from "./AIPlanner";

interface Destination {
  id: string;
  name: string;
  country: string;
  days: number;
  image: string;
  activities: string[];
}

interface AIRecommendation {
  destinations: {
    id: string;
    name: string;
    country: string;
    description: string;
    image: string;
    tags: string[];
  }[];
  itinerary: {
    day: number;
    destinations: {
      id: string;
      name: string;
      country: string;
      description: string;
      image: string;
      tags: string[];
    }[];
    activities: string[];
  }[];
}

interface ItineraryPanelProps {
  destinations?: Destination[];
  onAddDestination?: () => void;
  onRemoveDestination?: (id: string) => void;
  onReorderDestinations?: (destinations: Destination[]) => void;
  onSelectDestination?: (id: string) => void;
  isOpen?: boolean;
}

const ItineraryPanel = ({
  destinations = [
    {
      id: "1",
      name: "Paris",
      country: "France",
      days: 3,
      image:
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80",
      activities: ["Eiffel Tower", "Louvre Museum", "Notre Dame"],
    },
    {
      id: "2",
      name: "Rome",
      country: "Italy",
      days: 4,
      image:
        "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&q=80",
      activities: ["Colosseum", "Vatican City", "Trevi Fountain"],
    },
    {
      id: "3",
      name: "Barcelona",
      country: "Spain",
      days: 3,
      image:
        "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400&q=80",
      activities: ["Sagrada Familia", "Park Güell", "La Rambla"],
    },
  ],
  onAddDestination = () => {},
  onRemoveDestination = () => {},
  onReorderDestinations = () => {},
  onSelectDestination = () => {},
  isOpen = true,
}: ItineraryPanelProps) => {
  const [activeTab, setActiveTab] = useState("itinerary");
  const [localDestinations, setLocalDestinations] =
    useState<Destination[]>(destinations);

  const handleReorderDestinations = (reorderedDestinations: Destination[]) => {
    setLocalDestinations(reorderedDestinations);
    onReorderDestinations(reorderedDestinations);
  };

  const handleAddAIRecommendation = (recommendation: AIRecommendation) => {
    // Convert AI recommendation to destinations format
    const newDestinations = recommendation.itinerary.map((day) => {
      const destination = day.destinations[0]; // Assuming one destination per day for simplicity
      return {
        id: destination.id,
        name: destination.name,
        country: destination.country,
        days: 1, // Default to 1 day per destination
        image: destination.image,
        activities: day.activities.slice(0, 3), // Take first 3 activities
      };
    });

    // Add new destinations to the existing ones
    const updatedDestinations = [...localDestinations, ...newDestinations];
    setLocalDestinations(updatedDestinations);
    onReorderDestinations(updatedDestinations);

    // Switch to itinerary tab to show the updated list
    setActiveTab("itinerary");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <CardHeader className="pb-2 pt-4 px-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <Plane className="h-5 w-5 text-blue-500" />
            Travel Itinerary
          </CardTitle>
          <Button variant="ghost" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-4">
            <TabsList className="w-full grid grid-cols-2 mb-4">
              <TabsTrigger
                value="itinerary"
                className="flex items-center gap-1"
              >
                <Calendar className="h-4 w-4" /> Itinerary
              </TabsTrigger>
              <TabsTrigger
                value="ai-planner"
                className="flex items-center gap-1"
              >
                <Clock className="h-4 w-4" /> AI Planner
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="itinerary" className="mt-0 px-4 pb-4">
            <ItineraryList
              destinations={localDestinations}
              onReorder={handleReorderDestinations}
              onRemove={onRemoveDestination}
              onSelect={onSelectDestination}
              onAdd={onAddDestination}
            />
          </TabsContent>

          <TabsContent value="ai-planner" className="mt-0 px-4 pb-4">
            <AIPlanner onAddToItinerary={handleAddAIRecommendation} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </motion.div>
  );
};

export default ItineraryPanel;
