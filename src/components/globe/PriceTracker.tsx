import React, { useState } from "react";
import {
  DollarSign,
  Plane,
  Home,
  TrendingUp,
  TrendingDown,
  RefreshCw,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PriceData {
  destination: string;
  flightPrice: number;
  accommodationPrice: number;
  previousFlightPrice?: number;
  previousAccommodationPrice?: number;
  currency: string;
}

interface PriceTrackerProps {
  prices?: PriceData[];
  isVisible?: boolean;
  onRefresh?: () => void;
}

const PriceTracker = ({
  prices = [
    {
      destination: "Paris, France",
      flightPrice: 450,
      accommodationPrice: 120,
      previousFlightPrice: 480,
      previousAccommodationPrice: 110,
      currency: "USD",
    },
    {
      destination: "Tokyo, Japan",
      flightPrice: 850,
      accommodationPrice: 150,
      previousFlightPrice: 820,
      previousAccommodationPrice: 150,
      currency: "USD",
    },
    {
      destination: "Bali, Indonesia",
      flightPrice: 720,
      accommodationPrice: 80,
      previousFlightPrice: 750,
      previousAccommodationPrice: 85,
      currency: "USD",
    },
  ],
  isVisible = true,
  onRefresh = () => {},
}: PriceTrackerProps) => {
  const [activeTab, setActiveTab] = useState("flights");

  if (!isVisible) return null;

  const getPriceChangeIcon = (current: number, previous?: number) => {
    if (!previous) return null;
    return current < previous ? (
      <TrendingDown className="h-4 w-4 text-green-500" />
    ) : current > previous ? (
      <TrendingUp className="h-4 w-4 text-red-500" />
    ) : null;
  };

  const getPriceChangeText = (current: number, previous?: number) => {
    if (!previous) return "";
    const diff = Math.abs(current - previous);
    const percentage = ((diff / previous) * 100).toFixed(1);
    return current < previous
      ? `Down ${percentage}%`
      : current > previous
        ? `Up ${percentage}%`
        : "Unchanged";
  };

  return (
    <Card className="w-[250px] shadow-lg bg-white">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-blue-500" />
            Price Tracker
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onRefresh}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription>Track prices for your destinations</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue="flights"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="flights" className="flex items-center gap-1">
              <Plane className="h-3.5 w-3.5" /> Flights
            </TabsTrigger>
            <TabsTrigger
              value="accommodations"
              className="flex items-center gap-1"
            >
              <Home className="h-3.5 w-3.5" /> Stays
            </TabsTrigger>
          </TabsList>
          <TabsContent value="flights" className="mt-2 space-y-3">
            {prices.map((price, index) => (
              <div
                key={`flight-${index}`}
                className="p-2 rounded-md border border-gray-100 bg-gray-50"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-sm truncate">
                    {price.destination}
                  </span>
                  {getPriceChangeIcon(
                    price.flightPrice,
                    price.previousFlightPrice,
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">
                    {price.currency} {price.flightPrice}
                  </span>
                  <Badge
                    variant={
                      price.flightPrice < (price.previousFlightPrice || 0)
                        ? "success"
                        : price.flightPrice > (price.previousFlightPrice || 0)
                          ? "destructive"
                          : "outline"
                    }
                    className="text-xs"
                  >
                    {getPriceChangeText(
                      price.flightPrice,
                      price.previousFlightPrice,
                    )}
                  </Badge>
                </div>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="accommodations" className="mt-2 space-y-3">
            {prices.map((price, index) => (
              <div
                key={`accommodation-${index}`}
                className="p-2 rounded-md border border-gray-100 bg-gray-50"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-sm truncate">
                    {price.destination}
                  </span>
                  {getPriceChangeIcon(
                    price.accommodationPrice,
                    price.previousAccommodationPrice,
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">
                    {price.currency} {price.accommodationPrice}/night
                  </span>
                  <Badge
                    variant={
                      price.accommodationPrice <
                      (price.previousAccommodationPrice || 0)
                        ? "success"
                        : price.accommodationPrice >
                            (price.previousAccommodationPrice || 0)
                          ? "destructive"
                          : "outline"
                    }
                    className="text-xs"
                  >
                    {getPriceChangeText(
                      price.accommodationPrice,
                      price.previousAccommodationPrice,
                    )}
                  </Badge>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="pt-0">
        <p className="text-xs text-gray-500 w-full text-center">
          Last updated: {new Date().toLocaleString()}
        </p>
      </CardFooter>
    </Card>
  );
};

export default PriceTracker;
