import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertBookingSchema } from "@shared/schema";
import { type BookingInput } from "@shared/routes";
import { useCreateBooking } from "@/hooks/use-bookings";
import { SiWhatsapp } from "react-icons/si";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultService?: string;
}

export function BookingModal({ open, onOpenChange, defaultService }: BookingModalProps) {
  const { mutate: createBooking, isPending } = useCreateBooking();

  const form = useForm<BookingInput>({
    resolver: zodResolver(insertBookingSchema),
    defaultValues: {
      name: "",
      phone: "",
      service: defaultService || "Individual Therapy",
      date: "",
      time: "",
    },
  });

  useEffect(() => {
    if (defaultService) {
      form.setValue("service", defaultService);
    }
  }, [defaultService, form]);

  const service = form.watch("service");
  const isSOS = service === "SOS Session";

  const onSubmit = (data: BookingInput) => {
    if (isSOS) {
      const message = `Hello, I would like to book an SOS Session. My name is ${data.name} and my phone is ${data.phone}.`;
      window.open(`https://wa.me/1234567890?text=${encodeURIComponent(message)}`, "_blank");
      onOpenChange(false);
      return;
    }

    createBooking(data, {
      onSuccess: () => {
        form.reset();
        onOpenChange(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md border-primary/20 bg-background/95 backdrop-blur-md">
        <DialogHeader>
          <DialogTitle className="text-2xl text-primary font-display">Book a Session</DialogTitle>
          <DialogDescription className="text-foreground/70">
            {isSOS 
              ? "SOS sessions are handled directly via WhatsApp for immediate response."
              : "Take the first step towards healing. Choose a service and date, and we'll confirm your appointment."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Jane Doe" className="bg-card" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+1 (555) 000-0000" className="bg-card" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="service"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Therapy Service</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-card">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Individual Therapy">Individual Therapy</SelectItem>
                      <SelectItem value="Couples Therapy">Couples Therapy</SelectItem>
                      <SelectItem value="Family Therapy">Family Therapy</SelectItem>
                      <SelectItem value="SOS Session">SOS Session (Immediate)</SelectItem>
                      <SelectItem value="Free 15min Call">Free 15min Discovery Call</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {!isSOS && (
              <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Date</FormLabel>
                      <FormControl>
                        <Input type="date" className="bg-card" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Time</FormLabel>
                      <FormControl>
                        <Input type="time" className="bg-card" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            <div className="pt-4">
              <Button 
                type="submit" 
                className={`w-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 rounded-xl py-6 text-lg font-medium flex items-center justify-center gap-2 ${
                  isSOS ? "bg-[#25D366] hover:bg-[#128C7E] text-white" : "bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                }`}
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Booking...
                  </>
                ) : isSOS ? (
                  <>
                    <SiWhatsapp className="w-5 h-5" />
                    Book via WhatsApp
                  </>
                ) : (
                  "Confirm Booking"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
