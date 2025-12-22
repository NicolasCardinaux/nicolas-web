import React, { useState } from 'react';
import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Función para copiar correo en esta sección
  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText('contacto.nicolascardinaux@gmail.com');
    toast.success('¡Email copiado al portapapeles!', {
        position: "top-right",
        autoClose: 3000,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://formsubmit.co/ajax/contacto.nicolascardinaux@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast.success('¡Gracias por tu mensaje! Te contactaré pronto.', {
          position: "top-right",
          autoClose: 5000,
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Error al enviar el formulario');
      }
    } catch (error) {
      toast.error('Lo siento, hubo un error al enviar tu mensaje. Por favor intenta más tarde.', {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-24 bg-foreground/[0.02]">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Contacto</h2>
        </div>

        <div className="flex flex-wrap gap-10">
          <div className="flex-1 min-w-[280px]">
            <ToastContainer />
            <h3 className="text-xl font-semibold">Ponte en contacto</h3>
            <p className="text-muted-foreground mt-2">
              Siéntete libre de escribirme para colaboraciones, oportunidades laborales o simplemente para saludar.
            </p>

            <div className="mt-6 space-y-4">
              
              {/* SECCIÓN EMAIL MODIFICADA PARA COPIAR */}
              <div className="flex items-center gap-3 group cursor-pointer" onClick={handleCopyEmail}>
                <FaEnvelope className="text-primary group-hover:scale-110 transition-transform" />
                <span className="hover:text-primary transition-colors">
                  contacto.nicolascardinaux@gmail.com
                </span>
                <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    Copiar
                </span>
              </div>

              <div className="flex items-center gap-3">
                <FaLinkedin className="text-primary" />
                <a href="https://www.linkedin.com/in/nicolascardinaux/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  linkedin.com/in/nicolascardinaux
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FaGithub className="text-primary" />
                <a href="https://github.com/NicolasCardinaux" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  github.com/NicolasCardinaux
                </a>
              </div>
            </div>
          </div>

          <div className="flex-1 min-w-[280px]">
            <form className="rounded-md border border-border bg-card p-5 shadow-sm" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="mb-2 block text-sm font-medium">Nombre</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Tu nombre"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="mb-2 block text-sm font-medium">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Tu email"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="mb-2 block text-sm font-medium">Mensaje</label>
                <textarea
                  id="message"
                  name="message"
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring min-h-[120px]"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tu mensaje..."
                  rows="5"
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;