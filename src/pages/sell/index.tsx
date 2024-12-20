import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Upload } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { cn } from "@/lib/utils";
import { ClassificationKey } from "@/services/ticketmaster";

const formSchema = z.object({
  title: z.string().min(3, "Event title must be at least 3 characters"),
  type: z.string({
    required_error: "Please select an event type",
  }),
  date: z.date({
    required_error: "Please select a date",
  }),
  venue: z.string().min(3, "Venue name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number({
    required_error: "Please enter a price",
    invalid_type_error: "Please enter a valid price",
  }).min(0.01, "Price must be greater than 0"),
  quantity: z.number({
    required_error: "Please enter quantity",
    invalid_type_error: "Please enter a valid number",
  }).min(1, "Quantity must be at least 1"),
  image: z.any().optional(),
});

type FormData = z.infer<typeof formSchema>;

const EVENT_TYPES: { value: ClassificationKey; label: string }[] = [
  { value: "music", label: "Concert & Music" },
  { value: "sports", label: "Sports" },
  { value: "theatre", label: "Theatre & Shows" },
  { value: "comedy", label: "Comedy" },
  { value: "family", label: "Family & Kids" },
];

export const SellPage = () => {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: undefined,
      quantity: undefined,
    },
  });

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth/signin?redirect=/sell");
    }
  }, [user, authLoading, router]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size must be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue("image", file);
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit listing");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const renderImageUpload = () => (
    <div className="space-y-2">
      <label className="text-sm font-medium">Event Image</label>
      <div className={cn(
        "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
        imagePreview ? "border-green-500 bg-green-50/10" : "border-gray-200 hover:border-gray-300"
      )}>
        {imagePreview ? (
          <div className="space-y-4">
            <img 
              src={imagePreview} 
              alt="Preview" 
              className="mx-auto max-h-48 rounded-lg object-cover"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setImagePreview(null);
                form.setValue("image", undefined);
              }}
            >
              Remove Image
            </Button>
          </div>
        ) : (
          <label className="cursor-pointer block">
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
            <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Drag and drop an image, or click to browse
            </p>
          </label>
        )}
      </div>
    </div>
  );

  const renderSuccessCard = () => (
    <Card>
      <CardContent className="pt-6">
        <div className="text-center space-y-4">
          <div className="text-2xl font-semibold text-green-600">Listing Created Successfully!</div>
          <p className="text-muted-foreground">Your tickets have been listed for sale.</p>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => setSuccess(false)}>Create Another Listing</Button>
            <Button variant="outline" onClick={() => router.push("/account")}>
              View My Listings
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <>
      <Head>
        <title>Sell Tickets - Your Choice Tickets</title>
        <meta name="description" content="List your event tickets for sale on Your Choice Tickets" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">Sell Your Tickets</h1>
            <p className="text-muted-foreground">List your event tickets and reach thousands of buyers</p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success ? renderSuccessCard() : (
            <Card>
              <CardHeader>
                <CardTitle>Event Details</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Event Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter event title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Event Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select event type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {EVENT_TYPES.map(type => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Event Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className="w-full justify-start text-left font-normal"
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {field.value ? format(field.value, "PPP") : "Pick a date"}
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date < new Date() || date > new Date(2025, 0, 1)
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="venue"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Venue</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter venue name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe your event"
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ticket Price (USD)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Enter price per ticket"
                              {...field}
                              onChange={e => field.onChange(parseFloat(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="quantity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of Tickets</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Enter number of available tickets"
                              {...field}
                              onChange={e => field.onChange(parseInt(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {renderImageUpload()}

                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Creating Listing..." : "List Tickets for Sale"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </>
  );
};

export default SellPage;