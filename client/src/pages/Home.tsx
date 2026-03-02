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

import heroImg from "@assets/ChatGPT_Image_Jan_24,_2026,_03_54_35_AM_1772338735947.png";

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
    <div className="min-h-screen bg-[#FAF9F6] text-[#1A1A1A] flex flex-col overflow-x-hidden selection:bg-[#A0522D]/10">
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-[#E2E2E2] transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-2xl tracking-widest text-[#4B5320]">STILLPOINT THERAPY</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.4em] text-[#5D6D7E]">
            <a href="#about" className="hover:text-[#A0522D] transition-all duration-300 relative group">
              À PROPOS
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#A0522D] transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#services" className="hover:text-[#A0522D] transition-all duration-300 relative group">
              SERVICES
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#A0522D] transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#testimonials" className="hover:text-[#A0522D] transition-all duration-300 relative group">
              RESSOURCES
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#A0522D] transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#contact" className="hover:text-[#A0522D] transition-all duration-300 relative group">
              CONTACT
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#A0522D] transition-all duration-300 group-hover:w-full"></span>
            </a>
          </div>
          <div className="flex items-center gap-4">
             <div className="hidden sm:flex gap-3 text-[#5D6D7E]">
                <Instagram className="w-4 h-4 hover:text-[#A0522D] cursor-pointer transition-colors" />
                <Facebook className="w-4 h-4 hover:text-[#A0522D] cursor-pointer transition-colors" />
             </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 lg:pt-0 min-h-screen flex items-center relative overflow-hidden bg-[#FAF9F6]">
        {/* Decorative Elements with the specific earthy palette */}
        <div className="absolute top-[-10%] right-[-10%] w-[60rem] h-[60rem] bg-[#E8EAE3] rounded-full opacity-40 -z-10 blur-[120px]"></div>
        <div className="absolute bottom-[-15%] left-[-10%] w-[50rem] h-[50rem] bg-[#F4EBE8] rounded-full opacity-60 -z-10 blur-[100px]"></div>
        <div className="absolute top-[15%] left-[5%] w-48 h-48 bg-[#DCE2F0] rounded-full opacity-30 -z-10 blur-[60px]"></div>

        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Image with Arch */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="p-6 flex items-center justify-center order-2 md:order-1"
          >
            <div className="relative group">
               <div className="w-[320px] sm:w-[460px] rounded-t-full overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.08)] border-[20px] border-white relative z-10 transition-all duration-1000 group-hover:scale-[1.01] group-hover:shadow-[0_50px_100px_rgba(0,0,0,0.1)]">
                  <img 
                    src={heroImg} 
                    alt="Wafae El Oiriaghli" 
                    className="w-full h-auto object-contain" 
                  />
               </div>
               {/* Earthy accent circles */}
               <div className="absolute -top-12 -left-12 w-56 h-56 bg-[#8A9A5B]/15 rounded-full -z-0 blur-3xl opacity-70 animate-pulse"></div>
               <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-[#A0522D]/15 rounded-full -z-0 blur-2xl opacity-50"></div>
            </div>
          </motion.div>

          {/* Right: Floating Content Box */}
          <motion.div 
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="md:order-2 px-6 flex flex-col items-start"
          >
            <div className="bg-white/50 backdrop-blur-3xl p-10 lg:p-16 rounded-[4.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.03)] border border-white/80 max-w-xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-2 h-full bg-[#A0522D] shadow-[2px_0_10px_rgba(160,82,45,0.1)]"></div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#1A1A1A] leading-[1.1] mb-10 font-black tracking-tight uppercase">
                Fatigué de faire semblant que tout va bien ?
              </h1>
              
              <div className="relative mb-12">
                <p className="text-[#3A4A5B] text-lg md:text-xl lg:text-2xl leading-relaxed font-serif italic text-pretty pl-2 relative">
                  Je m'appelle <span className="text-[#4B5320] font-black not-italic">Wafae El Oiriaghli</span>. Je suis psychothérapeute. Ma mission n'est pas de t'écouter hocher la tête, mais de te donner les outils pour que tu n'aies plus besoin de moi.
                </p>
              </div>

              <Button 
                onClick={() => handleBookNow("Individual Therapy")}
                className="bg-[#2C3E50] hover:bg-[#1A252F] text-white rounded-full px-14 py-9 text-[11px] font-black uppercase tracking-[0.4em] shadow-[0_20px_40px_rgba(44,62,80,0.2)] hover:shadow-[0_25px_50px_rgba(44,62,80,0.3)] hover:-translate-y-1 active:scale-95 transition-all w-full sm:w-auto"
              >
                JE RÉSERVE MA SÉANCE
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Floating 15min Call Reminder - Attention Grabbing */}
      <motion.div 
        initial={{ x: 150, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 2.5, duration: 1, type: "spring", stiffness: 50 }}
        className="fixed bottom-12 right-12 z-[100] hidden lg:block"
      >
        <motion.div 
          animate={{ 
            y: [0, -10, 0],
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          onClick={() => handleBookNow("Free 15min Call")}
          className="relative cursor-pointer group"
        >
          {/* Animated Multi-layered Glow */}
          <div className="absolute inset-0 bg-[#7E8D85] rounded-2xl blur-2xl opacity-10 group-hover:opacity-40 transition-all duration-500 animate-pulse"></div>
          
          <div className="bg-[#7E8D85] text-white px-6 py-4 rounded-2xl shadow-[0_20px_40px_rgba(126,141,133,0.3)] border border-white/40 flex items-center gap-4 relative overflow-hidden group-hover:border-white/60 transition-all">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/10">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div className="relative z-10">
              <p className="text-[9px] font-black tracking-[0.2em] uppercase text-[#F2EDE4] mb-0.5 opacity-90">APPEL OFFERT</p>
              <p className="font-black text-sm leading-tight tracking-tight uppercase">15 MINUTES</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

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
                    <h4 className="font-bold text-[#A0522D] text-lg">SÉANCE SOS</h4>
                    <span className="text-xs font-serif italic text-[#A0522D]">$200</span>
                 </div>
                 <p className="text-xs uppercase tracking-widest text-[#5D6D7E]">Soutien Immédiat</p>
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
                 <h4 className="font-bold text-[#7E8D85] text-lg">APPEL DE 15MIN OFFERT</h4>
                 <p className="text-xs uppercase tracking-widest text-[#5D6D7E]">Premier Contact</p>
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
            <p className="text-xs font-black text-[#4B5320] tracking-[0.4em] uppercase mb-6 flex justify-between items-center max-w-4xl mx-auto">
               <span>VOTRE PARCOURS</span>
               <span className="text-lg normal-case font-serif tracking-normal text-[#2C3E50]">CONSTRUIRE UN AVENIR MEILLEUR ENSEMBLE</span>
               <span>COMMENCE ICI</span>
            </p>
            <p className="text-[#5D6D7E] max-w-2xl mx-auto text-sm leading-relaxed opacity-80 italic font-serif">
              "Le plus beau cadeau que vous puissiez vous faire est de commencer à vous comprendre."
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "INDIVIDUAL THERAPY",
                icon: <div className="relative w-12 h-12 flex items-center justify-center">
                  <div className="absolute inset-0 bg-[#E5E1D8] rounded-full opacity-40 scale-150"></div>
                  <User className="w-8 h-8 text-[#5D6D7E] relative z-10" />
                </div>,
                color: "bg-[#E5E1D8]", // Beige
                price: "$120",
                duration: "50 MIN"
              },
              {
                title: "COUPLES THERAPY",
                icon: <div className="relative w-12 h-12 flex items-center justify-center">
                  <div className="absolute inset-0 bg-[#A0522D] rounded-full opacity-20 scale-150 rotate-45"></div>
                  <Heart className="w-8 h-8 text-[#A0522D] relative z-10" />
                </div>,
                color: "bg-[#F4EBE8]", // Soft Terracotta tint
                price: "$180",
                duration: "50 MIN"
              },
              {
                title: "FAMILY THERAPY",
                icon: <div className="relative w-12 h-12 flex items-center justify-center">
                  <div className="absolute inset-0 bg-[#7E8D85] rounded-full opacity-30 scale-150 -rotate-12"></div>
                  <Users className="w-8 h-8 text-[#5D6D7E] relative z-10" />
                </div>,
                color: "bg-[#7E8D85]", // Sage
                price: "$150",
                duration: "50 MIN"
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
                   <div className="transform transition-transform group-hover:scale-110">
                      {service.icon}
                   </div>
                </div>
                <div className="bg-white p-8 rounded-b-3xl shadow-sm border-t border-[#F9F7F2]">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xs font-bold tracking-[0.2em] text-[#5D6D7E] text-left">{service.title === "INDIVIDUAL THERAPY" ? "THÉRAPIE INDIVIDUELLE" : service.title === "COUPLES THERAPY" ? "THÉRAPIE DE COUPLE" : "THÉRAPIE FAMILIALE"}</h4>
                    <div className="text-right">
                      <span className="block text-xs font-bold text-[#A0522D]">{service.price}</span>
                      <span className="block text-[9px] tracking-widest text-[#5D6D7E] opacity-60">{service.duration}</span>
                    </div>
                  </div>
                  <p className="text-[#5D6D7E] text-xs leading-loose mb-6 text-left">
                    Un accompagnement professionnel adapté à vos besoins. Nous vous offrons un espace de croissance et de guérison.
                  </p>
                  <div className="text-left">
                    <button 
                      onClick={() => handleBookNow(service.title)}
                      className="text-[10px] font-bold tracking-widest uppercase border-b border-[#2C3E50] pb-1 hover:text-[#A0522D] hover:border-[#A0522D] transition-all"
                    >
                      RÉSERVER MAINTENANT
                    </button>
                  </div>
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
             “StillPoint Therapy a créé un espace sûr où je me suis sentie en sécurité, vue et vraiment entendue. J'ai tellement grandi ces derniers mois, et je commence enfin à me sentir à nouveau moi-même.”
           </h2>
           <p className="text-sm font-bold tracking-[0.3em] uppercase text-[#2C3E50]">BREAH DESIGNS</p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-[#F9F7F2]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-[4rem] p-12 md:p-20 shadow-sm border border-[#E5E1D8]">
            <div className="grid md:grid-cols-2 gap-16">
              <div className="space-y-6">
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=123+Serenity+Way+Suite+100" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-foreground/80 hover:text-primary transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold">Location</h4>
                    <p>123 Serenity Way, Suite 100</p>
                    <p className="text-xs text-primary font-bold mt-1">View on Google Maps →</p>
                  </div>
                </a>
                <div className="flex items-center gap-4 text-foreground/80">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-primary">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold">Téléphone</h4>
                    <p>(+1) 234 567 890</p>
                  </div>
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
                          <Input placeholder="NOM" className="border-0 border-b border-[#E5E1D8] rounded-none px-0 bg-transparent focus-visible:ring-0 focus-visible:border-[#A0522D] text-xs tracking-widest" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={contactForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="NUMÉRO DE TÉLÉPHONE" className="border-0 border-b border-[#E5E1D8] rounded-none px-0 bg-transparent focus-visible:ring-0 focus-visible:border-[#A0522D] text-xs tracking-widest" {...field} />
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
                            placeholder="VOTRE MESSAGE" 
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
                    {isSubmittingContact ? "ENVOI EN COURS..." : "ENVOYER LE MESSAGE"}
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
