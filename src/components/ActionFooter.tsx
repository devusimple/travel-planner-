import React from "react";
import { Save, Share, Download, Printer, Heart, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ActionFooterProps {
  onSave?: () => void;
  onShare?: () => void;
  onDownload?: () => void;
  onPrint?: () => void;
  onFavorite?: () => void;
  onSettings?: () => void;
  isFavorited?: boolean;
  isModified?: boolean;
}

const ActionFooter = ({
  onSave = () => {},
  onShare = () => {},
  onDownload = () => {},
  onPrint = () => {},
  onFavorite = () => {},
  onSettings = () => {},
  isFavorited = false,
  isModified = false,
}: ActionFooterProps) => {
  return (
    <footer className="w-full h-[70px] bg-white border-t border-gray-200 shadow-sm fixed bottom-0 left-0 right-0 z-10">
      <div className="container mx-auto h-full flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-500">
            {isModified ? "Unsaved changes" : "All changes saved"}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={onSave}
                  className={
                    isModified ? "border-amber-500 text-amber-500" : ""
                  }
                >
                  <Save className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Save trip plan</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={onShare}>
                  <Share className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Share with friends</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={onDownload}>
                  <Download className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Download itinerary</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={onPrint}>
                  <Printer className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Print itinerary</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={isFavorited ? "default" : "outline"}
                  size="icon"
                  onClick={onFavorite}
                  className={isFavorited ? "bg-red-500 hover:bg-red-600" : ""}
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {isFavorited ? "Remove from favorites" : "Add to favorites"}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={onSettings}>
                  <Settings className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Trip settings</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Button className="ml-4">Finalize Trip</Button>
        </div>
      </div>
    </footer>
  );
};

export default ActionFooter;
