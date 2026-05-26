"use client";
import { useState, useEffect, useCallback } from "react";
import { getSessionKey } from "@/lib/auth";
import { encryptText, decryptText } from "@/lib/crypto";

const T = {
  bg: "#070707", s1: "#0f0f0f", s2: "#161616", s3: "#1d1d1d",
  br: "#222", br2: "#2c2c2c",
  acc: "#c9f13a", accDk: "#162300", accMd: "#324f00",
  txt: "#f0f0f0", sub: "#6a6a6a",
  bl: "#5ca4f8", blDk: "#0b1e3e",
  rd: "#f87171", or: "#fb923c", orDk: "#281000",
};

const OPENROUTER_MODELS = [
  { id: "google/gemini-2.5-flash", label: "Gemini 2.5 Flash (OR)" },
  { id: "google/gemini-2.5-pro", label: "Gemini 2.5 Pro (OR)" },
  { id: "anthropic/claude-sonnet-4-5", label: "Claude Sonnet 4.5 (OR)" },
  { id: "openai/gpt-4o-mini", label: "GPT-4o Mini (OR)" },
  { id: "meta-llama/llama-4-maverick", label: "Llama 4 Maverick (OR)" },
  { id: "custom", label: "Personalizado..." },
];

const K_GEMINI = "gym_gemini_key";
const K_OR_KEY = "gym_or_key";
const K_OR_MODEL = "gym_or_model";

interface SettingsScreenProps {
  onSaved?: () => void;
}

