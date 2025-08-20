// src/App.tsx
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./components/sections/hero/Hero";
import Navbar from "./components/layout/Navbar";
import Technologies from "./components/sections/technologies/Technologies";
import Projects from "./components/sections/projects/Projects";
import Skills from "./components/sections/skills/Skills";
import Contact from "./components/sections/contact/Contact";
import About from "./components/about-me/AboutMe";
import ChatbotModal from "./components/sections/chatbot/ChatbotModal";
import FloatingChatButton from "./components/sections/chatbot/FloatingChatButton";

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);

  const openChat = () => {
    setIsChatOpen(true);
    setHasNewMessage(false);
  };

  const closeChat = () => {
    setIsChatOpen(false);
  };

  const minimizeChat = () => {
    setIsChatOpen(false);
    // Opcionalmente, puedes mostrar una notificación de que el chat está minimizado
  };

  return (
    <Router>
      <div className="bg-black text-white min-h-screen">
        <Navbar />

        <Routes>
          {/* Página principal con todas las secciones */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                <main>
                  <section id="technologies">
                    <Technologies />
                  </section>
                  <Projects />
                  <Skills />
                  <Contact />
                </main>
              </>
            }
          />

          {/* Página profesional de "Acerca de mí" */}
          <Route path="/about" element={<About />} />
        </Routes>

        {/* Botón flotante del chatbot - visible en todas las páginas */}
        <FloatingChatButton 
          onClick={openChat}
          hasNewMessage={hasNewMessage}
        />

        {/* Modal del chatbot */}
        <ChatbotModal
          isOpen={isChatOpen}
          onClose={closeChat}
          onMinimize={minimizeChat}
        />

        {/* Footer opcional */}
        {/* <footer className="bg-gray-900 text-gray-500 text-center p-4">
          &copy; {new Date().getFullYear()} San7imo. Todos los derechos reservados.
        </footer> */}
      </div>
    </Router>
  );
}

export default App;