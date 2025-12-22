import React, { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import { FaUniversity, FaCode, FaAward, FaExternalLinkAlt, FaGlobe } from 'react-icons/fa';
import { certifications } from '../data/certifications';

const Certifications = () => {
  // Estado para manejar el flip individual de cada tarjeta
  const [flippedCards, setFlippedCards] = useState({});

  const handleFlip = (index) => {
    setFlippedCards((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  // Helper para iconos
  const getIcon = (type) => {
      if (type === 'university') return <FaUniversity size={40} className="mx-auto mb-3 text-primary" />;
      if (type === 'code') return <FaCode size={40} className="mx-auto mb-3 text-primary" />;
      if (type === 'language') return <FaGlobe size={40} className="mx-auto mb-3 text-primary" />;
      // Por defecto retorna el premio (award)
      return <FaAward size={40} className="mx-auto mb-3 text-primary" />;
  };

  return (
    <section id="certifications" className="py-16 sm:py-20 lg:py-24 bg-foreground/[0.02]">
      <div className="container text-center">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Certificaciones y Títulos</h2>
          <p className="mt-2 text-muted-foreground">Logros académicos y reconocimientos técnicos.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {certifications.map((cert, index) => (
            <ReactCardFlip key={index} isFlipped={flippedCards[index] || false} flipDirection="horizontal">
              {/* Front Side */}
              <div 
                className="rounded-md border border-border bg-card p-6 shadow-sm cursor-pointer h-full flex flex-col justify-center items-center min-h-[220px]" 
                onClick={() => handleFlip(index)}
              >
                {getIcon(cert.icon)}
                <h3 className="text-lg font-semibold">{cert.name}</h3>
                <p className="text-sm text-muted-foreground mt-2">Emisor: {cert.issuer}</p>
                <p className="text-sm text-muted-foreground">{cert.period}</p>
                <span className="inline-block mt-4 text-primary font-medium text-sm">Ver Detalles</span>
              </div>

              {/* Back Side */}
              <div 
                className="rounded-md border border-border bg-primary/10 p-4 text-card-foreground cursor-pointer h-full flex flex-col items-center justify-center min-h-[220px]" 
                onClick={() => handleFlip(index)}
              >
                <div className="text-center">
                    <p className="font-semibold mb-4">Certificado Oficial</p>
                    <a 
                        href={cert.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary hover:underline"
                        onClick={(e) => e.stopPropagation()}
                    >
                        Abrir enlace <FaExternalLinkAlt size={12}/>
                    </a>
                </div>
              </div>
            </ReactCardFlip>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;