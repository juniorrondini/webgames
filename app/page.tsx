import GameSelector from "./components/GameSelector"
import AdPlaceholder from "./components/AdPlaceholder"

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8997726626133132"
     crossOrigin="anonymous"></script>
      <h2 className="text-3xl font-bold mb-6">Escolha um jogo</h2>
      <GameSelector />
      <AdPlaceholder />
    </div>
  )
}

