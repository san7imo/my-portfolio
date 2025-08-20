// src/hooks/useChatAssistant.ts

import { useState } from "react";
import { sendMessageToGemini } from "../lib/gemini"; // ¡Asegúrate que la ruta sea correcta!
import { systemPrompt } from "../data/assistantPrompt";
import type { ChatMessage } from "../types/chat";

export function useChatAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [isResponding, setIsResponding] = useState(false); // Nuevo estado

  const sendMessage = async (text: string) => {
    const userMsg: ChatMessage = { role: "user", content: text };

    setMessages((prevMessages) => [...prevMessages, userMsg]);
    setLoading(true); // Se activa el loading (puntos suspensivos)

    try {
        const reply = await sendMessageToGemini([...messages, userMsg], systemPrompt);

        const assistantMsg: ChatMessage = { role: "assistant", content: reply };
        setMessages((prevMessages) => [...prevMessages, assistantMsg]);
        setIsResponding(true); // Se activa la animación de hablar
        
        // Desactivar isResponding después de un breve tiempo para simular fin de hablar
        // Puedes ajustar este delay basado en la longitud de la respuesta si quieres más precisión
        setTimeout(() => {
            setIsResponding(false);
        }, Math.min(Math.max(reply.length * 50, 1000), 4000)); // Ajusta según la longitud del texto
        
    } catch (error) {
        console.error("Error al enviar mensaje:", error);
        const errorMsg: ChatMessage = { role: "assistant", content: "Lo siento, hubo un error al obtener la respuesta de Santiago. ¿Podrías intentar de nuevo?" };
        setMessages((prevMessages) => [...prevMessages, errorMsg]);
        setIsResponding(false); // Asegurarse de que no esté hablando en caso de error
    } finally {
        setLoading(false); // Se desactiva el loading (puntos suspensivos desaparecen)
    }
  };

  return { messages, sendMessage, loading, isResponding }; // Exportar isResponding
}