import React from "react";
import {
  RotateCw,
  ZoomIn,
  ZoomOut,
  RefreshCw,
  Cloud,
  DollarSign,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface GlobeControlsProps {
  onRotate?: () => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onReset?: () => void;
  onToggleWeather?: () => void;
  onTogglePrices?: () => void;
  onHome?: () => void;
  weatherActive?: boolean;
  pricesActive?: boolean;
}

const GlobeControls = ({
  onRotate = () => {},
  onZoomIn = () => {},
  onZoomOut = () => {},
  onReset = () => {},
  onToggleWeather = () => {},
  onTogglePrices = () => {},
  onHome = () => {},
  weatherActive = false,
  pricesActive = false,
}: GlobeControlsProps) => {
  return (
    <div className="flex flex-col gap-2 p-3 rounded-lg bg-white shadow-md">
      <TooltipProvider>
        <div className="flex flex-col gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={onRotate}
                className="rounded-full"
              >
                <RotateCw className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Auto-rotate globe</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={onZoomIn}
                className="rounded-full"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Zoom in</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={onZoomOut}
                className="rounded-full"
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Zoom out</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={onReset}
                className="rounded-full"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Reset view</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={weatherActive ? "default" : "outline"}
                size="icon"
                onClick={onToggleWeather}
                className="rounded-full"
              >
                <Cloud className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle weather overlay</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={pricesActive ? "default" : "outline"}
                size="icon"
                onClick={onTogglePrices}
                className="rounded-full"
              >
                <DollarSign className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle price tracker</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={onHome}
                className="rounded-full"
              >
                <Home className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Return to home view</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
};

export default GlobeControls;
