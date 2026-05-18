import type { ChatMessage } from "../types/chat";

export const sendMessageToGemini = async (
  messages: ChatMessage[],
  systemPrompt: string
) => {
  try {
    const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
    const GEMINI_MODEL =
      import.meta.env.VITE_GEMINI_MODEL || "gemini-2.0-flash";

    if (!GEMINI_API_KEY) {
      console.error(
        "GEMINI_API_KEY no está definida en las variables de entorno."
      );
      return "Lo siento, la clave de API para Gemini no está configurada.";
    }

    const latestUserMessage = [...messages]
      .reverse()
      .find((message) => message.role === "user")?.content;

    if (!latestUserMessage?.trim()) {
      return "No recibí una pregunta válida para responder.";
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: systemPrompt }],
          },
          contents: [
            {
              role: "user",
              parts: [{ text: latestUserMessage.trim() }],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorCode = errorData?.error?.code;
      const errorMessage = errorData?.error?.message || response.statusText;
      console.error(
        "Error de Gemini API:",
        response.status,
        response.statusText,
        JSON.stringify(errorData)
      );

      if (response.status === 429) {
        if (errorCode === "RESOURCE_EXHAUSTED") {
          return "Se agotó la cuota gratuita de Gemini temporalmente. Intenta más tarde o revisa tus límites del proyecto en Google AI Studio.";
        }

        const retryAfter = response.headers.get("retry-after");
        if (retryAfter) {
          return `Estoy recibiendo demasiadas solicitudes ahora mismo. Intenta nuevamente en ${retryAfter} segundos.`;
        }

        return "Lo siento, estoy recibiendo demasiadas solicitudes en este momento. Por favor, intenta de nuevo en unos segundos.";
      }

      if (response.status === 401) {
        return "La API key de Gemini es inválida o expiró. Verifica `VITE_GEMINI_API_KEY`.";
      }

      return `Lo siento, ha ocurrido un error al procesar tu mensaje: ${errorMessage}`;
    }

    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (typeof reply === "string" && reply.trim().length > 0) {
      return reply.trim();
    }

    return "Lo siento, no pude generar una respuesta. Hubo un problema con la API de Gemini.";
  } catch (error) {
    console.error("Error al enviar mensaje a Gemini:", error);
    return "Lo siento, ha ocurrido un error inesperado al procesar tu mensaje. Por favor, intenta de nuevo.";
  }
};
