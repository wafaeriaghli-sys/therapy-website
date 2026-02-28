import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Leaf, Heart, Users, User, Mail, MapPin, Phone, Instagram, Facebook, Loader2 } from "lucide-react";

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
    <div className="min-h-screen bg-background text-foreground flex flex-col overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="w-8 h-8 text-primary" />
            <span className="font-display font-bold text-2xl tracking-wide text-primary">STILLPOINT THERAPY</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest text-foreground/80">
            <a href="#about" className="hover:text-primary transition-colors">About</a>
            <a href="#services" className="hover:text-primary transition-colors">Services</a>
            <a href="#testimonials" className="hover:text-primary transition-colors">Testimonials</a>
            <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
          </div>
          <Button 
            onClick={() => handleBookNow("Individual Therapy")}
            className="rounded-full px-6 bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all text-primary-foreground"
          >
            Let's Connect
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 lg:pt-0 min-h-screen flex items-center relative">
        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-0 min-h-[calc(100vh-5rem)]">
          {/* Left: Image */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="p-6 md:p-12 lg:pr-0 flex items-center justify-center order-2 md:order-1"
          >
            <div className="w-full max-w-md aspect-[4/5] rounded-t-[12rem] overflow-hidden shadow-2xl relative border-8 border-background/50">
              <img 
                src={heroImg} 
                alt="Calm minimal setting" 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent mix-blend-overlay"></div>
            </div>
          </motion.div>

          {/* Right: Curved Shape & Text */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="md:order-2 flex flex-col justify-center px-6 py-16 md:p-16 lg:p-24 relative"
          >
            {/* Background shape only visible on md+ */}
            <div className="hidden md:block absolute right-0 top-0 bottom-0 w-full bg-accent/40 rounded-l-[12rem] -z-10 shadow-inner"></div>
            
            <span className="text-secondary font-bold tracking-widest uppercase mb-4 text-sm flex items-center gap-2">
              <Heart className="w-4 h-4" /> Welcome to Stillpoint
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display leading-[1.1] mb-6 text-foreground">
              Our Therapy & <br/><span className="text-primary italic">Counselling</span> Services
            </h1>
            <p className="text-foreground/70 text-lg mb-10 leading-relaxed max-w-md">
              We provide a safe, warm, and nurturing space to help you navigate life's challenges. Discover balance, healing, and your true self.
            </p>
            <div>
              <Button 
                onClick={() => handleBookNow("Individual Therapy")}
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg py-7 px-10 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                Let's Connect
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-card relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-sm font-bold text-secondary tracking-[0.2em] uppercase mb-4">Building a Better Future Together</h2>
            <h3 className="text-4xl md:text-5xl font-display text-primary max-w-2xl mx-auto leading-tight">
              Compassionate care tailored to your unique journey
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                title: "Family Therapy",
                icon: <Users className="w-6 h-6" />,
                desc: "Navigate family dynamics, improve communication, and rebuild trust within your family system.",
                img: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=1000&auto=format&fit=crop", // family walking outdoors
              },
              {
                title: "Individual Therapy",
                icon: <User className="w-6 h-6" />,
                desc: "One-on-one sessions to process emotions, manage anxiety, and cultivate personal growth.",
                img: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=1000&auto=format&fit=crop", // individual looking peaceful
              },
              {
                title: "Couples Therapy",
                icon: <Heart className="w-6 h-6" />,
                desc: "Strengthen your bond, resolve conflicts, and find a deeper connection with your partner.",
                img: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1000&auto=format&fit=crop", // couple holding hands
              }
            ].map((service, idx) => (
              <motion.div 
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 0.6 }}
                className="group flex flex-col bg-background rounded-t-[8rem] rounded-b-3xl p-4 pb-8 shadow-sm hover:shadow-2xl transition-all duration-500 border border-border/50 relative overflow-hidden"
              >
                <div className="aspect-[3/4] w-full rounded-t-[8rem] rounded-b-xl overflow-hidden mb-6 relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={service.img} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-primary/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <div className="px-4 flex flex-col flex-1">
                  <div className="flex justify-center mb-4 text-secondary">
                    <div className="p-3 bg-secondary/10 rounded-full">{service.icon}</div>
                  </div>
                  <h4 className="text-2xl font-display text-center mb-3 text-foreground">{service.title}</h4>
                  <p className="text-foreground/70 text-center mb-8 flex-1">{service.desc}</p>
                  <Button 
                    onClick={() => handleBookNow(service.title)}
                    variant="outline" 
                    className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-xl py-6 text-lg transition-colors"
                  >
                    Book Now
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section id="testimonials" className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-black/10 blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-8">
              <Leaf className="w-12 h-12 text-primary-foreground/50" />
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display italic leading-tight mb-8">
              "StillPoint Therapy created a safe space for me to heal. I finally feel like I have the tools to move forward."
            </h2>
            <p className="text-lg font-medium tracking-wider uppercase text-primary-foreground/80">— Sarah M.</p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-background relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-display mb-6 text-foreground">Get in Touch</h2>
              <p className="text-foreground/70 mb-10 text-lg">
                Whether you're ready to book your first session or just have some questions, we're here to help. Reach out to us using the form.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-foreground/80">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-primary">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold">Location</h4>
                    <p>123 Wellness Ave, Serenity Suite</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-foreground/80">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-primary">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold">Email</h4>
                    <p>hello@stillpointtherapy.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-foreground/80">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-primary">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold">Phone</h4>
                    <p>(555) 123-4567</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-card p-8 md:p-10 rounded-[2rem] shadow-xl border border-border/50"
            >
              <Form {...contactForm}>
                <form onSubmit={contactForm.handleSubmit(onContactSubmit)} className="space-y-6">
                  <FormField
                    control={contactForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground/80">Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" className="bg-background py-6 rounded-xl" {...field} />
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
                        <FormLabel className="text-foreground/80">Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Your email address" className="bg-background py-6 rounded-xl" {...field} />
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
                        <FormLabel className="text-foreground/80">Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="How can we help you?" 
                            className="bg-background min-h-[120px] rounded-xl resize-none" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 rounded-xl py-6 text-lg font-medium"
                    disabled={isSubmittingContact}
                  >
                    {isSubmittingContact ? (
                      <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...</>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </form>
              </Form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Leaf className="w-8 h-8 text-primary" />
              <span className="font-display font-bold text-2xl tracking-wide">STILLPOINT THERAPY</span>
            </div>
            <p className="text-background/70 max-w-sm mb-8 leading-relaxed">
              Guiding you toward inner peace, resilience, and personal growth with compassionate, professional care.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors text-background">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors text-background">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-display text-xl mb-6">Quick Links</h4>
            <ul className="space-y-4 text-background/70">
              <li><a href="#about" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Our Services</a></li>
              <li><a href="#testimonials" className="hover:text-primary transition-colors">Testimonials</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display text-xl mb-6">Services</h4>
            <ul className="space-y-4 text-background/70">
              <li><a href="#" onClick={(e) => { e.preventDefault(); handleBookNow("Individual Therapy"); }} className="hover:text-primary transition-colors">Individual Therapy</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); handleBookNow("Couples Therapy"); }} className="hover:text-primary transition-colors">Couples Therapy</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); handleBookNow("Family Therapy"); }} className="hover:text-primary transition-colors">Family Therapy</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-background/20 text-center text-background/50 text-sm">
          &copy; {new Date().getFullYear()} StillPoint Therapy. All rights reserved.
        </div>
      </footer>

      <BookingModal 
        open={isBookingOpen} 
        onOpenChange={setIsBookingOpen} 
        defaultService={selectedService}
      />
    </div>
  );
}
