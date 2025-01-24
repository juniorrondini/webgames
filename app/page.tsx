import GameSelector from "./components/GameSelector";
import AdPlaceholder from "./components/AdPlaceholder";

export default function Home() {
  return (
    <div className="flex flex-col items-center lg:pl-32 min-h-screen bg-[#121212] text-white p-6 sm:p-8">
      {/* Título modernizado - Ajustado para mobile */}
      <h2 className="text-4xl sm:text-6xl font-extrabold mb-8 sm:mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500 animate-pulse">
        Escolha seu desafio
      </h2>

      {/* Seleção de jogos - Ajustado para responsividade */}
      <div className="relative w-full max-w-5xl bg-[#1E1E1E] shadow-2xl shadow-black rounded-2xl p-6 sm:p-12 transition-all duration-300">
        <GameSelector />
      </div>

      {/* Espaço para anúncios atualizado e alinhado */}
      <div className="mt-8 sm:mt-12 w-full max-w-4xl flex justify-center">
        <AdPlaceholder />
      </div>
    </div>
  );
}
