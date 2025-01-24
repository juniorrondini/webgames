"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const games = [
  { name: "Snake", path: "/snake", effect: "snake" },
  { name: "Pong", path: "/pong", effect: "pong" },
  { name: "Pac-Man", path: "/pacman", effect: "pacman" },
];

export default function GameSelector() {
  const [showSnakeEmoji, setShowSnakeEmoji] = useState(false);
  const [pongAnimation, setPongAnimation] = useState(true);
  const [pacmanAnimation, setPacmanAnimation] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowSnakeEmoji(true), 500);
    setTimeout(() => setPacmanAnimation(true), 500);

    setTimeout(() => setShowSnakeEmoji(false), 10000);
    setTimeout(() => setPongAnimation(false), 10000);
    setTimeout(() => setPacmanAnimation(false), 10000);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
        {games.map((game) => (
          <Link key={game.path} href={game.path}>
            <div
              className={`relative bg-[#232323] shadow-lg shadow-black rounded-2xl p-6 md:p-10 text-center 
                          hover:shadow-2xl hover:bg-[#2A2A2A] transition-all duration-300 transform hover:scale-110 
                          ${
                            game.effect === "snake" && showSnakeEmoji
                              ? "animate-snake"
                              : ""
                          }
                          ${game.effect === "pong" && pongAnimation ? "animate-pong" : ""}
                          ${game.effect === "pacman" && pacmanAnimation ? "animate-pacman" : ""}`}
            >
              {/* Nome do jogo sempre visível */}
              <h3 className="text-xl md:text-2xl font-extrabold text-white mb-2 md:mb-3">
                {game.name}
              </h3>
              <p className="text-gray-400 text-sm md:text-lg">Clique para começar</p>

              {/* Efeito da Snake (emoji faz um fade-in/out suave) */}
              {game.effect === "snake" && showSnakeEmoji && (
                <span className="absolute inset-0 flex justify-center items-center text-5xl animate-snake-fade">
                  🐍
                </span>
              )}

              {/* Bolinha do Pong agora indo mais longe */}
              {game.effect === "pong" && pongAnimation && (
                <div className="absolute top-1/2 left-4 w-4 h-4 bg-white rounded-full animate-pong-ball"></div>
              )}

              {/* Efeito Pac-Man: Aparece como um círculo amarelo e desaparece, mas o texto continua */}
              {game.effect === "pacman" && pacmanAnimation && (
                <div className="absolute inset-0 flex justify-center items-center animate-pacman-fade">
                  <div className="w-16 md:w-20 h-16 md:h-20 bg-yellow-500 rounded-full relative">
                    {/* Olho vermelho */}
                    <div className="absolute top-3 left-5 w-3 md:w-4 h-3 md:h-4 bg-red-500 rounded-full"></div>
                    {/* Boca recortada com clip-path */}
                    <div className="absolute inset-0 bg-[#232323] clip-pacman"></div>
                  </div>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
