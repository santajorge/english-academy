import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "thebee'sniz | Academia de Inglés Online",
  description: "Domina el inglés a tu ritmo. Metodología práctica, acceso de por vida y soporte directo de Carmen Niz.",
  openGraph: {
    title: "thebee'sniz | Academia de Inglés",
    description: "La colmena donde el inglés se vuelve fácil y natural. Únete hoy.",
    url: 'https://thebeesniz.com',
    siteName: "thebee'sniz",
    locale: 'es_ES',
    type: 'website',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${outfit.variable} font-sans antialiased h-full`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
