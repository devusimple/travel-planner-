import React from "react";
import {
  Cloud,
  CloudRain,
  CloudSnow,
  Sun,
  Thermometer,
  Wind,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface WeatherData {
  location: string;
  temperature: number;
  condition: "sunny" | "cloudy" | "rainy" | "snowy" | "windy";
  humidity: number;
  windSpeed: number;
  forecast: {
    day: string;
    temperature: number;
    condition: "sunny" | "cloudy" | "rainy" | "snowy" | "windy";
  }[];
}

interface WeatherOverlayProps {
  isVisible?: boolean;
  weatherData?: WeatherData;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

const WeatherOverlay = ({
  isVisible = true,
  position = "top-right",
  weatherData = {
    location: "Paris, France",
    temperature: 22,
    condition: "sunny",
    humidity: 65,
    windSpeed: 12,
    forecast: [
      { day: "Mon", temperature: 23, condition: "sunny" },
      { day: "Tue", temperature: 21, condition: "cloudy" },
      { day: "Wed", temperature: 19, condition: "rainy" },
      { day: "Thu", temperature: 20, condition: "cloudy" },
      { day: "Fri", temperature: 22, condition: "sunny" },
    ],
  },
}: WeatherOverlayProps) => {
  if (!isVisible) return null;

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "sunny":
        return <Sun className="h-5 w-5 text-yellow-400" />;
      case "cloudy":
        return <Cloud className="h-5 w-5 text-gray-400" />;
      case "rainy":
        return <CloudRain className="h-5 w-5 text-blue-400" />;
      case "snowy":
        return <CloudSnow className="h-5 w-5 text-blue-200" />;
      case "windy":
        return <Wind className="h-5 w-5 text-gray-500" />;
      default:
        return <Sun className="h-5 w-5 text-yellow-400" />;
    }
  };

  const positionClasses = {
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4",
  };

  return (
    <div className={`absolute ${positionClasses[position]} z-10 w-64 bg-white`}>
      <Card className="backdrop-blur-md bg-white/90 border-none shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex justify-between items-center">
            <span>{weatherData.location}</span>
            {getWeatherIcon(weatherData.condition)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div className="text-3xl font-bold">
              {weatherData.temperature}°C
            </div>
            <div className="flex flex-col text-xs text-gray-500">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-1 mb-1">
                      <Thermometer className="h-3 w-3" />
                      <span>{weatherData.humidity}%</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Humidity</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-1">
                      <Wind className="h-3 w-3" />
                      <span>{weatherData.windSpeed} km/h</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Wind Speed</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-1 pt-2 border-t border-gray-100">
            {weatherData.forecast.map((day, index) => (
              <div key={index} className="flex flex-col items-center">
                <span className="text-xs font-medium">{day.day}</span>
                <div className="my-1">{getWeatherIcon(day.condition)}</div>
                <span className="text-xs">{day.temperature}°</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeatherOverlay;
