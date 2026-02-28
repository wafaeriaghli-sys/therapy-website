import { useMutation } from "@tanstack/react-query";
import { api, type BookingInput } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useCreateBooking() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: BookingInput) => {
      const res = await fetch(api.bookings.create.path, {
        method: api.bookings.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to create booking");
      }
      
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Booking Requested",
        description: "Your session request has been received. We will confirm shortly.",
      });
    },
    onError: (error) => {
      toast({
        title: "Booking Error",
        description: error.message,
        variant: "destructive",
      });
    }
  });
}
