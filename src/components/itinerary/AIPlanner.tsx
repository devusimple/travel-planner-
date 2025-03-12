import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Loader2,
  MapPin,
  Calendar,
  Brain,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import PreferencesForm from "./PreferencesForm";

interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  image: string;
  tags: string[];
}

interface ItineraryDay {
  day: number;
  destinations: Destination[];
  activities: string[];
}

interface AIRecommendation {
  destinations: Destination[];
  itinerary: ItineraryDay[];
}

interface AIPreferences {
  travelStyle: string;
  activities: string;
  cuisine: string;
  budget: number;
  duration: number;
}

interface AIPlanner {
  onAddToItinerary?: (recommendation: AIRecommendation) => void;
  isOpen?: boolean;
}

const AIPlanner = ({
  onAddToItinerary = () => {},
  isOpen = true,
}: AIPlanner) => {
  const [activeTab, setActiveTab] = useState("preferences");
  const [isGenerating, setIsGenerating] = useState(false);
  const [preferences, setPreferences] = useState<AIPreferences | null>(null);
  const [recommendation, setRecommendation] = useState<AIRecommendation | null>(
    null,
  );

  // Mock data for recommendations
  const mockDestinations: Destination[] = [
    {
      id: "1",
      name: "Kyoto",
      country: "Japan",
      description:
        "Ancient temples, traditional gardens, and cultural experiences in Japan's former capital.",
      image:
        "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80",
      tags: ["cultural", "historical", "temples"],
    },
    {
      id: "2",
      name: "Hakone",
      country: "Japan",
      description:
        "Hot springs resort town with views of Mount Fuji and Lake Ashi.",
      image:
        "https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=600&q=80",
      tags: ["nature", "hot springs", "relaxation"],
    },
    {
      id: "3",
      name: "Tokyo",
      country: "Japan",
      description:
        "Ultramodern metropolis with historic temples, shopping districts, and vibrant nightlife.",
      image:
        "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=600&q=80",
      tags: ["urban", "shopping", "nightlife"],
    },
  ];

  const mockItinerary: ItineraryDay[] = [
    {
      day: 1,
      destinations: [mockDestinations[2]],
      activities: [
        "Arrive in Tokyo",
        "Check-in at hotel",
        "Visit Shibuya Crossing",
        "Dinner at local izakaya",
      ],
    },
    {
      day: 2,
      destinations: [mockDestinations[2]],
      activities: [
        "Morning visit to Tsukiji Outer Market",
        "Explore Asakusa and Senso-ji Temple",
        "Afternoon in Akihabara",
        "Tokyo Tower at sunset",
      ],
    },
    {
      day: 3,
      destinations: [mockDestinations[0]],
      activities: [
        "Bullet train to Kyoto",
        "Check-in at ryokan",
        "Afternoon visit to Kinkaku-ji (Golden Pavilion)",
        "Evening stroll in Gion district",
      ],
    },
    {
      day: 4,
      destinations: [mockDestinations[0]],
      activities: [
        "Full day exploring Arashiyama area",
        "Bamboo Grove",
        "Monkey Park",
        "Traditional kaiseki dinner",
      ],
    },
    {
      day: 5,
      destinations: [mockDestinations[1]],
      activities: [
        "Travel to Hakone",
        "Check-in at onsen resort",
        "Lake Ashi cruise",
        "Relax in hot springs",
      ],
    },
    {
      day: 6,
      destinations: [mockDestinations[1]],
      activities: [
        "Hakone Open Air Museum",
        "Hakone Shrine",
        "Owakudani volcanic valley",
        "Final night in onsen",
      ],
    },
    {
      day: 7,
      destinations: [mockDestinations[2]],
      activities: [
        "Return to Tokyo",
        "Last-minute shopping",
        "Farewell dinner",
        "Prepare for departure",
      ],
    },
  ];

  const handleFormSubmit = (values: AIPreferences) => {
    setPreferences(values);
    setIsGenerating(true);
    setActiveTab("generating");

    // Simulate AI generation delay
    setTimeout(() => {
      setRecommendation({
        destinations: mockDestinations,
        itinerary: mockItinerary.slice(0, values.duration),
      });
      setIsGenerating(false);
      setActiveTab("recommendation");
    }, 3000);
  };

  const handleAddToItinerary = () => {
    if (recommendation) {
      onAddToItinerary(recommendation);
    }
  };

  return (
    <div className="w-full h-full bg-white rounded-lg shadow-md overflow-hidden">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="preferences" disabled={isGenerating}>
            Preferences
          </TabsTrigger>
          <TabsTrigger
            value="generating"
            disabled={!isGenerating && activeTab !== "generating"}
          >
            Generating
          </TabsTrigger>
          <TabsTrigger value="recommendation" disabled={!recommendation}>
            Recommendation
          </TabsTrigger>
        </TabsList>

        <TabsContent value="preferences" className="p-4">
          <PreferencesForm onSubmit={handleFormSubmit} />
        </TabsContent>

        <TabsContent value="generating" className="p-6">
          <div className="flex flex-col items-center justify-center h-64">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="mb-4"
            >
              <Loader2 size={48} className="text-primary" />
            </motion.div>
            <h3 className="text-xl font-semibold mb-2">
              AI is crafting your perfect journey
            </h3>
            <p className="text-gray-500 text-center max-w-md">
              Our AI is analyzing thousands of destinations, reviews, and travel
              patterns to create your personalized itinerary.
            </p>
          </div>
        </TabsContent>

        <TabsContent
          value="recommendation"
          className="p-4 overflow-y-auto max-h-[500px]"
        >
          <AnimatePresence>
            {recommendation && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="h-5 w-5 text-amber-500" />
                  <h3 className="text-lg font-semibold">
                    AI-Generated Travel Plan
                  </h3>
                </div>

                <div className="mb-6">
                  <h4 className="text-md font-medium mb-2">
                    Recommended Destinations
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {recommendation.destinations.map((destination) => (
                      <Card key={destination.id} className="overflow-hidden">
                        <div className="h-32 overflow-hidden">
                          <img
                            src={destination.image}
                            alt={destination.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardHeader className="p-3 pb-0">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-base">
                                {destination.name}
                              </CardTitle>
                              <CardDescription className="text-xs">
                                {destination.country}
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="p-3 pt-2">
                          <div className="flex flex-wrap gap-1 mb-2">
                            {destination.tags.map((tag) => (
                              <Badge
                                key={tag}
                                variant="outline"
                                className="text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-md font-medium mb-2">
                    Suggested Itinerary
                  </h4>
                  <div className="space-y-4">
                    {recommendation.itinerary.map((day) => (
                      <Card
                        key={day.day}
                        className="border-l-4 border-l-primary"
                      >
                        <CardHeader className="p-3 pb-2">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-primary" />
                            <CardTitle className="text-base">
                              Day {day.day}
                            </CardTitle>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <MapPin className="h-3 w-3" />
                            {day.destinations.map((d) => d.name).join(", ")}
                          </div>
                        </CardHeader>
                        <CardContent className="p-3 pt-0">
                          <ul className="text-sm space-y-1">
                            {day.activities.map((activity, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-primary">•</span>
                                <span>{activity}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <Separator className="mb-6" />
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Brain className="h-5 w-5 text-primary" />
                      <span className="text-sm">
                        AI-optimized for your preferences
                      </span>
                    </div>
                    <Button onClick={handleAddToItinerary} className="gap-2">
                      Add to Itinerary <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIPlanner;
