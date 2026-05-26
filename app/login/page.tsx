"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { isFirstRun, setupPassword, login } from "@/lib/auth";

const T = {
  bg: "#070707", s1: "#0f0f0f", s2: "#161616", br: "#222", br2: "#2c2c2c",
  acc: "#c9f13a", accDk: "#162300", accMd: "#324f00",
  txt: "#f0f0f0", sub: "#6a6a6a", rd: "#f87171",
};

export default function LoginPage() {
  const router = useRouter();
  const [firstRun, setFirstRun] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("gym_session_key")) {
      router.replace("/app");
      return;
    }
    setFirstRun(isFirstRun());
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (firstRun) {
        if (password.length < 4) {
          setError("Senha deve ter pelo menos 4 caracteres.");
          return;
        }
        if (password !== confirm) {
          setError("As senhas não coincidem.");
          return;
        }
        await setupPassword(password);
        router.replace("/app");
      } else {
        const ok = await login(password);
        if (!ok) {
          setError("Senha incorreta.");
          return;
        }
        router.replace("/app");
      }
    } catch {
      setError("Erro ao processar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh", background: T.bg, display: "flex",
      alignItems: "center", justifyContent: "center",
      fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif",
      padding: "0 24px",
    }}>
      <div style={{ width: "100%", maxWidth: 360 }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏋</div>
          <div style={{ fontSize: 26, fontWeight: 900, color: T.acc, letterSpacing: -1 }}>
            Gym Coach
          </div>
          <div style={{ fontSize: 13, color: T.sub, marginTop: 6 }}>
            {firstRun ? "Crie sua senha de acesso" : "Entre com sua senha"}
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <div style={{ fontSize: 11, color: T.sub, fontWeight: 700, letterSpacing: 0.8, marginBottom: 8 }}>
              SENHA
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={firstRun ? "Crie uma senha" : "Digite sua senha"}
              autoFocus
              style={{
                width: "100%", background: T.s2,
                border: `1px solid ${T.br2}`, borderRadius: 14,
                padding: "16px 18px", fontSize: 16, color: T.txt,
                outline: "none", boxSizing: "border-box",
              }}
            />
          </div>

          {firstRun && (
            <div>
              <div style={{ fontSize: 11, color: T.sub, fontWeight: 700, letterSpacing: 0.8, marginBottom: 8 }}>
                CONFIRMAR SENHA
              </div>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Repita a senha"
                style={{
                  width: "100%", background: T.s2,
                  border: `1px solid ${T.br2}`, borderRadius: 14,
                  padding: "16px 18px", fontSize: 16, color: T.txt,
                  outline: "none", boxSizing: "border-box",
                }}
              />
            </div>
          )}

          {error && (
            <div style={{ fontSize: 13, color: T.rd, padding: "10px 14px", background: "#1a0000", borderRadius: 10, border: "1px solid #3a0000" }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            style={{
              background: loading || !password ? T.s2 : T.acc,
              color: loading || !password ? T.sub : "#000",
              border: "none", borderRadius: 14,
              padding: "16px", fontSize: 16, fontWeight: 800,
              cursor: loading || !password ? "not-allowed" : "pointer",
              marginTop: 4, transition: "background 0.2s",
            }}
          >
            {loading ? "Aguarde..." : firstRun ? "Criar senha e entrar" : "Entrar"}
          </button>
        </form>

        {firstRun && (
          <div style={{ marginTop: 20, fontSize: 12, color: T.sub, textAlign: "center", lineHeight: 1.6 }}>
            Sua senha protege as chaves de API.<br />
            Ela não pode ser recuperada se esquecida.
          </div>
        )}
      </div>
    </div>
  );
}
