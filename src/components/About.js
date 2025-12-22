import React, { useState } from 'react';
import { FaLinkedin, FaGithub, FaEnvelope, FaInstagram, FaCheck, FaQuoteLeft } from "react-icons/fa";
import { ReactTyped } from 'react-typed';
import { profile } from '../data/profile';
import { motion } from 'framer-motion';

const About = () => {
  const [copied, setCopied] = useState(false);
  
  // ESTADOS HÍBRIDOS:
  const [isHovered, setIsHovered] = useState(false); // Detecta el mouse
  const [isClicked, setIsClicked] = useState(false); // Detecta el "candado" (click)

  // La tarjeta se gira SI: El mouse está encima (Hover) O SI se hizo click (Candado)
  const isFlipped = isHovered || isClicked;

  const handleCopy = () => {
    navigator.clipboard.writeText(profile.social.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); 
  };

  return (
    <section
      id="about"
      className="container py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      
      {/* Fondo animado */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-0 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-purple-500/10 rounded-full blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, -30, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-400/10 to-orange-500/10 rounded-full blur-3xl"
          animate={{ x: [0, -40, 0], y: [0, 40, 0], scale: [1, 0.8, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-green-400/5 to-blue-500/5 rounded-full blur-2xl"
          animate={{ x: [0, 20, 0], y: [0, 20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <div className="flex flex-col-reverse md:flex-row items-center gap-10">
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}>
          
          <motion.h3
            className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}>
            Hola, soy <span className="text-primary">Nicolás</span><br/>
            
            <ReactTyped
              strings={profile.titles}
              typeSpeed={40}
              backSpeed={20}
              backDelay={1500}
              loop
              smartBackspace={false}
              className="typed-text bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent"
            />
          </motion.h3>
          
          {profile.bio.map((p, i) => (
            <motion.p
              key={i}
              className="mt-3 text-muted-foreground text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}>
              {p}
            </motion.p>
          ))}
        </motion.div>

        {/* ---------------- SECCIÓN DERECHA (VIDEO / TARJETA GIRATORIA) ---------------- */}
        <motion.div
          className="flex-1 w-full flex flex-col items-center gap-4"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}>
          
          <div className="relative group w-full max-w-sm">
            
            {/* Luces de fondo (Blobs) */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-lg blur-lg opacity-20"
              animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.3, 0.2] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="absolute -top-2 -right-2 w-3 h-3 bg-gradient-to-r from-primary to-purple-500 rounded-full animate-pulse" />
            <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full animate-pulse" />
            
            {/* CONTENEDOR DE EVENTOS
                Combina onMouseEnter/Leave (Hover) y onClick (Candado)
            */}
            <div 
              className="relative w-full aspect-square rounded-2xl cursor-pointer"
              style={{ perspective: "1000px" }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => setIsClicked(!isClicked)} // Alterna el candado
            >
              {/* TARJETA ANIMADA
                  Usa la variable combinada 'isFlipped'
              */}
              <motion.div
                className="w-full h-full relative"
                style={{ transformStyle: "preserve-3d" }}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
              >
                
                {/* --- CARA FRONTAL (VIDEO) --- */}
                <div 
                  className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden border border-border/50 bg-card/50 backdrop-blur-sm shadow-lg"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div className="absolute inset-0 z-20 bg-transparent"></div>
                  <video
                    src={profile.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* --- CARA TRASERA (FRASE) --- */}
                <div 
                  className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden border border-primary/20 bg-card/95 backdrop-blur-md shadow-xl flex flex-col items-center justify-center p-6 text-center"
                  style={{ 
                    backfaceVisibility: "hidden", 
                    transform: "rotateY(180deg)" 
                  }}
                >
                  <FaQuoteLeft className="text-4xl text-primary/20 mb-4" />
                  
                  <p className="text-lg sm:text-xl font-medium italic text-foreground/90 leading-relaxed mb-6">
                    “No busco certezas absolutas, sino decisiones bien pensadas.”
                  </p>

                  <div className="w-12 h-1 bg-gradient-to-r from-primary to-purple-500 rounded-full mb-3"></div>
                  <h4 className="text-primary font-bold text-lg tracking-wide">
                    Nicolás Cardinaux
                  </h4>
                  <span className="text-xs text-muted-foreground uppercase tracking-widest mt-1">
                    Analista en Sistemas
                  </span>
                </div>

              </motion.div>
            </div>
          </div>

          <motion.div
            className="flex items-center gap-4 text-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}>
            
            <motion.a
              href={profile.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2 rounded-lg bg-gradient-to-r from-primary/10 to-purple-500/10 hover:from-primary/20 hover:to-purple-500/20 transition-all duration-300 hover:scale-110 border border-border/50"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}>
              <FaLinkedin />
            </motion.a>
            
            <motion.a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2 rounded-lg bg-gradient-to-r from-primary/10 to-purple-500/10 hover:from-primary/20 hover:to-purple-500/20 transition-all duration-300 hover:scale-110 border border-border/50"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.95 }}>
              <FaGithub />
            </motion.a>

            {profile.social.instagram && (
              <motion.a
                href={profile.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-2 rounded-lg bg-gradient-to-r from-primary/10 to-purple-500/10 hover:from-primary/20 hover:to-purple-500/20 transition-all duration-300 hover:scale-110 border border-border/50"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}>
                <FaInstagram />
              </motion.a>
            )}

            <motion.button
              onClick={handleCopy}
              aria-label="Copiar Email"
              className="p-2 rounded-lg bg-gradient-to-r from-primary/10 to-purple-500/10 hover:from-primary/20 hover:to-purple-500/20 transition-all duration-300 hover:scale-110 border border-border/50 relative"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.95 }}>
              {copied ? (
                <FaCheck className="text-green-500" />
              ) : (
                <FaEnvelope />
              )}
              {copied && (
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-primary text-primary-foreground px-2 py-1 rounded shadow-lg animate-fade-in whitespace-nowrap">
                  ¡Copiado!
                </span>
              )}
            </motion.button>
            
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;