export default function SettingsScreen({ onSaved }: SettingsScreenProps) {
  const [geminiKey, setGeminiKey] = useState("");
  const [orKey, setOrKey] = useState("");
  const [orModel, setOrModel] = useState("google/gemini-2.5-flash");
  const [customModel, setCustomModel] = useState("");
  const [showGemini, setShowGemini] = useState(false);
  const [showOr, setShowOr] = useState(false);
  const [savedMsg, setSavedMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const [testing, setTesting] = useState(false);

  const loadKeys = useCallback(async () => {
    const key = await getSessionKey();
    if (!key) return;
    setLoading(true);
    try {
      const encGemini = localStorage.getItem(K_GEMINI);
      const encOr = localStorage.getItem(K_OR_KEY);
      const model = localStorage.getItem(K_OR_MODEL);
      if (encGemini) setGeminiKey(await decryptText(encGemini, key));
      if (encOr) setOrKey(await decryptText(encOr, key));
      if (model) {
        const known = OPENROUTER_MODELS.find((m) => m.id === model && m.id !== "custom");
        if (known) {
          setOrModel(model);
        } else {
          setOrModel("custom");
          setCustomModel(model);
        }
      }
    } catch {
      setErrorMsg("Erro ao carregar chaves. Sessão pode ter expirado — recarregue a página.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadKeys();
  }, [loadKeys]);

  const handleSave = async () => {
    if (!geminiKey && !orKey) {
      setErrorMsg("Configure pelo menos uma das chaves para usar o Coach.");
      return;
    }
    setErrorMsg("");
    const key = await getSessionKey();
    if (!key) {
      setErrorMsg("Sessão expirada. Faça login novamente.");
      return;
    }
    try {
      if (geminiKey) {
        localStorage.setItem(K_GEMINI, await encryptText(geminiKey, key));
      } else {
        localStorage.removeItem(K_GEMINI);
      }
      if (orKey) {
        localStorage.setItem(K_OR_KEY, await encryptText(orKey, key));
        const finalModel = orModel === "custom" ? customModel : orModel;
        localStorage.setItem(K_OR_MODEL, finalModel);
      } else {
        localStorage.removeItem(K_OR_KEY);
        localStorage.removeItem(K_OR_MODEL);
      }
      setSavedMsg("Configurações salvas.");
      setTimeout(() => setSavedMsg(""), 3000);
      onSaved?.();
    } catch {
      setErrorMsg("Erro ao salvar. Tente novamente.");
    }
  };

  const handleTest = async () => {
    setTesting(true);
    setSavedMsg("");
    setErrorMsg("");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: "responda apenas: ok" }],
          systemPrompt: "Você é um assistente. Responda de forma brevíssima.",
          geminiKey: geminiKey || undefined,
          openrouterKey: orKey || undefined,
          openrouterModel:
            orModel === "custom" ? customModel : orModel || undefined,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setSavedMsg(`Conexão OK via ${data.provider === "gemini" ? "Gemini" : "OpenRouter"}.`);
      } else {
        setErrorMsg(data.error || "Falha no teste.");
      }
    } catch {
      setErrorMsg("Erro de rede ao testar.");
    } finally {
      setTesting(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "60px 0", color: T.sub }}>
        Carregando...
      </div>
    );
  }

  const finalModel = orModel === "custom" ? customModel : orModel;

  return (
    <div style={{ paddingBottom: 32 }}>
      <div style={{ fontSize: 20, fontWeight: 900, color: T.txt, marginBottom: 4 }}>
        Configurações
      </div>
      <div style={{ fontSize: 13, color: T.sub, marginBottom: 24, lineHeight: 1.5 }}>
        Configure as chaves de API para o Coach. As chaves são criptografadas com
        sua senha e armazenadas localmente.
      </div>

      {/* Gemini */}
      <div style={{
        background: T.s2, border: `1px solid ${geminiKey ? T.accMd : T.br}`,
        borderRadius: 16, padding: "16px", marginBottom: 14,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <div style={{ fontSize: 22 }}>✨</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: T.txt }}>Google Gemini</div>
            <div style={{ fontSize: 12, color: T.sub }}>Gemini 2.5 Flash · Primário</div>
          </div>
          {geminiKey && (
            <div style={{
              marginLeft: "auto", fontSize: 11, background: T.accDk,
              color: T.acc, border: `1px solid ${T.accMd}`,
              borderRadius: 8, padding: "3px 10px", fontWeight: 700,
            }}>
              CONFIGURADO
            </div>
          )}
        </div>
        <div style={{ fontSize: 11, color: T.sub, fontWeight: 700, letterSpacing: 0.8, marginBottom: 8 }}>
          CHAVE DA API
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            type={showGemini ? "text" : "password"}
            value={geminiKey}
            onChange={(e) => setGeminiKey(e.target.value)}
            placeholder="AIza..."
            style={{
              flex: 1, background: T.s1,
              border: `1px solid ${geminiKey ? T.acc : T.br2}`,
              borderRadius: 10, padding: "12px 14px",
              fontSize: 14, color: T.acc, outline: "none",
              fontFamily: geminiKey && !showGemini ? "monospace" : "inherit",
            }}
          />
          <button
            onClick={() => setShowGemini((v) => !v)}
            style={{
              background: T.s3, border: `1px solid ${T.br}`,
              color: T.sub, borderRadius: 10,
              padding: "0 14px", cursor: "pointer", fontSize: 16,
            }}
          >
            {showGemini ? "🙈" : "👁"}
          </button>
        </div>
        {geminiKey && (
          <button
            onClick={() => setGeminiKey("")}
            style={{
              marginTop: 10, background: "none", border: "none",
              color: T.rd, fontSize: 12, cursor: "pointer", padding: 0,
            }}
          >
            Remover chave
          </button>
        )}
      </div>

      {/* OpenRouter */}
      <div style={{
        background: T.s2, border: `1px solid ${orKey ? "#7c3aed44" : T.br}`,
        borderRadius: 16, padding: "16px", marginBottom: 14,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <div style={{ fontSize: 22 }}>🔀</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: T.txt }}>OpenRouter</div>
            <div style={{ fontSize: 12, color: T.sub }}>Fallback — acesso a múltiplos modelos</div>
          </div>
          {orKey && (
            <div style={{
              marginLeft: "auto", fontSize: 11, background: "#1a0d2e",
              color: "#a78bfa", border: "1px solid #7c3aed44",
              borderRadius: 8, padding: "3px 10px", fontWeight: 700,
            }}>
              CONFIGURADO
            </div>
          )}
        </div>

        <div style={{ fontSize: 11, color: T.sub, fontWeight: 700, letterSpacing: 0.8, marginBottom: 8 }}>
          CHAVE DA API
        </div>
        <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
          <input
            type={showOr ? "text" : "password"}
            value={orKey}
            onChange={(e) => setOrKey(e.target.value)}
            placeholder="sk-or-..."
            style={{
              flex: 1, background: T.s1,
              border: `1px solid ${orKey ? "#7c3aed" : T.br2}`,
              borderRadius: 10, padding: "12px 14px",
              fontSize: 14, color: "#a78bfa", outline: "none",
              fontFamily: orKey && !showOr ? "monospace" : "inherit",
            }}
          />
          <button
            onClick={() => setShowOr((v) => !v)}
            style={{
              background: T.s3, border: `1px solid ${T.br}`,
              color: T.sub, borderRadius: 10,
              padding: "0 14px", cursor: "pointer", fontSize: 16,
            }}
          >
            {showOr ? "🙈" : "👁"}
          </button>
        </div>

        <div style={{ fontSize: 11, color: T.sub, fontWeight: 700, letterSpacing: 0.8, marginBottom: 8 }}>
          MODELO
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: orModel === "custom" ? 10 : 0 }}>
          {OPENROUTER_MODELS.map((m) => (
            <button
              key={m.id}
              onClick={() => setOrModel(m.id)}
              style={{
                background: orModel === m.id ? "#1a0d2e" : T.s3,
                border: `1px solid ${orModel === m.id ? "#7c3aed" : T.br}`,
                color: orModel === m.id ? "#a78bfa" : T.sub,
                borderRadius: 8, padding: "7px 12px",
                fontSize: 12, fontWeight: orModel === m.id ? 700 : 400,
                cursor: "pointer",
              }}
            >
              {m.label}
            </button>
          ))}
        </div>
        {orModel === "custom" && (
          <input
            type="text"
            value={customModel}
            onChange={(e) => setCustomModel(e.target.value)}
            placeholder="ex: deepseek/deepseek-r1"
            style={{
              width: "100%", background: T.s1,
              border: `1px solid ${T.br2}`,
              borderRadius: 10, padding: "12px 14px",
              fontSize: 14, color: T.txt, outline: "none",
              boxSizing: "border-box",
            }}
          />
        )}
        {orKey && (
          <button
            onClick={() => setOrKey("")}
            style={{
              marginTop: 10, background: "none", border: "none",
              color: T.rd, fontSize: 12, cursor: "pointer", padding: 0,
            }}
          >
            Remover chave
          </button>
        )}
      </div>

      {/* Status */}
      {errorMsg && (
        <div style={{
          background: "#1a0000", border: "1px solid #3a0000",
          borderRadius: 12, padding: "12px 16px",
          fontSize: 13, color: T.rd, marginBottom: 14, lineHeight: 1.5,
        }}>
          {errorMsg}
        </div>
      )}
      {savedMsg && (
        <div style={{
          background: T.accDk, border: `1px solid ${T.accMd}`,
          borderRadius: 12, padding: "12px 16px",
          fontSize: 13, color: T.acc, marginBottom: 14,
        }}>
          {savedMsg}
        </div>
      )}

      {!geminiKey && !orKey && (
        <div style={{
          background: "#281000", border: "1px solid #fb923c33",
          borderRadius: 12, padding: "12px 14px",
          fontSize: 12, color: T.or, marginBottom: 14, lineHeight: 1.6,
        }}>
          Nenhuma chave configurada. O Coach não funcionará sem ao menos uma chave.
        </div>
      )}

      <div style={{ display: "flex", gap: 10 }}>
        <button
          onClick={handleSave}
          style={{
            flex: 1, background: T.acc, color: "#000",
            border: "none", borderRadius: 14,
            padding: "16px", fontSize: 15, fontWeight: 800,
            cursor: "pointer",
          }}
        >
          Salvar
        </button>
        <button
          onClick={handleTest}
          disabled={testing || (!geminiKey && !orKey)}
          style={{
            background: testing ? T.s3 : T.s2,
            color: testing ? T.sub : T.bl,
            border: `1px solid ${testing ? T.br : T.bl}33`,
            borderRadius: 14, padding: "16px 20px",
            fontSize: 14, fontWeight: 700,
            cursor: testing || (!geminiKey && !orKey) ? "not-allowed" : "pointer",
          }}
        >
          {testing ? "Testando..." : "Testar"}
        </button>
      </div>

      <div style={{ marginTop: 24, padding: "14px 16px", background: T.s2, border: `1px solid ${T.br}`, borderRadius: 12 }}>
        <div style={{ fontSize: 12, color: T.sub, lineHeight: 1.7 }}>
          <strong style={{ color: T.txt }}>Como funciona a criptografia</strong><br />
          As chaves são criptografadas com AES-256-GCM usando uma chave derivada da
          sua senha via PBKDF2 (150k iterações). Apenas você, com sua senha, consegue
          descriptografar. A chave nunca é enviada ao servidor — apenas a versão
          criptografada fica salva localmente.
        </div>
      </div>

      <div style={{ marginTop: 28, borderTop: `1px solid ${T.br}`, paddingTop: 20 }}>
        <div style={{ fontSize: 12, color: T.sub, marginBottom: 12 }}>
          Onde obter as chaves:
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontSize: 13, color: T.sub }}>
            ✨ Gemini: <span style={{ color: T.bl }}>aistudio.google.com</span> → Get API key
          </div>
          <div style={{ fontSize: 13, color: T.sub }}>
            🔀 OpenRouter: <span style={{ color: T.bl }}>openrouter.ai/keys</span>
          </div>
        </div>
      </div>
    </div>
  );
}
