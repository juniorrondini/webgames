import Link from "next/link"

const games = [
  { name: "Snake", path: "/snake" },
  { name: "Pong", path: "/pong" },
  { name: "Pac-Man", path: "/pacman" },
]

export default function GameSelector() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {games.map((game) => (
        <Link
          key={game.path}
          href={game.path}
          className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
        >
          <h3 className="text-xl font-semibold mb-2">{game.name}</h3>
          <p>Clique para jogar</p>
        </Link>
      ))}
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8997726626133132"
     crossOrigin="anonymous"></script>
    </div>
  )
}

