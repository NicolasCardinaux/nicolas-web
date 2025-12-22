import React, { useState, useRef, useEffect } from 'react';
import { FaPaperPlane, FaTimes, FaCommentDots, FaRedo, FaRobot } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      text: "¡Hola! Soy el asistente virtual de Nicolás Cardinaux. 🤖\n\nEstoy aquí para mostrarte por qué es el profesional que buscas: combina solidez técnica como Analista en Sistemas con creatividad aplicada en proyectos reales.\n\n¿Por dónde te gustaría empezar? 💡", 
      sender: "bot",
      metadata: { procesado_por: 'saludo_inicial' }
    }
  ]);
  
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOptions, setShowOptions] = useState(true);

  const messagesEndRef = useRef(null);

  // Configuración del backend
  const getBackendUrl = () => {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return 'http://localhost:5000';
    }
    return 'https://nicobot-backend.onrender.com'; // ⚠️ CAMBIA ESTO POR TU URL REAL DE RENDER
  };

  const API_URL = `${getBackendUrl()}/chat`;

  // ✅ PREGUNTAS ACTUALIZADAS (CON GIMNASIO)
  const quickQuestions = [
    "🚀 ¿Por qué contratar a Nicolás?",
    "💻 ¿Cuáles son sus mejores proyectos?",
    "🛠️ ¿Qué tecnologías domina?",
    "🏋️‍♂️ ¿Quién es Nicolás fuera del código?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async (messageText) => {
    if (!messageText.trim() || loading) return;

    setShowOptions(false);
    const userMsg = { text: messageText, sender: "user" };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      console.log(`Enviando pregunta a: ${API_URL}`);
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ message: messageText }),
      });

      const data = await response.json();
      
      setMessages(prev => [...prev, { 
        text: data.reply, 
        sender: "bot",
        metadata: data.metadata || { procesado_por: 'backend' }
      }]);
      
    } catch (error) {
      console.error('Error de conexión:', error);
      
      // ✅ FALLBACKS ACTUALIZADOS (ANALISTA)
      let reply = "¡Gracias por tu pregunta! 🤖\n\nNicolás Cardinaux es Analista en Sistemas con sólida formación técnica y experiencia práctica en desarrollo full-stack e IA aplicada.\n\n¿Te gustaría saber más sobre algún proyecto específico?";
      
      const msgLower = messageText.toLowerCase();
      
      if (msgLower.includes('hola') || msgLower.includes('buenas')) {
        reply = "¡Hola! 🤖\n\nSoy el asistente de Nicolás Cardinaux, Analista en Sistemas especializado en desarrollo web e inteligencia artificial aplicada.\n\n¿En qué puedo ayudarte hoy?";
      } else if (msgLower.includes('proyecto') || msgLower.includes('trabajo')) {
        reply = "🤖 **Proyectos destacados de Nicolás:**\n\n📰 **AntiHumo News**: Portal con IA para filtrar desinformación (Python + React)\n🛡️ **Detector de Phishing**: Sistema con redes neuronales para ciberseguridad\n📱 **E-commerce Tech**: Aplicación móvil completa con React Native\n\n¿Querés detalles técnicos de alguno?";
      } else if (msgLower.includes('tecnolog') || msgLower.includes('stack') || msgLower.includes('herramienta')) {
        reply = "🤖 **Stack técnico de Nicolás:**\n\n• **Frontend**: React / React Native\n• **Backend**: Python (especialidad), Node.js\n• **IA/Datos**: Redes neuronales, procesamiento de lenguaje\n• **Infraestructura**: Git, Docker, bases de datos, redes\n\n¿Alguna tecnología específica que te interese?";
      } else if (msgLower.includes('diferente') || msgLower.includes('contratar') || msgLower.includes('por qué')) {
        reply = "🤖 **¿Por qué Nicolás?**\n\n1. **Enfoque de Analista**: Piensa en sistemas completos, no solo en código\n2. **Versatilidad técnica**: Frontend, backend e IA en proyectos reales\n3. **Soluciones prácticas**: Cada proyecto resuelve problemas concretos\n\n¿Buscás habilidades específicas?";
      } else if (msgLower.includes('fuera') || msgLower.includes('quién es') || msgLower.includes('gimnasio')) {
        reply = "🤖 **Fuera del código:**\n\n🏋️‍♂️ Su disciplina en el gimnasio refleja su constancia profesional: la mejora continua es clave.\n⚽ El fútbol le enseñó el valor del trabajo en equipo sincronizado.\n\nEsa mentalidad la lleva a cada proyecto de software.";
      }
      
      setMessages(prev => [...prev, { 
        text: reply, 
        sender: "bot",
        metadata: { procesado_por: 'modo_emergencia' }
      }]);
    } finally {
      setLoading(false);
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    handleSend(input);
  };

  const resetChat = () => {
    setMessages([
      { 
        text: "¡Hola! Soy el asistente virtual de Nicolás Cardinaux. 🤖\n\nEstoy aquí para mostrarte por qué es el profesional que buscas: combina solidez técnica como Analista en Sistemas con creatividad aplicada en proyectos reales.\n\n¿Por dónde te gustaría empezar? 💡", 
        sender: "bot",
        metadata: { procesado_por: 'saludo_inicial' }
      }
    ]);
    setShowOptions(true);
  };

  const gradientStyle = "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500";

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end font-sans">
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-[95vw] sm:w-96 h-[550px] max-h-[80vh] bg-white dark:bg-gray-900 border border-purple-200 dark:border-purple-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className={`${gradientStyle} p-4 flex justify-between items-center text-white`}>
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <FaRobot />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Asistente de Nicolás</h3>
                  <p className="text-sm opacity-90">Analista en Sistemas</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={resetChat}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  title="Reiniciar chat"
                >
                  <FaRedo className="text-sm" />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <FaTimes />
                </button>
              </div>
            </div>

            {/* Mensajes */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900 flex flex-col gap-3">
              {messages.map((msg, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`max-w-[90%] p-3 rounded-2xl ${
                    msg.sender === "user" 
                      ? `${gradientStyle} text-white self-end rounded-br-none` 
                      : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 self-start rounded-bl-none border border-gray-200 dark:border-gray-700"
                  } shadow-sm`}
                >
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              
              {loading && (
                <div className="self-start bg-white dark:bg-gray-800 p-3 rounded-2xl rounded-bl-none border border-gray-200 dark:border-gray-700">
                  <div className="flex gap-1 items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Procesando...</span>
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce"></span>
                      <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></span>
                      <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                    </div>
                  </div>
                </div>
              )}

              {/* Opciones rápidas */}
              {showOptions && messages.length <= 2 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-2 mt-2"
                >
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                    Preguntas frecuentes:
                  </span>
                  <div className="grid grid-cols-1 gap-2">
                    {quickQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleSend(question)}
                        className="text-left text-sm bg-white dark:bg-gray-800 hover:bg-purple-50 dark:hover:bg-gray-700 border border-purple-100 dark:border-purple-900 text-gray-800 dark:text-gray-300 p-3 rounded-xl transition-all hover:shadow-md active:scale-95"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={onFormSubmit} className="p-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escribe tu pregunta..."
                  className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-full px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-purple-500 border border-transparent focus:border-purple-500/50"
                  disabled={loading}
                />
                <button 
                  type="submit" 
                  disabled={loading || !input.trim()}
                  className={`${gradientStyle} text-white p-3 rounded-full shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all`}
                >
                  <FaPaperPlane />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón flotante */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        animate={{ 
          scale: [1, 1.05, 1],
          rotate: isOpen ? 0 : [0, -5, 5, 0]
        }}
        transition={{ 
          scale: { duration: 2, repeat: Infinity },
          rotate: { duration: 0.5 }
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={`${gradientStyle} w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-white text-2xl relative group`}
      >
        <div className="absolute inset-0 bg-white/10 rounded-full group-hover:bg-white/20 transition-colors"></div>
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <FaTimes />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
            >
              <FaCommentDots />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default ChatBot;