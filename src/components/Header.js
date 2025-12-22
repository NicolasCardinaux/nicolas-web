import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion'; // 1. IMPORTAMOS FRAMER MOTION
import { ModeToggle } from './theme/mode-toggle';
import { cn } from '../lib/utils';
import { profile } from '../data/profile'; 

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [, setScrolled] = useState(false);

  // Link a tu CV 
  const resumeLink = "https://www.linkedin.com/in/nicol%C3%A1s-cardinaux-a38b03365/"; 

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  const menuItems = [
    { label: 'Sobre Mí', id: 'about' },
    { label: 'Experiencia', id: 'experience' },
    { label: 'Proyectos', id: 'projects' },
    { label: 'Habilidades', id: 'skills' },
    { label: 'Educación', id: 'education' },
    { label: 'Certificaciones', id: 'certifications' },
    { label: 'Contacto', id: 'contact' },
  ];

  return (
    <header className={cn('sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60')}>
      <div className="container">
        <nav className="flex items-center justify-between py-4">
          
          {/* 2. NOMBRE ANIMADO CON LUZ DE FONDO */}
          <motion.button
            className="relative text-lg font-bold text-foreground group"
            onClick={() => scrollToSection('about')}
            whileHover={{ scale: 1.05 }} // Se agranda un poquito
            whileTap={{ scale: 0.95 }}
          >
            {/* LUZ DE FONDO (Glow) */}
            {/* Está oculta (opacity-0) y aparece suavemente al hacer hover */}
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/40 via-purple-500/40 to-pink-500/40 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />

            {/* Texto del nombre */}
            <span className="group-hover:text-primary transition-colors duration-300">
              {profile.name}
            </span>
          </motion.button>
          
          {/* Menú Desktop */}
          <ul className="hidden md:flex items-center gap-6 text-sm">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button 
                  className="hover:text-primary transition-colors cursor-pointer bg-transparent border-none p-0 text-foreground" 
                  onClick={() => scrollToSection(item.id)}
                >
                  {item.label}
                </button>
              </li>
            ))}
            <li>
              <a 
                href={resumeLink} 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 items-center rounded-md border border-border px-3 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Descargar CV
              </a>
            </li>
            <li><ModeToggle /></li>
          </ul>

          {/* Menú Móvil - Botón Hamburguesa */}
          <div className="md:hidden flex items-center gap-2">
            <ModeToggle />
            <button className="text-xl p-2 text-foreground" onClick={toggleMenu} aria-label="Toggle menu">
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </nav>
      </div>

      {/* Menú Móvil - Desplegable */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-background absolute left-0 right-0 shadow-lg">
          <div className="container py-4">
            <ul className="flex flex-col gap-3 text-sm">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button 
                    className="block hover:text-primary py-2 cursor-pointer w-full text-left bg-transparent border-none text-foreground" 
                    onClick={() => scrollToSection(item.id)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li>
                <a 
                  href={resumeLink} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 items-center rounded-md border border-border px-3 text-sm hover:bg-accent hover:text-accent-foreground transition-colors w-full justify-center mt-2"
                >
                  Descargar CV
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;