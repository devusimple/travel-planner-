import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  MapPin,
  Calendar,
  Clock,
  Trash2,
  GripVertical,
  PlusCircle,
} from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Destination {
  id: string;
  name: string;
  country: string;
  days: number;
  image: string;
  activities: string[];
}

interface ItineraryListProps {
  destinations?: Destination[];
  onReorder?: (destinations: Destination[]) => void;
  onRemove?: (id: string) => void;
  onSelect?: (id: string) => void;
  onAdd?: () => void;
}

const ItineraryList = ({
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
  onReorder = () => {},
  onRemove = () => {},
  onSelect = () => {},
  onAdd = () => {},
}: ItineraryListProps) => {
  const [items, setItems] = useState<Destination[]>(destinations);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const newItems = Array.from(items);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);

    setItems(newItems);
    onReorder(newItems);
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Your Itinerary</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={onAdd}
          className="flex items-center gap-1"
        >
          <PlusCircle className="h-4 w-4" />
          Add Destination
        </Button>
      </div>

      <ScrollArea className="h-[350px] pr-4">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="destinations">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-3"
              >
                {items.map((destination, index) => (
                  <Draggable
                    key={destination.id}
                    draggableId={destination.id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <motion.div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card
                          className={`${snapshot.isDragging ? "shadow-lg" : ""} transition-shadow duration-200`}
                        >
                          <CardContent className="p-0 overflow-hidden">
                            <div className="flex items-stretch">
                              <div
                                className="w-24 h-auto bg-cover bg-center"
                                style={{
                                  backgroundImage: `url(${destination.image})`,
                                }}
                              />
                              <div className="flex-1 p-3">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h4
                                      className="font-medium text-base"
                                      onClick={() => onSelect(destination.id)}
                                    >
                                      {destination.name}
                                    </h4>
                                    <div className="flex items-center text-sm text-gray-500 mt-1">
                                      <MapPin className="h-3 w-3 mr-1" />
                                      {destination.country}
                                    </div>
                                  </div>
                                  <div className="flex items-center">
                                    <div
                                      {...provided.dragHandleProps}
                                      className="cursor-grab p-1 mr-1"
                                    >
                                      <GripVertical className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-7 w-7"
                                      onClick={() => onRemove(destination.id)}
                                    >
                                      <Trash2 className="h-4 w-4 text-gray-500" />
                                    </Button>
                                  </div>
                                </div>

                                <div className="flex items-center mt-2 text-sm text-gray-500">
                                  <Clock className="h-3 w-3 mr-1" />
                                  <span>{destination.days} days</span>
                                </div>

                                <div className="mt-2 flex flex-wrap gap-1">
                                  {destination.activities.map((activity, i) => (
                                    <Badge
                                      key={i}
                                      variant="secondary"
                                      className="text-xs"
                                    >
                                      {activity}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </ScrollArea>

      {items.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No destinations added yet.</p>
          <p className="text-sm mt-1">
            Add destinations to build your itinerary.
          </p>
        </div>
      )}
    </div>
  );
};

export default ItineraryList;
