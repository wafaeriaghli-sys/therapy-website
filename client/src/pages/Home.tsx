import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Leaf, Heart, Users, User, Mail, MapPin, Phone, Instagram, Facebook, Loader2, Zap, Clock, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { BookingModal } from "@/components/BookingModal";
import { useCreateContact } from "@/hooks/use-contact";
import { type ContactInput } from "@shared/routes";
import { insertContactMessageSchema } from "@shared/schema";

import heroImg from "@assets/WhatsApp_Image_2026-02-28_at_02.57.39_1772247601264.jpeg";

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>("Individual Therapy");
  
  const { mutate: submitContact, isPending: isSubmittingContact } = useCreateContact();
  
  const contactForm = useForm<ContactInput>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: { name: "", email: "", message: "" }
  });

  const onContactSubmit = (data: ContactInput) => {
    submitContact(data, {
      onSuccess: () => contactForm.reset()
    });
  };

  const handleBookNow = (service: string) => {
    setSelectedService(service);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F9F7F2] text-[#2C3E50] flex flex-col overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-[#F9F7F2]/80 backdrop-blur-md border-b border-[#E5E1D8] transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-2xl tracking-widest text-[#5D6D7E]">STILLPOINT THERAPY</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-[0.2em] text-[#5D6D7E]">
            <a href="#about" className="hover:text-[#A0522D] transition-colors">About</a>
            <a href="#services" className="hover:text-[#A0522D] transition-colors">Services</a>
            <a href="#testimonials" className="hover:text-[#A0522D] transition-colors">Resources</a>
            <a href="#contact" className="hover:text-[#A0522D] transition-colors">Contact</a>
          </div>
          <div className="flex items-center gap-4">
             <div className="hidden sm:flex gap-3">
                <Instagram className="w-4 h-4 text-[#5D6D7E] hover:text-[#A0522D] cursor-pointer" />
                <Facebook className="w-4 h-4 text-[#5D6D7E] hover:text-[#A0522D] cursor-pointer" />
             </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 lg:pt-0 min-h-screen flex items-center relative overflow-hidden">
        {/* Decorative Circles from the picture */}
        <div className="absolute top-20 right-[-10%] w-[40rem] h-[40rem] bg-white rounded-full opacity-50 -z-10"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[30rem] h-[30rem] bg-[#E5E1D8] rounded-full opacity-30 -z-10"></div>

        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Image with Arch */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="p-6 flex items-center justify-center order-2 md:order-1"
          >
            <div className="relative">
               {/* Rounded arch matching the picture exactly */}
               <div className="w-[320px] sm:w-[400px] aspect-[4/5] rounded-t-full overflow-hidden shadow-xl border-[12px] border-white relative z-10">
                  <img 
                    src={heroImg} 
                    alt="Therapist profile" 
                    className="w-full h-full object-cover" 
                  />
               </div>
               {/* Rust/Terracotta circle overlay as seen in design */}
               <div className="absolute -top-4 -left-4 w-32 h-32 bg-[#A0522D]/20 rounded-full -z-0 blur-xl"></div>
            </div>
          </motion.div>

          {/* Right: Floating Content Box */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="md:order-2 px-6 flex flex-col items-start"
          >
            <div className="bg-white/80 backdrop-blur-sm p-12 lg:p-16 rounded-[4rem] shadow-sm border border-white/50 max-w-lg relative">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#2C3E50] leading-tight mb-8">
                Our Therapy & <br/>Counselling <br/>Services
              </h1>
              <Button 
                onClick={() => handleBookNow("Individual Therapy")}
                className="bg-[#E5E1D8] hover:bg-[#D8D4CA] text-[#2C3E50] rounded-full px-10 py-6 text-sm font-semibold uppercase tracking-widest shadow-none transition-all"
              >
                Let's Connect
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Special Offers / Branding Section */}
      <section className="py-12 bg-white/40 border-y border-[#E5E1D8]">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-24">
           <motion.div 
             whileHover={{ scale: 1.05 }}
             onClick={() => handleBookNow("SOS Session")}
             className="flex items-center gap-4 cursor-pointer group"
           >
              <div className="w-14 h-14 rounded-full bg-[#A0522D] flex items-center justify-center text-white shadow-lg group-hover:bg-[#8B4513] transition-colors">
                 <Zap className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                 <div className="flex items-center gap-2">
                    <h4 className="font-bold text-[#A0522D] text-lg">SOS SESSION</h4>
                    <span className="text-xs font-serif italic text-[#A0522D]">$200</span>
                 </div>
                 <p className="text-xs uppercase tracking-widest text-[#5D6D7E]">Immediate Support</p>
              </div>
           </motion.div>

           <motion.div 
             whileHover={{ scale: 1.05 }}
             onClick={() => handleBookNow("Free 15min Call")}
             className="flex items-center gap-4 cursor-pointer group"
           >
              <div className="w-14 h-14 rounded-full bg-[#7E8D85] flex items-center justify-center text-white shadow-lg group-hover:bg-[#6B7A72] transition-colors">
                 <Clock className="w-6 h-6" />
              </div>
              <div>
                 <h4 className="font-bold text-[#7E8D85] text-lg">FREE 15MIN CALL</h4>
                 <p className="text-xs uppercase tracking-widest text-[#5D6D7E]">First Time Discovery</p>
              </div>
           </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-[#F9F7F2]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <p className="text-xs font-bold text-[#5D6D7E] tracking-[0.4em] uppercase mb-6 flex justify-between items-center max-w-4xl mx-auto">
               <span>YOUR JOURNEY</span>
               <span className="text-lg normal-case font-serif tracking-normal text-[#2C3E50]">BUILDING A BETTER FUTURE TOGETHER</span>
               <span>STARTS HERE</span>
            </p>
            <p className="text-[#5D6D7E] max-w-2xl mx-auto text-sm leading-relaxed opacity-80">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "FAMILY THERAPY",
                icon: <Users className="w-8 h-8" />,
                color: "bg-[#7E8D85]", // Sage
                price: "$150",
              },
              {
                title: "INDIVIDUAL THERAPY",
                icon: <User className="w-8 h-8" />,
                color: "bg-[#E5E1D8]", // Beige
                price: "$120",
              },
              {
                title: "COUPLES THERAPY",
                icon: <Heart className="w-8 h-8" />,
                color: "bg-[#7E8D85]", // Sage
                price: "$180",
              }
            ].map((service, idx) => (
              <motion.div 
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="group"
              >
                <div className={`aspect-[4/3] w-full rounded-t-full flex items-center justify-center mb-6 shadow-sm border border-white/50 transition-all group-hover:shadow-xl ${service.color}`}>
                   <div className="text-[#2C3E50] opacity-60 group-hover:opacity-100 transform transition-transform group-hover:scale-110">
                      {service.icon}
                   </div>
                </div>
                <div className="bg-white p-8 rounded-b-3xl shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-xs font-bold tracking-[0.2em] text-[#5D6D7E]">{service.title}</h4>
                    <span className="text-xs font-serif italic text-[#A0522D]">{service.price}</span>
                  </div>
                  <p className="text-[#5D6D7E] text-xs leading-loose mb-6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                  <button 
                    onClick={() => handleBookNow(service.title)}
                    className="text-[10px] font-bold tracking-widest uppercase border-b border-[#2C3E50] pb-1 hover:text-[#A0522D] hover:border-[#A0522D] transition-all"
                  >
                    Book Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
           <div className="flex justify-center gap-1 mb-8 text-[#E5E1D8]">
              {[...Array(5)].map((_, i) => <ShieldCheck key={i} className="w-4 h-4 fill-current" />)}
           </div>
           <h2 className="text-3xl md:text-4xl font-serif text-[#2C3E50] leading-relaxed mb-12 italic">
             “StillPoint Therapy Created A Safe Space Where I Felt Safe, Seen, And Truly Heard. I’ve Grown So Much In The Past Few Month, And I’m Finally Starting To Feel Like Myself Again.”
           </h2>
           <p className="text-sm font-bold tracking-[0.3em] uppercase text-[#2C3E50]">BREAH DESIGNS</p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-[#F9F7F2]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-[4rem] p-12 md:p-20 shadow-sm border border-[#E5E1D8]">
            <div className="grid md:grid-cols-2 gap-16">
              <div>
                <h2 className="text-4xl font-serif mb-8 text-[#2C3E50]">Connect With Us</h2>
                <p className="text-[#5D6D7E] mb-12 leading-loose">
                  We are here to support your journey. Please fill out the form or reach out via our contact details.
                </p>
                <div className="space-y-4 text-sm text-[#5D6D7E] tracking-wider uppercase">
                   <p>123 Serenity Way, Suite 100</p>
                   <p>hello@stillpoint.com</p>
                   <p>(+1) 234 567 890</p>
                </div>
              </div>

              <Form {...contactForm}>
                <form onSubmit={contactForm.handleSubmit(onContactSubmit)} className="space-y-6">
                  <FormField
                    control={contactForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="NAME" className="border-0 border-b border-[#E5E1D8] rounded-none px-0 bg-transparent focus-visible:ring-0 focus-visible:border-[#A0522D] text-xs tracking-widest" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={contactForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="EMAIL" className="border-0 border-b border-[#E5E1D8] rounded-none px-0 bg-transparent focus-visible:ring-0 focus-visible:border-[#A0522D] text-xs tracking-widest" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={contactForm.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea 
                            placeholder="YOUR MESSAGE" 
                            className="border-0 border-b border-[#E5E1D8] rounded-none px-0 bg-transparent focus-visible:ring-0 focus-visible:border-[#A0522D] text-xs tracking-widest min-h-[80px] resize-none" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="w-full bg-[#2C3E50] hover:bg-[#1A252F] text-white rounded-full py-6 text-xs font-bold tracking-[0.3em] uppercase"
                    disabled={isSubmittingContact}
                  >
                    {isSubmittingContact ? "SENDING..." : "SEND MESSAGE"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>

      <BookingModal 
        open={isBookingOpen} 
        onOpenChange={setIsBookingOpen} 
        defaultService={selectedService}
      />
    </div>
  );
}
