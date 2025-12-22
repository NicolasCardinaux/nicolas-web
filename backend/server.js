import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
// Importamos tu perfil
import { infoNicolas } from './contexto.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ==========================================
// 1. CONFIGURACIÓN (GEMINI 2.5 FLASH)
// ==========================================

if (!process.env.GEMINI_API_KEY) {
  console.error("❌ ERROR CRÍTICO: Falta GEMINI_API_KEY en .env");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash", 
  generationConfig: {
    temperature: 0.6,       // Bajamos un poco la creatividad para que sea más preciso y conciso.
    topP: 0.9,
    maxOutputTokens: 2000,  // Sobrado de espacio para evitar cortes por límite técnico.
  }
});

console.log("🔥 NicoBot Activo | Motor: Gemini 2.5 Flash | Modo: ROBUSTO");

// ==========================================
// 2. FUNCIÓN DE LIMPIEZA "TOLERANCIA CERO"
// ==========================================
function cleanResponse(text) {
  let clean = text.trim();
  
  // 1. Limpieza básica de comillas
  clean = clean.replace(/^["']|["']$/g, '');

  // 2. ALGORITMO DE CORTE SEGURO:
  // Si el texto NO termina en puntuación final (. ! ?), asumimos que se cortó o quedó a medias.
  // En lugar de intentar arreglarlo, BORRAMOS todo desde el último signo de puntuación válido hacia adelante.
  if (!/[.!?]$/.test(clean)) {
    // Buscamos la posición del último punto, exclamación o interrogación.
    const lastPunctuation = Math.max(clean.lastIndexOf('.'), clean.lastIndexOf('!'), clean.lastIndexOf('?'));
    
    if (lastPunctuation !== -1) {
      // Cortamos el texto justo después de ese signo.
      // Ejemplo: "Es un gran profesional. Adema" -> "Es un gran profesional."
      clean = clean.substring(0, lastPunctuation + 1);
    } else {
      // Si no hay NINGÚN punto en todo el texto (caso muy raro), le forzamos uno al final para que no rompa el UI.
      clean += ".";
    }
  }
  
  return clean;
}

// ==========================================
// 3. ENDPOINT DEL CHAT
// ==========================================
app.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.json({ reply: "¡Hola! 👋 Soy el asistente de Nicolás. ¿En qué puedo ayudarte hoy?" });
    }

    console.log(`📩 Usuario: "${message}"`);

    // --- EL PROMPT MAESTRO BLINDADO ---
    // Instrucciones muy estrictas para evitar divagaciones.
    const prompt = `
${infoNicolas}

---
CONTEXTO: Chat en vivo profesional.
USUARIO PREGUNTA: "${message}"

INSTRUCCIONES DE RESPUESTA ESTRICTAS:
1. **VE AL GRANO:** Responde la pregunta inmediatamente.
2. **ESTRUCTURA:** Usa 2 párrafos bien formados. (Máximo 100 palabras).
3. **CIERRE:** Termina OBLIGATORIAMENTE con una pregunta corta para invitar a seguir charlando (ej: "¿Te cuento sobre tal proyecto?").
4. **SEGURIDAD:** Revisa que tu última oración esté completa y tenga punto final.
5. **PROHIBIDO:** No dejes frases abiertas como "y también...", "además de...".

TU RESPUESTA:
`;

    // Generación
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // Aplicamos la limpieza de seguridad
    text = cleanResponse(text);

    console.log(`✅ Bot respondió (${text.length} chars)`);
    res.json({ reply: text });

  } catch (error) {
    console.error("❌ Error Gemini:", error.message);
    res.status(500).json({
      reply: "Tuve un pequeño lapso de conexión. 🧠 ¿Te molestaría preguntarme de nuevo? Quiero asegurarme de responderte completo."
    });
  }
});

// ==========================================
// 4. START
// ==========================================
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});