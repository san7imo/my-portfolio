// src/App.tsx
import React, { useState, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Hero from "./components/sections/hero/Hero";
import Navbar from "./components/layout/Navbar";
import Technologies from "./components/sections/technologies/Technologies";
import Projects from "./components/sections/projects/Projects";
import Skills from "./components/sections/skills/Skills";
import Contact from "./components/sections/contact/Contact";
import About from "./components/about-me/AboutMe";
import FloatingChatButton from "./components/sections/chatbot/FloatingChatButton";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";

const ChatbotModal = React.lazy(() => import("./components/sections/chatbot/ChatbotModal"));

function AppShell() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const location = useLocation();
  const isPolicyRoute =
    location.pathname === "/politica-tratamiento-datos" ||
    location.pathname === "/politica-privacidad-asistente-documentos-publicos";

  const openChat = () => {
    setIsChatOpen(true);
    setHasNewMessage(false);
  };

  const closeChat = () => {
    setIsChatOpen(false);
  };

  const minimizeChat = () => {
    setIsChatOpen(false);
    // Aquí podrías mostrar notificación de minimizado si quieres
  };

  return (
    <div className="bg-black text-white min-h-screen">
      {!isPolicyRoute && <Navbar />}

      <Routes>
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

        <Route path="/about" element={<About />} />
        <Route path="/politica-tratamiento-datos" element={<PrivacyPolicyPage />} />
        <Route
          path="/politica-privacidad-asistente-documentos-publicos"
          element={<PrivacyPolicyPage />}
        />
      </Routes>

      {!isPolicyRoute && (
        <FloatingChatButton 
          onClick={openChat}
          hasNewMessage={hasNewMessage}
        />
      )}

      <Suspense fallback={<div className="text-white p-4">Cargando asistente...</div>}>
        {!isPolicyRoute && isChatOpen && (
          <ChatbotModal
            isOpen={isChatOpen}
            onClose={closeChat}
            onMinimize={minimizeChat}
          />
        )}
      </Suspense>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppShell />
    </Router>
  );
}

export default App;
