"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import AdPlaceholder from "../components/AdPlaceholder"

const CELL_SIZE = 20
const GRID_WIDTH = 20
const GRID_HEIGHT = 15

type Direction = "up" | "down" | "left" | "right"

interface Position {
  x: number
  y: number
}

const initialGrid = Array(GRID_HEIGHT)
  .fill(null)
  .map(() => Array(GRID_WIDTH).fill(1))

for (let y = 0; y < GRID_HEIGHT; y++) {
  for (let x = 0; x < GRID_WIDTH; x++) {
    if (x === 0 || y === 0 || x === GRID_WIDTH - 1 || y === GRID_HEIGHT - 1) {
      initialGrid[y][x] = 0
    }
  }
}

export default function PacmanGame() {
  const [grid, setGrid] = useState(initialGrid)
  const [pacman, setPacman] = useState<Position>({ x: 1, y: 1 })
  const [direction, setDirection] = useState<Direction>("right")
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          setDirection("up")
          break
        case "ArrowDown":
          setDirection("down")
          break
        case "ArrowLeft":
          setDirection("left")
          break
        case "ArrowRight":
          setDirection("right")
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  useEffect(() => {
    const moveInterval = setInterval(() => {
      if (gameOver) return

      let newX = pacman.x
      let newY = pacman.y

      switch (direction) {
        case "up":
          newY--
          break
        case "down":
          newY++
          break
        case "left":
          newX--
          break
        case "right":
          newX++
          break
      }

      if (grid[newY][newX] !== 0) {
        if (grid[newY][newX] === 1) {
          setScore((prevScore) => prevScore + 1)
          const newGrid = [...grid]
          newGrid[newY][newX] = 2
          setGrid(newGrid)
        }
        setPacman({ x: newX, y: newY })
      }

      if (score === (GRID_WIDTH - 2) * (GRID_HEIGHT - 2) - 1) {
        setGameOver(true)
      }
    }, 200)

    return () => {
      clearInterval(moveInterval)
    }
  }, [pacman, direction, grid, score, gameOver])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (let y = 0; y < GRID_HEIGHT; y++) {
      for (let x = 0; x < GRID_WIDTH; x++) {
        if (grid[y][x] === 0) {
          ctx.fillStyle = "blue"
          ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
        } else if (grid[y][x] === 1) {
          ctx.fillStyle = "yellow"
          ctx.beginPath()
          ctx.arc(x * CELL_SIZE + CELL_SIZE / 2, y * CELL_SIZE + CELL_SIZE / 2, 2, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    ctx.fillStyle = "yellow"
    ctx.beginPath()
    ctx.arc(
      pacman.x * CELL_SIZE + CELL_SIZE / 2,
      pacman.y * CELL_SIZE + CELL_SIZE / 2,
      CELL_SIZE / 2,
      0.2 * Math.PI,
      1.8 * Math.PI,
    )
    ctx.lineTo(pacman.x * CELL_SIZE + CELL_SIZE / 2, pacman.y * CELL_SIZE + CELL_SIZE / 2)
    ctx.fill()
  }, [grid, pacman])

  const resetGame = () => {
    setGrid(initialGrid)
    setPacman({ x: 1, y: 1 })
    setDirection("right")
    setScore(0)
    setGameOver(false)
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-4">Pac-Man Simplificado</h2>
      <div className="mb-4">Pontuação: {score}</div>
      <canvas
        ref={canvasRef}
        width={GRID_WIDTH * CELL_SIZE}
        height={GRID_HEIGHT * CELL_SIZE}
        className="border-2 border-blue-500"
      />
      {gameOver && (
        <div className="mt-4">
          <p className="text-xl font-bold mb-2">
            {score === (GRID_WIDTH - 2) * (GRID_HEIGHT - 2) - 1 ? "Você venceu!" : "Game Over!"}
          </p>
          <button onClick={resetGame} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Jogar Novamente
          </button>
        </div>
      )}
      <Link href="/" className="mt-4 text-blue-600 hover:underline">
        Voltar para a seleção de jogos
      </Link>
      <AdPlaceholder />
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8997726626133132"
     crossOrigin="anonymous"></script>
    </div>
  )
}

