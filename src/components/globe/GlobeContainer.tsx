import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import GlobeControls from "./GlobeControls";
import WeatherOverlay from "./WeatherOverlay";
import PriceTracker from "./PriceTracker";

interface Location {
  id: string;
  name: string;
  country: string;
  coordinates: [number, number]; // [latitude, longitude]
  selected?: boolean;
}

interface Path {
  id: string;
  from: string; // location id
  to: string; // location id
  animated?: boolean;
}

interface GlobeContainerProps {
  locations?: Location[];
  paths?: Path[];
  onLocationSelect?: (locationId: string) => void;
  onLocationDrop?: (location: Location, coordinates: [number, number]) => void;
  initialRotation?: [number, number]; // [x, y] rotation in degrees
  initialZoom?: number; // 1.0 is default zoom level
}

const GlobeContainer = ({
  locations = [
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
  ],
  paths = [
    {
      id: "path-1-2",
      from: "1",
      to: "2",
      animated: true,
    },
  ],
  onLocationSelect = () => {},
  onLocationDrop = () => {},
  initialRotation = [20, 40],
  initialZoom = 1.0,
}: GlobeContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState<[number, number]>(initialRotation);
  const [zoom, setZoom] = useState<number>(initialZoom);
  const [isRotating, setIsRotating] = useState<boolean>(false);
  const [showWeather, setShowWeather] = useState<boolean>(false);
  const [showPrices, setShowPrices] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [draggedLocation, setDraggedLocation] = useState<Location | null>(null);

  // Auto-rotation effect
  useEffect(() => {
    if (!isRotating) return;

    const interval = setInterval(() => {
      setRotation(([x, y]) => [x, (y + 0.2) % 360]);
    }, 30);

    return () => clearInterval(interval);
  }, [isRotating]);

  const handleRotate = () => {
    setIsRotating(!isRotating);
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.2, 2.5));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.2, 0.5));
  };

  const handleReset = () => {
    setRotation(initialRotation);
    setZoom(initialZoom);
    setIsRotating(false);
  };

  const handleToggleWeather = () => {
    setShowWeather(!showWeather);
  };

  const handleTogglePrices = () => {
    setShowPrices(!showPrices);
  };

  const handleHomeView = () => {
    setRotation([0, 0]);
    setZoom(1.0);
  };

  // Convert geographic coordinates to 3D position on the globe
  const geoToPosition = (lat: number, lng: number, radius: number = 150) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);

    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);

    return { x, y, z };
  };

  // Handle mouse interactions for globe rotation
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isDragging) return;

    const startX = e.clientX;
    const startY = e.clientY;
    const startRotationX = rotation[0];
    const startRotationY = rotation[1];

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      setRotation([startRotationX + dy * 0.5, startRotationY + dx * 0.5]);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // Handle location drag and drop
  const handleLocationDragStart = (location: Location) => {
    setIsDragging(true);
    setDraggedLocation(location);
  };

  const handleGlobeDrop = (e: React.DragEvent) => {
    if (!draggedLocation) return;

    // This is a simplified calculation - in a real app you would
    // need to convert screen coordinates to globe coordinates
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = ((e.clientX - rect.left) / rect.width) * 360 - 180;
    const y = ((e.clientY - rect.top) / rect.height) * 180 - 90;

    onLocationDrop(draggedLocation, [y, x]);
    setIsDragging(false);
    setDraggedLocation(null);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full bg-gradient-to-b from-blue-50 to-blue-100 rounded-xl overflow-hidden shadow-lg"
      onMouseDown={handleMouseDown}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleGlobeDrop}
    >
      {/* Globe visualization */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ perspective: "1000px" }}
      >
        <motion.div
          className="relative w-[300px] h-[300px] rounded-full"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${rotation[0]}deg) rotateY(${rotation[1]}deg) scale(${zoom})`,
          }}
        >
          {/* Globe sphere */}
          <div
            className="absolute inset-0 rounded-full bg-blue-300 opacity-80"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80)",
              backgroundSize: "cover",
              boxShadow:
                "inset 0 0 20px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 0, 100, 0.1)",
            }}
          />

          {/* Location markers */}
          {locations.map((location) => {
            const pos = geoToPosition(
              location.coordinates[0],
              location.coordinates[1],
            );
            const scale = location.selected ? 1.5 : 1;

            return (
              <motion.div
                key={location.id}
                className={`absolute w-3 h-3 rounded-full cursor-pointer ${location.selected ? "bg-red-500" : "bg-yellow-500"}`}
                style={{
                  transform: `translate3d(${pos.x}px, ${pos.y}px, ${pos.z}px) translate(-50%, -50%) scale(${scale})`,
                  boxShadow: "0 0 10px rgba(255, 255, 255, 0.8)",
                }}
                onClick={() => onLocationSelect(location.id)}
                whileHover={{ scale: scale * 1.5 }}
                draggable
                onDragStart={() => handleLocationDragStart(location)}
              >
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-black/70 text-white text-xs px-2 py-1 rounded pointer-events-none">
                  {location.name}, {location.country}
                </div>
              </motion.div>
            );
          })}

          {/* Travel paths */}
          {paths.map((path) => {
            const fromLocation = locations.find((loc) => loc.id === path.from);
            const toLocation = locations.find((loc) => loc.id === path.to);

            if (!fromLocation || !toLocation) return null;

            const fromPos = geoToPosition(
              fromLocation.coordinates[0],
              fromLocation.coordinates[1],
            );
            const toPos = geoToPosition(
              toLocation.coordinates[0],
              toLocation.coordinates[1],
            );

            // This is a simplified path representation
            // In a real app, you would want to draw a curved path along the globe surface
            return (
              <div
                key={path.id}
                className="absolute top-1/2 left-1/2 w-0 h-0"
                style={{
                  transform: `translate(-50%, -50%)`,
                }}
              >
                <svg
                  width="300"
                  height="300"
                  viewBox="-150 -150 300 300"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    pointerEvents: "none",
                  }}
                >
                  {path.animated ? (
                    <motion.path
                      d={`M ${fromPos.x} ${fromPos.y} L ${toPos.x} ${toPos.y}`}
                      stroke="rgba(255, 255, 255, 0.7)"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="5 3"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "loop",
                      }}
                    />
                  ) : (
                    <path
                      d={`M ${fromPos.x} ${fromPos.y} L ${toPos.x} ${toPos.y}`}
                      stroke="rgba(255, 255, 255, 0.7)"
                      strokeWidth="2"
                      fill="none"
                    />
                  )}
                </svg>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Controls */}
      <div className="absolute top-4 left-4 z-10">
        <GlobeControls
          onRotate={handleRotate}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onReset={handleReset}
          onToggleWeather={handleToggleWeather}
          onTogglePrices={handleTogglePrices}
          onHome={handleHomeView}
          weatherActive={showWeather}
          pricesActive={showPrices}
        />
      </div>

      {/* Weather overlay */}
      <WeatherOverlay isVisible={showWeather} position="top-right" />

      {/* Price tracker */}
      {showPrices && (
        <div className="absolute bottom-4 right-4 z-10">
          <PriceTracker isVisible={true} />
        </div>
      )}

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 bg-white/80 p-2 rounded-md text-xs text-gray-700">
        <p>
          Drag to rotate • Scroll to zoom • Click markers to select destinations
        </p>
      </div>
    </div>
  );
};

export default GlobeContainer;
