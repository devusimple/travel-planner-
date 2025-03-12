import React from "react";
import {
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  Users,
  Utensils,
  Wifi,
  Globe,
  Phone,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface InfoCardProps {
  title?: string;
  location?: string;
  bestTimeToVisit?: string;
  averageDuration?: string;
  costLevel?: string;
  crowdLevel?: string;
  localCuisine?: string[];
  wifiAvailability?: string;
  languages?: string[];
  emergencyContact?: string;
  attractions?: string[];
  culturalNotes?: string;
}

const InfoCard = ({
  title = "Paris, France",
  location = "48.8566° N, 2.3522° E",
  bestTimeToVisit = "April to June, September to October",
  averageDuration = "4-5 days",
  costLevel = "High",
  crowdLevel = "High during summer, Moderate in spring/fall",
  localCuisine = [
    "Croissants",
    "Escargot",
    "Coq au Vin",
    "Macarons",
    "Crème Brûlée",
  ],
  wifiAvailability = "Widely available in hotels, cafes, and public spaces",
  languages = ["French", "English in tourist areas"],
  emergencyContact = "112 (European Emergency Number)",
  attractions = [
    "Eiffel Tower",
    "Louvre Museum",
    "Notre-Dame Cathedral",
    "Arc de Triomphe",
    "Seine River Cruise",
  ],
  culturalNotes = "The French appreciate when visitors attempt to speak French. Greet with 'Bonjour' during the day and 'Bonsoir' in the evening. Tipping is not required but appreciated for good service.",
}: InfoCardProps) => {
  return (
    <Card className="w-full bg-white shadow-md overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
        <CardDescription className="text-white/90 flex items-center gap-1">
          <MapPin className="h-4 w-4" /> {location}
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-start gap-2">
            <Calendar className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <h4 className="font-medium text-sm">Best Time to Visit</h4>
              <p className="text-sm text-gray-600">{bestTimeToVisit}</p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Clock className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <h4 className="font-medium text-sm">Average Duration</h4>
              <p className="text-sm text-gray-600">{averageDuration}</p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <DollarSign className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <h4 className="font-medium text-sm">Cost Level</h4>
              <p className="text-sm text-gray-600">{costLevel}</p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Users className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <h4 className="font-medium text-sm">Crowd Level</h4>
              <p className="text-sm text-gray-600">{crowdLevel}</p>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <h4 className="font-medium text-sm flex items-center gap-2 mb-2">
            <Utensils className="h-4 w-4 text-blue-500" /> Local Cuisine
          </h4>
          <div className="flex flex-wrap gap-1">
            {localCuisine.map((item, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-blue-100 text-blue-700 hover:bg-blue-200"
              >
                {item}
              </Badge>
            ))}
          </div>
        </div>

        <div className="pt-1">
          <h4 className="font-medium text-sm flex items-center gap-2 mb-2">
            <Wifi className="h-4 w-4 text-blue-500" /> WiFi Availability
          </h4>
          <p className="text-sm text-gray-600">{wifiAvailability}</p>
        </div>

        <div className="pt-1">
          <h4 className="font-medium text-sm flex items-center gap-2 mb-2">
            <Globe className="h-4 w-4 text-blue-500" /> Languages
          </h4>
          <div className="flex flex-wrap gap-1">
            {languages.map((language, index) => (
              <Badge
                key={index}
                variant="outline"
                className="border-blue-200 text-blue-700"
              >
                {language}
              </Badge>
            ))}
          </div>
        </div>

        <div className="pt-1">
          <h4 className="font-medium text-sm flex items-center gap-2 mb-2">
            <Phone className="h-4 w-4 text-blue-500" /> Emergency Contact
          </h4>
          <p className="text-sm text-gray-600">{emergencyContact}</p>
        </div>

        <div className="pt-2">
          <h4 className="font-medium text-sm mb-2">Top Attractions</h4>
          <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
            {attractions.map((attraction, index) => (
              <li key={index}>{attraction}</li>
            ))}
          </ul>
        </div>

        <div className="pt-2">
          <h4 className="font-medium text-sm mb-2">Cultural Notes</h4>
          <p className="text-sm text-gray-600">{culturalNotes}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default InfoCard;
