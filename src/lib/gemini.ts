// src/lib/gemini.ts

import type { ChatMessage } from "../types/chat";

export const sendMessageToGemini = async (
  messages: ChatMessage[],
  systemPrompt: string
) => {
  try {
    const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

    if (!GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY no está definida en las variables de entorno.");
      return "Lo siento, la clave de API para Gemini no está configurada.";
    }

    // Construye el historial de conversación para la API de Gemini
    // El systemPrompt se añade al primer mensaje del usuario.
    const contents: { role: "user" | "model", parts: { text: string }[] }[] = [];

    // Si no hay mensajes previos (primer mensaje del usuario),
    // el systemPrompt se añade al contenido del usuario.
    if (messages.length > 0) {
      contents.push({
        role: "user",
        parts: [{ text: systemPrompt + "\n\n" + messages[0].content }]
      });

      // Añade el resto de los mensajes del historial
      for (let i = 1; i < messages.length; i++) {
        contents.push({
          role: messages[i].role === "user" ? "user" : "model", // 'assistant' de tu tipo se mapea a 'model'
          parts: [{ text: messages[i].content }]
        });
      }
    } else {
        // Esto no debería suceder con la lógica actual de useChatAssistant,
        // pero es una salvaguarda.
        contents.push({
            role: "user",
            parts: [{ text: systemPrompt }]
        });
    }

    // La URL correcta para el modelo Gemini Pro para chat es la siguiente:
    // fíjate que 'generateContent' va después de 'models/gemini-pro'.
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;


    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: contents, // Usa los contenidos construidos
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 700,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Error de Gemini API:", response.status, response.statusText, errorData);

      if (response.status === 429) {
        return "Lo siento, estoy recibiendo demasiadas solicitudes en este momento. Por favor, intenta de nuevo en unos segundos.";
      }
      
      // Mensaje de error más descriptivo basado en la respuesta de la API
      return `Lo siento, ha ocurrido un error al procesar tu mensaje: ${errorData.error?.message || response.statusText}`;
    }

    const data = await response.json();
    console.log("Respuesta de Gemini:", data);

    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
      return data.candidates[0].content.parts[0].text.trim();
    } else if (data.promptFeedback && data.promptFeedback.blockReason) {
      console.warn("Gemini bloqueó la respuesta:", data.promptFeedback.blockReason);
      return "Lo siento, no puedo responder a esa pregunta debido a las políticas de seguridad.";
    } else {
      return "Lo siento, no pude generar una respuesta. Hubo un problema con la API de Gemini.";
    }
  } catch (error) {
    console.error("Error al enviar mensaje a Gemini:", error);
    return "Lo siento, ha ocurrido un error inesperado al procesar tu mensaje. Por favor, intenta de nuevo.";
  }
};