import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mini Games Platform",
  description: "Plataforma de mini jogos para momentos de diversão",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Meta Tags */}
        <title>Mini Games Platform</title>
        <meta name="description" content="Plataforma de mini jogos para momentos de diversão" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Ícone da Guia (Favicon) */}
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />

        {/* Script do Google Ads */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8997726626133132"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className={`${inter.className} bg-[#121212] text-white min-h-screen flex flex-col`}>
        {/* Cabeçalho modernizado */}
        <header className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg py-10 text-center">
          <h1 className="text-5xl font-extrabold tracking-wide uppercase drop-shadow-lg">
            Mini Games Platform
          </h1>
          <p className="text-lg text-gray-300 mt-2">Entre e mostre suas habilidades!</p>
        </header>

        {/* Conteúdo principal */}
        <main className="container mx-auto px-8 py-12 flex-grow">{children}</main>

        {/* Rodapé aprimorado */}
        <footer className="w-full bg-[#1E1E1E] py-6 text-center text-gray-400 border-t border-gray-700">
          <p className="text-md font-medium">
            &copy; {new Date().getFullYear()} Mini Games Platform - Todos os direitos reservados.
          </p>
        </footer>
      </body>
    </html>
  );
}
