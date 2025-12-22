import profilePic from "../Assets/Nicolascardinaux.jpg"; 
// Importamos el video local
import profileVideo from "../Assets/nicoperfil.mp4";

export const profile = {
  name: "Nicolás Cardinaux",
  titles: ["Analista en Sistemas", "Full Stack Developer", "Diseño Web, IA y Soluciones"],
  bio: [
    "Como Analista en Sistemas, fusiono el Diseño Web moderno con la potencia del Backend. Creo interfaces intuitivas en React y Next.js, respaldadas por lógica robusta en Python y Django.",
    "Integro Inteligencia Artificial y ciberseguridad para potenciar mis desarrollos, enfocándome siempre en arquitecturas limpias, eficientes y escalables.",
    "Mi objetivo es brindar Soluciones: ya sea una app móvil, un sistema web o una automatización compleja, me adapto a lo que el proyecto necesite para resolver problemas reales.",
  ],
  // Usamos el video importado
  video: profileVideo, 
  image: profilePic,
  social: {
    email: "contacto.nicolascardinaux@gmail.com",
    linkedin: "https://www.linkedin.com/in/nicol%C3%A1s-cardinaux-a38b03365/", 
    github: "https://github.com/NicolasCardinaux",
    instagram: "https://www.instagram.com/cardinauxnicolas?igsh=cWxhd3luamsyM25x",
  },
};