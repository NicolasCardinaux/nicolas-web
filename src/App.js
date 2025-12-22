// src/App.js
import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from './components/Header';
import About from './components/About';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot'; 
import { SkeletonGrid } from './components/ui/skeleton';
import './index.css';

// Lazy loading para optimizar el rendimiento
const Experience = React.lazy(() => import('./components/Experience'));
const Projects = React.lazy(() => import('./components/Projects'));
const Skills = React.lazy(() => import('./components/Skills'));
const Education = React.lazy(() => import('./components/Education'));
const Certifications = React.lazy(() => import('./components/Certifications'));
const Contact = React.lazy(() => import('./components/Contact'));
// 1. IMPORTAMOS EL COMPONENTE DE LA FRASE
const Quote = React.lazy(() => import('./components/Quote'));

function App() {
  // Configuración de la URL de tu sitio (cámbialo cuando despliegues)
  const siteUrl = "https://nicolas-cardinaux-portfolio.vercel.app";

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <Helmet>
        {/* Título Principal */}
        <title>Nicolás Cardinaux | Analista en Sistemas & Full Stack Dev</title>
        
        {/* Descripción para Google */}
        <meta name="description" content="Portafolio profesional de Nicolás Cardinaux. Analista en Sistemas y Desarrollador Full Stack especializado en Python, React y soluciones de Inteligencia Artificial." />
        
        {/* Palabras Clave */}
        <meta name="keywords" content="Nicolás Cardinaux, Analista en Sistemas, Desarrollador Full Stack, UADER, Python, React, Django, Portfolio, Argentina, Entre Ríos" />
        
        <meta name="author" content="Nicolás Cardinaux" />
        
        {/* Open Graph (Cómo se ve al compartir en Facebook/LinkedIn) */}
        <meta property="og:title" content="Nicolás Cardinaux - Portafolio Profesional" />
        <meta property="og:description" content="Explora mis proyectos, habilidades y experiencia en desarrollo de software y análisis de sistemas." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Nicolás Cardinaux - Portafolio" />
        <meta name="twitter:description" content="Analista en Sistemas y Desarrollador Full Stack. Mira mis proyectos en Python y React." />
        
        <link rel="canonical" href={siteUrl} />
        
        {/* SEO: Datos Estructurados (JSON-LD) */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Nicolás Cardinaux",
            "url": "${siteUrl}",
            "sameAs": [
              "https://github.com/NicolasCardinaux",
              "https://www.linkedin.com/in/nicolascardinaux"
            ],
            "jobTitle": "Analista en Sistemas & Desarrollador Full Stack",
            "description": "Portafolio de Nicolás Cardinaux, profesional en tecnología enfocado en soluciones escalables, IA y desarrollo web/móvil.",
            "worksFor": {
              "@type": "Organization",
              "name": "Freelance"
            },
            "alumniOf": {
              "@type": "CollegeOrUniversity",
              "name": "UADER - Facultad de Ciencia y Tecnología"
            }
          }
        `}</script>
        
        <meta name="robots" content="index, follow" />
      </Helmet>

      <Header />
      
      <div className="main-content">
        <About />
        <Suspense fallback={<div className="container py-16"><SkeletonGrid count={6} /></div>}>
          <Experience />
          <Projects />
          <Skills />
          <Education />
          <Certifications />
          <Contact />
          
          {/* 2. AGREGAMOS LA FRASE FILOSÓFICA AQUÍ */}
          <Quote />
          
        </Suspense>
      </div>
      
      <Footer />

      <ChatBot />
      
    </div>
  );
}

export default App;