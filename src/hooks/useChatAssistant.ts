// src/hooks/useChatAssistant.ts

import { useState } from "react";
import { sendMessageToGemini } from "../lib/gemini";
import { systemPrompt } from "../data/assistantPrompt";
import type { ChatMessage } from "../types/chat";

export function useChatAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [isResponding, setIsResponding] = useState(false);

  const sendMessage = async (text: string) => {
    const userMsg: ChatMessage = { role: "user", content: text };

    setMessages((prevMessages) => [...prevMessages, userMsg]);
    setLoading(true);

    try {
      const reply = await sendMessageToGemini([...messages, userMsg], systemPrompt);

      const assistantMsg: ChatMessage = { role: "assistant", content: reply };
      setMessages((prevMessages) => [...prevMessages, assistantMsg]);
      setIsResponding(true);

      setTimeout(() => {
        setIsResponding(false);
      }, Math.min(Math.max(reply.length * 50, 1000), 4000));
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
      const errorMsg: ChatMessage = {
        role: "assistant",
        content:
          "Lo siento, hubo un error al obtener la respuesta de Santiago desde Gemini. ¿Podrías intentar de nuevo?",
      };
      setMessages((prevMessages) => [...prevMessages, errorMsg]);
      setIsResponding(false);
    } finally {
      setLoading(false);
    }
  };

  return { messages, sendMessage, loading, isResponding };
}
