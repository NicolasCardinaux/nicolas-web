import React, { useState } from 'react';
import { FaLinkedin, FaGithub, FaEnvelope, FaInstagram, FaCheck } from 'react-icons/fa';
import { profile } from '../data/profile';

const Footer = () => {
  // Estado para el copiado del email
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(profile.social.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="mt-16 border-t border-border bg-foreground/[0.02]">
      <div className="container py-10">
        <div className="flex flex-col md:flex-row gap-8 justify-between">
          
          {/* 1. SECCIÓN BIO */}
          <div className="space-y-2 md:max-w-xs">
            <h3 className="text-lg font-semibold">{profile.name}</h3>
            <p className="text-sm text-muted-foreground">
              Analista en Sistemas y Desarrollador de Software apasionado por crear soluciones innovadoras, escalables y de alto rendimiento.
            </p>
          </div>

          {/* 2. SECCIÓN NAVEGACIÓN (DIVIDIDA EN 2 COLUMNAS) */}
          <div>
            <h3 className="text-lg font-semibold">Navegación</h3>
            <div className="flex gap-8 sm:gap-12 mt-3">
              
              {/* Columna Izquierda (4 items) */}
              <ul className="space-y-2 text-sm">
                <li><a className="hover:text-primary transition-colors" href="#about">Sobre Mí</a></li>
                <li><a className="hover:text-primary transition-colors" href="#experience">Experiencia</a></li>
                <li><a className="hover:text-primary transition-colors" href="#projects">Proyectos</a></li>
                <li><a className="hover:text-primary transition-colors" href="#skills">Habilidades</a></li>
              </ul>

              {/* Columna Derecha (3 items) */}
              <ul className="space-y-2 text-sm">
                <li><a className="hover:text-primary transition-colors" href="#education">Educación</a></li>
                <li><a className="hover:text-primary transition-colors" href="#certifications">Certificaciones</a></li>
                <li><a className="hover:text-primary transition-colors" href="#contact">Contacto</a></li>
              </ul>
              
            </div>
          </div>

          {/* 3. SECCIÓN REDES */}
          <div>
            <h3 className="text-lg font-semibold">Redes</h3>
            <ul className="mt-3 flex items-center gap-4">
              <li>
                <a className="hover:text-primary transition-colors" href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <FaLinkedin size={20} />
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href={profile.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <FaGithub size={20} />
                </a>
              </li>
              
              {profile.social.instagram && (
                <li>
                  <a className="hover:text-primary transition-colors" href={profile.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <FaInstagram size={20} />
                  </a>
                </li>
              )}

              {/* Botón copiar email */}
              <li>
                <button 
                  onClick={handleCopy} 
                  className="hover:text-primary transition-colors flex items-center justify-center" 
                  aria-label="Copiar Email"
                >
                  {copied ? <FaCheck size={20} className="text-green-500" /> : <FaEnvelope size={20} />}
                </button>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-8 border-t border-border pt-4 text-center text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} {profile.name}. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;