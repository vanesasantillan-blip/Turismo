import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json({ limit: "30kb" }));
app.use(express.static(path.join(__dirname, "public")));

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/api/chat", async (req, res) => {
  try {
    const messages = req.body.messages;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "No se recibió ninguna consulta." });
    }

    // Validación básica del contenido recibido.
    const validMessages = messages.slice(-12).filter(message =>
      message &&
      ["user", "assistant"].includes(message.role) &&
      typeof message.content === "string" &&
      message.content.trim().length > 0 &&
      message.content.length <= 500
    );

    if (validMessages.length === 0 || validMessages[validMessages.length - 1].role !== "user") {
      return res.status(400).json({ error: "La consulta no es válida." });
    }

    const result = await openai.responses.create({
      model: "gpt-5.5",
      instructions: `Sos TravelAI, un asistente virtual especializado en turismo.
Respondé siempre en español, con un tono amable, claro y sencillo.
Ayudá con destinos, atractivos turísticos, actividades, cultura, gastronomía,
recorridos e ideas para organizar viajes. Cuando sea útil, organizá la respuesta
con títulos y listas. Si te preguntan por precios, horarios, clima o información
actual, aclarà que pueden cambiar y que deben verificarse en fuentes oficiales.
No inventes datos concretos. Si la pregunta no está relacionada con turismo,
respondé brevemente y explicá que tu especialidad es ayudar a planificar viajes.`,
      input: validMessages
    });

    res.json({ answer: result.output_text || "No pude generar una respuesta. Probá nuevamente." });
  } catch (error) {
    console.error("Error al consultar la IA:", error.message);
    res.status(500).json({ error: "Ocurrió un problema al consultar el asistente." });
  }
});

app.listen(PORT, () => {
  console.log(`TravelAI está funcionando en http://localhost:${PORT}`);
});
