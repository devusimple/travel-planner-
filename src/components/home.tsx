import React, { useState } from "react";
import { motion } from "framer-motion";
import GlobeContainer from "./globe/GlobeContainer";
import DestinationPreview from "./destination/DestinationPreview";
import ItineraryPanel from "./itinerary/ItineraryPanel";
import ActionFooter from "./ActionFooter";

interface Destination {
  id: string;
  name: string;
  country: string;
  days: number;
  image: string;
  activities: string[];
}

interface Location {
  id: string;
  name: string;
  country: string;
  coordinates: [number, number];
  selected?: boolean;
}

const Home = () => {
  // State for selected location and destination preview
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(
    "1",
  );
  const [showDestinationPreview, setShowDestinationPreview] = useState(true);
  const [isModified, setIsModified] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  // Sample locations for the globe
  const [locations, setLocations] = useState<Location[]>([
    {
      id: "1",
      name: "Paris",
      country: "France",
      coordinates: [48.8566, 2.3522],
      selected: true,
    },
    {
      id: "2",
      name: "Tokyo",
      country: "Japan",
      coordinates: [35.6762, 139.6503],
    },
    {
      id: "3",
      name: "New York",
      country: "USA",
      coordinates: [40.7128, -74.006],
    },
  ]);

  // Sample paths between locations
  const [paths, setPaths] = useState([
    {
      id: "path-1-2",
      from: "1",
      to: "2",
      animated: true,
    },
  ]);

  // Sample destinations for the itinerary
  const [destinations, setDestinations] = useState<Destination[]>([
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
      name: "Tokyo",
      country: "Japan",
      days: 4,
      image:
        "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=400&q=80",
      activities: ["Tokyo Tower", "Shibuya Crossing", "Senso-ji Temple"],
    },
  ]);

  // Handle location selection on the globe
  const handleLocationSelect = (locationId: string) => {
    // Update selected location
    setLocations(
      locations.map((loc) => ({
        ...loc,
        selected: loc.id === locationId,
      })),
    );

    setSelectedLocationId(locationId);
    setShowDestinationPreview(true);
    setIsModified(true);
  };

  // Handle adding a destination to the itinerary
  const handleAddToItinerary = () => {
    // Find the selected location
    const selectedLocation = locations.find(
      (loc) => loc.id === selectedLocationId,
    );

    if (
      selectedLocation &&
      !destinations.some((dest) => dest.id === selectedLocation.id)
    ) {
      // Add the location as a destination if it's not already in the itinerary
      const newDestination: Destination = {
        id: selectedLocation.id,
        name: selectedLocation.name,
        country: selectedLocation.country,
        days: 3, // Default value
        image: `https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80`, // Placeholder
        activities: [
          "Explore the city",
          "Visit local attractions",
          "Try local cuisine",
        ],
      };

      setDestinations([...destinations, newDestination]);

      // Add a path from the last destination to the new one if there are existing destinations
      if (destinations.length > 0) {
        const lastDestination = destinations[destinations.length - 1];
        const newPath = {
          id: `path-${lastDestination.id}-${selectedLocation.id}`,
          from: lastDestination.id,
          to: selectedLocation.id,
          animated: true,
        };

        setPaths([...paths, newPath]);
      }

      setIsModified(true);
    }

    // Close the destination preview
    setShowDestinationPreview(false);
  };

  // Handle removing a destination from the itinerary
  const handleRemoveDestination = (id: string) => {
    setDestinations(destinations.filter((dest) => dest.id !== id));

    // Remove any paths connected to this destination
    setPaths(paths.filter((path) => path.from !== id && path.to !== id));

    setIsModified(true);
  };

  // Handle reordering destinations in the itinerary
  const handleReorderDestinations = (reorderedDestinations: Destination[]) => {
    setDestinations(reorderedDestinations);

    // Recreate paths based on the new order
    const newPaths = [];
    for (let i = 0; i < reorderedDestinations.length - 1; i++) {
      newPaths.push({
        id: `path-${reorderedDestinations[i].id}-${reorderedDestinations[i + 1].id}`,
        from: reorderedDestinations[i].id,
        to: reorderedDestinations[i + 1].id,
        animated: true,
      });
    }

    setPaths(newPaths);
    setIsModified(true);
  };

  // Handle location drop on the globe (for drag and drop functionality)
  const handleLocationDrop = (
    location: Location,
    coordinates: [number, number],
  ) => {
    setLocations(
      locations.map((loc) => {
        if (loc.id === location.id) {
          return { ...loc, coordinates };
        }
        return loc;
      }),
    );

    setIsModified(true);
  };

  // Handle saving the trip plan
  const handleSave = () => {
    // In a real app, this would save to a database
    console.log("Saving trip plan...", { locations, paths, destinations });
    setIsModified(false);
  };

  // Handle favoriting the trip plan
  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto py-4 px-4">
          <h1 className="text-2xl font-bold text-blue-600">
            3D Travel Planner
          </h1>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 container mx-auto p-4 flex flex-col lg:flex-row gap-4 mb-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full lg:w-2/3 flex flex-col gap-4"
        >
          {/* Globe container */}
          <div className="h-[600px] bg-white rounded-lg shadow-md overflow-hidden">
            <GlobeContainer
              locations={locations}
              paths={paths}
              onLocationSelect={handleLocationSelect}
              onLocationDrop={handleLocationDrop}
            />
          </div>

          {/* Destination preview (conditionally rendered) */}
          {showDestinationPreview && selectedLocationId && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="h-[500px] bg-white rounded-lg shadow-md overflow-hidden"
            >
              <DestinationPreview
                onClose={() => setShowDestinationPreview(false)}
                onAddToItinerary={handleAddToItinerary}
              />
            </motion.div>
          )}
        </motion.div>

        {/* Itinerary panel */}
        <div className="w-full lg:w-1/3 h-[600px] bg-white rounded-lg shadow-md overflow-hidden">
          <ItineraryPanel
            destinations={destinations}
            onAddDestination={() => setShowDestinationPreview(true)}
            onRemoveDestination={handleRemoveDestination}
            onReorderDestinations={handleReorderDestinations}
            onSelectDestination={handleLocationSelect}
          />
        </div>
      </main>

      {/* Footer */}
      <ActionFooter
        onSave={handleSave}
        onFavorite={handleFavorite}
        isFavorited={isFavorited}
        isModified={isModified}
      />
    </div>
  );
};

export default Home;
