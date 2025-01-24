import "./globals.css"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Mini Games Platform",
  description: "Plataforma de mini jogos para momentos de diversão",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8997726626133132"
     crossOrigin="anonymous"></script>
      <body className={`${inter.className} bg-gray-100 min-h-screen`}>
        <header className="bg-blue-600 text-white p-4">
          <h1 className="text-2xl font-bold">Mini Games Platform</h1>
        </header>
        <main className="container mx-auto p-4">{children}</main>
        <footer className="bg-gray-200 p-4 text-center">
          <p>&copy; 2023 Mini Games Platform</p>
        </footer>
      </body>
    </html>
  )
}

