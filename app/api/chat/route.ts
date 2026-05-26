import { NextRequest, NextResponse } from "next/server";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatRequest {
  messages: Message[];
  systemPrompt: string;
  geminiKey?: string;
  openrouterKey?: string;
  openrouterModel?: string;
}

async function callGemini(
  messages: Message[],
  systemPrompt: string,
  apiKey: string
): Promise<string> {
  const contents = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents,
        generationConfig: { maxOutputTokens: 1500 },
      }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Gemini ${res.status}: ${err}`);
  }

  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Gemini: resposta vazia");
  return text;
}

async function callOpenRouter(
  messages: Message[],
  systemPrompt: string,
  apiKey: string,
  model: string
): Promise<string> {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "HTTP-Referer": "https://gym-app.vercel.app",
      "X-Title": "Gym Coach",
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        ...messages.map((m) => ({ role: m.role, content: m.content })),
      ],
      max_tokens: 1500,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenRouter ${res.status}: ${err}`);
  }

  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content;
  if (!text) throw new Error("OpenRouter: resposta vazia");
  return text;
}

export async function POST(req: NextRequest) {
  let body: ChatRequest;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const { messages, systemPrompt, geminiKey, openrouterKey, openrouterModel } = body;

  if (!geminiKey && !openrouterKey) {
    return NextResponse.json(
      { error: "Configure pelo menos uma chave de API nas Configurações." },
      { status: 400 }
    );
  }

  if (geminiKey) {
    try {
      const reply = await callGemini(messages, systemPrompt, geminiKey);
      return NextResponse.json({ reply, provider: "gemini" });
    } catch (e) {
      if (!openrouterKey) {
        return NextResponse.json(
          { error: `Gemini falhou: ${(e as Error).message}` },
          { status: 502 }
        );
      }
    }
  }

  if (openrouterKey) {
    try {
      const model = openrouterModel || "google/gemini-2.5-flash";
      const reply = await callOpenRouter(messages, systemPrompt, openrouterKey, model);
      return NextResponse.json({ reply, provider: "openrouter" });
    } catch (e) {
      return NextResponse.json(
        { error: `OpenRouter falhou: ${(e as Error).message}` },
        { status: 502 }
      );
    }
  }

  return NextResponse.json({ error: "Sem provedor disponível" }, { status: 500 });
}
