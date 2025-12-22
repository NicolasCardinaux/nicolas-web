// check-gemini.js
import { GoogleGenerativeAI } from '@google/generative-ai';
import 'dotenv/config';

async function verificarGemini() {
  console.log('🔍 Verificando estado de Gemini...');
  
  if (!process.env.GEMINI_API_KEY) {
    console.log('❌ NO hay API_KEY en .env');
    return;
  }
  
  console.log('✅ API_KEY encontrada');
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    // Intento MINIMO de 1 token
    const result = await model.generateContent("Responde solo con la palabra 'OK'");
    const response = await result.response;
    const text = response.text();
    
    console.log(`✅ Gemini FUNCIONA: "${text}"`);
    console.log('🎉 Tu quota/tokens están ACTIVOS');
    
  } catch (error) {
    console.log('❌ Gemini FALLÓ:');
    console.log('   Error:', error.message);
    
    if (error.message.includes('429') || error.message.includes('quota')) {
      console.log('   🚫 PROBLEMA: QUOTA AGOTADA');
      console.log('   Solución: Necesitas habilitar facturación en Google AI Studio');
    }
  }
}

verificarGemini();