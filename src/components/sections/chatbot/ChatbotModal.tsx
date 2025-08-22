// src/components/chatbot/ChatbotModal.tsx
import { useEffect, useState, useRef } from "react";
import { useChatAssistant } from "../../../hooks/useChatAssistant";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { X, Minus } from 'lucide-react';

interface ChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMinimize: () => void;
}

const introMessages = [
  "¡Hola! Bienvenido al portafolio de San7imo.",
  "Me alegra saludarte. Soy una versión virtual de Santiago.",
  "Estoy aquí para compartir contigo mi experiencia, habilidades, estudios, valores y estilo de trabajo. Puedo responder preguntas técnicas, personales, o incluso simular una entrevista si lo deseas.",
  "Este asistente está hecho para ayudarte a conocerme mejor cómo persona y cómo profesional.",
  "Puedes chatear conmigo o continuar explorando el portafolio. ¡Bienvenido!"
];

export default function ChatbotModal({ isOpen, onClose, onMinimize }: ChatbotModalProps) {
  const [currentIntroIndex, setCurrentIntroIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [frameIndex, setFrameIndex] = useState(0);
  const [blinkFrameIndex, setBlinkFrameIndex] = useState(0);
  const [isBlinking, setIsBlinking] = useState(false);
  const [input, setInput] = useState("");
  const [thinkingDots, setThinkingDots] = useState("");
  const [hasStartedIntro, setHasStartedIntro] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage, loading, isResponding } = useChatAssistant();

  // Iniciar intro solo cuando se abre el modal por primera vez
  useEffect(() => {
    if (isOpen && !hasStartedIntro) {
      setHasStartedIntro(true);
      setCurrentIntroIndex(0);
    }
  }, [isOpen, hasStartedIntro]);

  // Animar frames al hablar
  useEffect(() => {
    if (!isSpeaking && !isResponding) {
      setFrameIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % 8);
    }, 140);

    return () => clearInterval(interval);
  }, [isSpeaking, isResponding]);

  // Parpadeo cuando está inactivo
  useEffect(() => {
    if (isSpeaking || loading || isResponding || !isOpen) return;

    const blinkInterval = setInterval(() => {
      setIsBlinking(true);

      const sequences = [
        ["blink1", "blink3", "blink2"],
        ["blink2", "blink3", "blink1"],
        ["blink3", "blink2", "blink1"]
      ];

      const currentSequence = sequences[Math.floor(Math.random() * sequences.length)];
      let step = 0;

      const animation = setInterval(() => {
        if (step >= currentSequence.length) {
          clearInterval(animation);
          setIsBlinking(false);
          setBlinkFrameIndex(0);
          return;
        }

        const match = currentSequence[step].match(/\d+/);
        setBlinkFrameIndex(Number(match?.[0] ?? 1));
        step++;
      }, 200);
    }, 5000);

    return () => clearInterval(blinkInterval);
  }, [isSpeaking, loading, isResponding, isOpen]);

  // Mostrar intro mensajes
  useEffect(() => {
    if (!hasStartedIntro || currentIntroIndex >= introMessages.length) return;

    const msg = introMessages[currentIntroIndex];
    const duration = Math.min(Math.max(msg.length * 50, 1000), 4000);

    setIsSpeaking(true);

    const stopTalking = setTimeout(() => {
      setIsSpeaking(false);

      const next = setTimeout(() => {
        setCurrentIntroIndex((prev) => prev + 1);
      }, 1000);

      return () => clearTimeout(next);
    }, duration);

    return () => clearTimeout(stopTalking);
  }, [currentIntroIndex, hasStartedIntro]);

  // Animación de puntos suspensivos
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (loading) {
      intervalId = setInterval(() => {
        setThinkingDots((prev) => (prev.length < 3 ? prev + "." : ""));
      }, 300);
    } else {
      setThinkingDots("");
    }
    return () => clearInterval(intervalId);
  }, [loading]);

  // Scroll automático
  useEffect(() => {
    if (isOpen) {
      scrollRef.current?.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [currentIntroIndex, messages, isOpen]);

  // Enviar mensaje
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading || isResponding) return;
    await sendMessage(input);
    setInput("");
  };

  // Determinar frame de avatar
  let avatarSrc = `/assets/avatar-frames/frame1.png`;

  if (isSpeaking || isResponding) {
    avatarSrc = `/assets/avatar-frames/frame${frameIndex + 1}.png`;
  } else if (isBlinking && blinkFrameIndex > 0) {
    avatarSrc = `/assets/avatar-frames/blink${blinkFrameIndex}.png`;
  }

  // Cerrar modal con Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-2 sm:inset-4 md:inset-8 lg:inset-16 bg-black border border-gray-700 rounded-2xl z-50 flex flex-col overflow-hidden">
        {/* Header del Modal */}
        <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-700 bg-gray-900/50">
          <h2 className="text-white font-mono text-base sm:text-lg">San7imo Assistant</h2>
          <div className="flex gap-1 sm:gap-2">
            <button
              onClick={onMinimize}
              className="p-1.5 sm:p-2 hover:bg-gray-700 rounded-lg transition-colors text-gray-400 hover:text-white"
              title="Minimizar"
            >
              <Minus size={18} className="sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 hover:bg-gray-700 rounded-lg transition-colors text-gray-400 hover:text-white"
              title="Cerrar"
            >
              <X size={18} className="sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Contenido del Chat */}
        <div className="flex-1 flex flex-col sm:flex-row p-3 sm:p-6 overflow-hidden">
          {/* Avatar */}
          <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 mx-auto sm:mr-6 mb-3 sm:mb-0 flex-shrink-0 relative">
            <img
              src={avatarSrc}
              alt="San7imo avatar"
              className="w-full h-full object-contain relative z-10"
            />
            {loading && (
              <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white rounded-full px-2 py-1 text-xs font-bold flex items-center justify-center min-w-6 min-h-6 sm:min-w-8 sm:min-h-8 z-20">
                {thinkingDots}
              </div>
            )}
          </div>

          {/* Chat Container */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 flex flex-col space-y-2 sm:space-y-3 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent"
            >
              {/* Intro Messages */}
              {hasStartedIntro && introMessages.slice(0, currentIntroIndex + 1).map((msg, i) => (
                <div
                  key={`intro-${i}`}
                  className="bg-gray-800/90 backdrop-blur-sm text-white p-2 sm:p-3 rounded-xl border border-gray-700 shadow-md max-w-[85%] sm:max-w-md self-start whitespace-pre-wrap text-sm sm:text-base"
                  style={{ 
                    fontFamily: 'monospace',
                    lineHeight: '1.6',
                    imageRendering: 'pixelated'
                  }}
                >
                  {msg}
                </div>
              ))}

              {/* Chat Messages */}
              {messages
                .filter((m) => m.role !== "system")
                .map((msg, i) => (
                  <div
                    key={`msg-${i}`}
                    style={{ 
                      fontFamily: 'monospace',
                      lineHeight: '1.6',
                      imageRendering: 'pixelated'
                    }}
                    className={`p-2 sm:p-3 rounded-xl shadow-md max-w-[85%] sm:max-w-md text-sm sm:text-base ${
                      msg.role === "user"
                        ? "bg-white/95 backdrop-blur-sm text-black self-end border border-gray-300"
                        : "bg-gray-800/90 backdrop-blur-sm text-white self-start border border-gray-700"
                    }`}
                  >
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                ))}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="mt-3 sm:mt-4 flex items-center space-x-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={loading ? "Santiago está pensando..." : "Escribe algo para San7imo..."}
                className="flex-grow px-3 sm:px-4 py-2 rounded-xl bg-gray-900/90 backdrop-blur-sm border border-gray-700 text-white placeholder-gray-500 outline-none focus:border-blue-500 transition-colors text-sm sm:text-base"
                style={{ 
                  fontFamily: 'monospace',
                  lineHeight: '1.6',
                  imageRendering: 'pixelated'
                }}
                disabled={loading || isResponding}
              />
              <button
                type="submit"
                disabled={loading || isResponding}
                className="bg-white/95 backdrop-blur-sm text-black px-3 sm:px-4 py-2 rounded-xl font-semibold hover:bg-gray-200/95 transition-colors disabled:opacity-50 text-sm sm:text-base whitespace-nowrap"
                style={{ 
                  fontFamily: 'monospace',
                  lineHeight: '1.6',
                  imageRendering: 'pixelated'
                }}
              >
                {loading ? "..." : "Enviar"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}