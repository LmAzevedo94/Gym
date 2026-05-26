import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Gym Coach",
  description: "Treino personalizado + coach IA",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0, padding: 0, background: "#070707" }}>{children}</body>
    </html>
  );
}
