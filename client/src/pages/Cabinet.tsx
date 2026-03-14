import { motion } from "framer-motion";
import { Instagram, Facebook, ImageIcon } from "lucide-react";

export default function Cabinet() {
  const placeholders = Array.from({ length: 6 });

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1A1A1A] flex flex-col">
      <nav className="fixed w-full z-50 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-[#E2E2E2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <a href="/" className="font-serif font-bold text-2xl tracking-widest text-[#4B5320]">
            WAFAE EL OIRIAGHLI
          </a>
          <div className="hidden md:flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.4em] text-[#5D6D7E]">
            <a href="/#services" className="hover:text-[#A0522D] transition-all duration-300 relative group">
              SERVICES
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#A0522D] transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="/cabinet" className="text-[#A0522D] transition-all duration-300 relative group">
              CABINET
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#A0522D]"></span>
            </a>
            <a href="/#contact" className="hover:text-[#A0522D] transition-all duration-300 relative group">
              CONTACT
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#A0522D] transition-all duration-300 group-hover:w-full"></span>
            </a>
          </div>
          <div className="hidden sm:flex gap-3 text-[#5D6D7E]">
            <Instagram className="w-4 h-4 hover:text-[#A0522D] cursor-pointer transition-colors" />
            <Facebook className="w-4 h-4 hover:text-[#A0522D] cursor-pointer transition-colors" />
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <p className="text-xs font-black text-[#A0522D] tracking-[0.5em] uppercase mb-4">
              UN ESPACE PENSÉ POUR VOUS
            </p>
            <h1 className="text-4xl md:text-6xl font-serif text-[#1A1A1A] leading-tight mb-6 font-medium">
              Le Cabinet
            </h1>
            <div className="w-16 h-0.5 bg-[#A0522D] mx-auto mb-6 opacity-60"></div>
            <p className="text-[#5D6D7E] max-w-xl mx-auto text-base leading-relaxed font-serif italic">
              Un lieu confidentiel, chaleureux et sécurisé — conçu pour que vous puissiez enfin vous déposer.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {placeholders.map((_, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative aspect-[4/3] bg-[#F0EDE6] rounded-3xl overflow-hidden border border-[#E5E1D8] shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-[#C5BBB0]">
                  <div className="w-14 h-14 rounded-2xl bg-[#E5E1D8] flex items-center justify-center">
                    <ImageIcon className="w-6 h-6 text-[#A09590]" />
                  </div>
                  <p className="text-xs font-serif italic text-[#A09590]">Photo du cabinet</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#A0522D]/0 to-transparent group-hover:from-[#A0522D]/5 transition-all duration-500 rounded-3xl"></div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-20 text-center"
          >
            <div className="inline-flex items-center gap-4 bg-white border border-[#E5E1D8] rounded-full px-8 py-4 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-[#7E8D85] animate-pulse"></div>
              <p className="text-sm font-serif italic text-[#5D6D7E]">
                Les photos du cabinet seront ajoutées prochainement.
              </p>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
