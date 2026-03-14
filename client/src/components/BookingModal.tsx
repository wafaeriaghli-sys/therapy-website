import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertBookingSchema } from "@shared/schema";
import { type BookingInput } from "@shared/routes";
import { useCreateBooking } from "@/hooks/use-bookings";
import { SiWhatsapp } from "react-icons/si";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, CalendarDays, Clock, User, Phone } from "lucide-react";
import { useEffect } from "react";

interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultService?: string;
}

const TIME_SLOTS = [
  "09:00", "10:00", "11:00", "12:00",
  "14:00", "15:00", "16:00", "17:00", "18:00",
];

const SERVICE_LABELS: Record<string, string> = {
  "Individual Therapy": "Thérapie Individuelle — 300 MAD · 50 min",
  "Couples Therapy": "Thérapie de Couple — 500 MAD · 60 min",
  "Family Therapy": "Thérapie Familiale — 600 MAD · 60 min",
  "SOS SESSION": "SOS Session — 600 MAD · Urgence",
  "DISCOVERY 15MIN CALL": "Appel de 15min Offert — Gratuit",
};

export function BookingModal({ open, onOpenChange, defaultService }: BookingModalProps) {
  const { mutate: createBooking, isPending } = useCreateBooking();
  const [selectedTime, setSelectedTime] = useState<string>("");

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
  const isSOS = service === "SOS SESSION";

  const onSubmit = (data: BookingInput) => {
    const finalData = { ...data, time: selectedTime || data.time };
    if (isSOS) {
      const message = `Bonjour, je souhaite réserver une séance SOS. Mon nom est ${data.name} et mon numéro est ${data.phone}.`;
      window.open(`https://wa.me/1234567890?text=${encodeURIComponent(message)}`, "_blank");
      onOpenChange(false);
      return;
    }
    createBooking(finalData, {
      onSuccess: () => {
        form.reset();
        setSelectedTime("");
        onOpenChange(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-describedby={undefined} className="max-w-2xl w-full p-0 overflow-hidden border-0 rounded-3xl shadow-2xl">
        <div className="grid md:grid-cols-[1fr_1.6fr]">
          {/* Left accent panel */}
          <div className="hidden md:flex flex-col justify-between bg-[#4B5320] p-8 text-white">
            <div>
              <p className="text-[10px] font-black tracking-[0.4em] uppercase text-white/50 mb-4">Stillpoint Therapy</p>
              <h2 className="text-2xl font-serif font-medium leading-snug mb-3">
                Réserver votre séance
              </h2>
              <p className="text-sm text-white/70 font-serif italic leading-relaxed">
                Un premier pas vers ce qui compte vraiment.
              </p>
            </div>
            <div className="space-y-3">
              {[
                "Confidentiel",
                "Sans engagement",
                "Confirmation rapide",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#A0522D]"></div>
                  <p className="text-xs text-white/80 font-serif">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right form panel */}
          <div className="bg-[#FAF9F6] p-8">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-xl font-serif text-[#1A1A1A] font-medium">
                {isSOS ? "Séance SOS — Urgence" : "Prendre rendez-vous"}
              </DialogTitle>
              {isSOS && (
                <p className="text-xs text-[#5D6D7E] font-serif italic mt-1">
                  Les séances SOS sont traitées directement via WhatsApp pour une réponse immédiate.
                </p>
              )}
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-black tracking-[0.2em] uppercase text-[#5D6D7E]">
                        Nom complet
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C5BBB0]" />
                          <Input
                            placeholder="Votre nom"
                            className="pl-10 border-[#E5E1D8] bg-white rounded-xl focus-visible:ring-[#A0522D]/30 focus-visible:border-[#A0522D]"
                            {...field}
                          />
                        </div>
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
                      <FormLabel className="text-[10px] font-black tracking-[0.2em] uppercase text-[#5D6D7E]">
                        Numéro de téléphone
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C5BBB0]" />
                          <Input
                            placeholder="+212 6XX XXX XXX"
                            className="pl-10 border-[#E5E1D8] bg-white rounded-xl focus-visible:ring-[#A0522D]/30 focus-visible:border-[#A0522D]"
                            {...field}
                          />
                        </div>
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
                      <FormLabel className="text-[10px] font-black tracking-[0.2em] uppercase text-[#5D6D7E]">
                        Type de séance
                      </FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="border-[#E5E1D8] bg-white rounded-xl focus:ring-[#A0522D]/30">
                            <SelectValue placeholder="Choisir une séance" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-xl border-[#E5E1D8]">
                          <SelectItem value="Individual Therapy">Thérapie Individuelle — 300 MAD · 50 min</SelectItem>
                          <SelectItem value="Couples Therapy">Thérapie de Couple — 500 MAD · 60 min</SelectItem>
                          <SelectItem value="Family Therapy">Thérapie Familiale — 600 MAD · 60 min</SelectItem>
                          <SelectItem value="SOS SESSION">SOS Session — 600 MAD · Urgence</SelectItem>
                          <SelectItem value="DISCOVERY 15MIN CALL">Appel de 15min Offert — Gratuit</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {!isSOS && (
                  <div className="space-y-5 pt-1">
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[10px] font-black tracking-[0.2em] uppercase text-[#5D6D7E] flex items-center gap-1.5">
                            <CalendarDays className="w-3.5 h-3.5" /> Date souhaitée
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              className="border-[#E5E1D8] bg-white rounded-xl focus-visible:ring-[#A0522D]/30 focus-visible:border-[#A0522D] text-[#1A1A1A]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div>
                      <p className="text-[10px] font-black tracking-[0.2em] uppercase text-[#5D6D7E] flex items-center gap-1.5 mb-3">
                        <Clock className="w-3.5 h-3.5" /> Heure souhaitée
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        {TIME_SLOTS.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => {
                              setSelectedTime(slot);
                              form.setValue("time", slot);
                            }}
                            className={`py-2 px-3 rounded-xl text-xs font-bold tracking-wider border transition-all duration-200 ${
                              selectedTime === slot
                                ? "bg-[#4B5320] text-white border-[#4B5320] shadow-sm"
                                : "bg-white text-[#5D6D7E] border-[#E5E1D8] hover:border-[#A0522D] hover:text-[#A0522D]"
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className="pt-2">
                  <Button
                    type="submit"
                    className={`w-full rounded-xl py-5 text-sm font-bold tracking-widest uppercase transition-all duration-300 ${
                      isSOS
                        ? "bg-[#25D366] hover:bg-[#128C7E] text-white"
                        : "bg-[#2C3E50] hover:bg-[#1A252F] text-white"
                    }`}
                    disabled={isPending}
                  >
                    {isPending ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" /> Confirmation...
                      </span>
                    ) : isSOS ? (
                      <span className="flex items-center justify-center gap-2">
                        <SiWhatsapp className="w-4 h-4" /> Réserver via WhatsApp
                      </span>
                    ) : (
                      "Confirmer la réservation"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
