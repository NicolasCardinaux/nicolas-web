import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

const Quote = () => {
  return (
    <section className="relative pt-20 pb-8 sm:pt-24 sm:pb-10 overflow-hidden flex flex-col items-center justify-center text-center px-4 sm:px-6">
      
      {/* Fondo sutil general de la sección */}
      <div className="absolute inset-0 -z-20 flex justify-center items-center">
        <div className="w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] opacity-40" />
      </div>

      {/* WRAPPER PRINCIPAL */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileHover={{ scale: 1.01 }} // Muy sutil
        className="relative max-w-4xl group cursor-default"
      >
        
        {/* ==============================================
            1. GLOW BASE (siempre visible - efecto rim light)
            ============================================== */}
        <div className="absolute -inset-1 
                        bg-gradient-to-r from-blue-500/40 via-purple-500/40 to-pink-500/40 
                        rounded-3xl 
                        blur-md 
                        opacity-60 
                        -z-10" 
        />

        {/* ==============================================
            2. GLOW EXTRA (solo en hover - aparece/desaparece rápido)
            ============================================== */}
        <div className="absolute -inset-2 
                        bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 
                        rounded-3xl 
                        blur-lg 
                        opacity-0 
                        group-hover:opacity-100 
                        transition-all duration-300 ease-out   /* Rápido al entrar y salir */
                        -z-10" 
        />

        {/* Luces pulsantes decorativas (opcional, quedan bien) */}
        <div className="absolute -top-3 -right-3 w-4 h-4 bg-gradient-to-r from-primary to-purple-500 rounded-full blur-sm animate-pulse opacity-50 -z-10" />
        <div className="absolute -bottom-3 -left-3 w-4 h-4 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full blur-sm animate-pulse opacity-50 -z-10" />

        {/* ==============================================
            TARJETA PRINCIPAL (glassmorphism)
            ============================================== */}
        <div className="relative z-10 px-8 py-12 sm:px-12 sm:py-16 rounded-3xl 
                        bg-card/80 dark:bg-card/90
                        backdrop-blur-xl
                        border border-white/10
                        shadow-2xl
                        overflow-hidden"
        >
          <FaQuoteLeft className="absolute -top-6 -left-6 text-7xl sm:text-9xl text-primary/5 -z-10 rotate-12" />

          <h2 className="text-xl sm:text-2xl md:text-3xl font-light italic leading-relaxed text-foreground/90 tracking-wide font-serif relative z-10">
            "Somos lo que hacemos repetidamente. La excelencia, entonces, no es un acto, sino un hábito."
          </h2>

          <div className="flex justify-end mt-6 relative z-10">
            <FaQuoteRight className="text-xl sm:text-2xl text-primary/40" />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 flex flex-col items-center relative z-10"
          >
            <div className="flex items-center gap-2 mb-4 opacity-50">
              <div className="w-8 h-[1px] bg-primary"></div>
              <div className="w-1 h-1 rounded-full bg-primary"></div>
              <div className="w-8 h-[1px] bg-primary"></div>
            </div>
            
            <span className="text-lg sm:text-xl font-bold text-primary tracking-widest uppercase">
              Aristóteles
            </span>
            <span className="text-sm text-muted-foreground mt-2 font-medium">
              Filósofo Griego
            </span>
          </motion.div>
        </div>

      </motion.div>
    </section>
  );
};

export default Quote;