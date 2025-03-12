import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Plane, Palmtree, Utensils, DollarSign, Clock } from "lucide-react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  travelStyle: z.string().min(1, { message: "Please select a travel style" }),
  activities: z
    .string()
    .min(1, { message: "Please select preferred activities" }),
  cuisine: z.string().min(1, { message: "Please select cuisine preference" }),
  budget: z.number().min(100).max(10000),
  duration: z.number().min(1).max(30),
});

interface PreferencesFormProps {
  onSubmit?: (values: z.infer<typeof formSchema>) => void;
  isOpen?: boolean;
}

const PreferencesForm = ({
  onSubmit = () => {},
  isOpen = true,
}: PreferencesFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      travelStyle: "adventure",
      activities: "sightseeing",
      cuisine: "local",
      budget: 2000,
      duration: 7,
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values);
  };

  return (
    <div className="w-full p-4 rounded-lg bg-white shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-center">
        Travel Preferences
      </h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="travelStyle"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Plane className="h-4 w-4" /> Travel Style
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your travel style" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="adventure">Adventure</SelectItem>
                    <SelectItem value="relaxation">Relaxation</SelectItem>
                    <SelectItem value="cultural">Cultural</SelectItem>
                    <SelectItem value="luxury">Luxury</SelectItem>
                    <SelectItem value="budget">Budget</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="activities"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Palmtree className="h-4 w-4" /> Preferred Activities
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select preferred activities" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="sightseeing">Sightseeing</SelectItem>
                    <SelectItem value="nature">Nature & Outdoors</SelectItem>
                    <SelectItem value="museums">Museums & History</SelectItem>
                    <SelectItem value="nightlife">Nightlife</SelectItem>
                    <SelectItem value="shopping">Shopping</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cuisine"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Utensils className="h-4 w-4" /> Cuisine Preference
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select cuisine preference" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="local">Local Cuisine</SelectItem>
                    <SelectItem value="international">International</SelectItem>
                    <SelectItem value="vegetarian">Vegetarian</SelectItem>
                    <SelectItem value="fine-dining">Fine Dining</SelectItem>
                    <SelectItem value="street-food">Street Food</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" /> Budget (USD)
                </FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    <Slider
                      min={100}
                      max={10000}
                      step={100}
                      value={[field.value]}
                      onValueChange={(value) => field.onChange(value[0])}
                    />
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-500">$100</span>
                      <span className="text-sm font-medium">
                        ${field.value}
                      </span>
                      <span className="text-xs text-gray-500">$10,000</span>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Clock className="h-4 w-4" /> Trip Duration (Days)
                </FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    <Slider
                      min={1}
                      max={30}
                      step={1}
                      value={[field.value]}
                      onValueChange={(value) => field.onChange(value[0])}
                    />
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-500">1 day</span>
                      <span className="text-sm font-medium">
                        {field.value} days
                      </span>
                      <span className="text-xs text-gray-500">30 days</span>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full mt-6">
            Generate AI Recommendations
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default PreferencesForm;
