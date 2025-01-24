"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import AdPlaceholder from "../components/AdPlaceholder"

const GRID_SIZE = 20
const CELL_SIZE = 20
const INITIAL_SNAKE = [{ x: 10, y: 10 }]
const INITIAL_DIRECTION = { x: 1, y: 0 }
const INITIAL_FOOD = { x: 15, y: 15 }

export default function SnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE)
  const [direction, setDirection] = useState(INITIAL_DIRECTION)
  const [food, setFood] = useState(INITIAL_FOOD)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)

  const moveSnake = useCallback(() => {
    if (gameOver) return

    const newSnake = [...snake]
    const head = {
      x: (newSnake[0].x + direction.x + GRID_SIZE) % GRID_SIZE,
      y: (newSnake[0].y + direction.y + GRID_SIZE) % GRID_SIZE,
    }

    if (head.x === food.x && head.y === food.y) {
      setFood({
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      })
      setScore((prevScore) => prevScore + 1)
    } else {
      newSnake.pop()
    }

    newSnake.unshift(head)

    if (newSnake.slice(1).some((segment) => segment.x === head.x && segment.y === head.y)) {
      setGameOver(true)
      return
    }

    setSnake(newSnake)
  }, [snake, direction, food, gameOver])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          setDirection({ x: 0, y: -1 })
          break
        case "ArrowDown":
          setDirection({ x: 0, y: 1 })
          break
        case "ArrowLeft":
          setDirection({ x: -1, y: 0 })
          break
        case "ArrowRight":
          setDirection({ x: 1, y: 0 })
          break
      }
    }

    window.addEventListener("keydown", handleKeyPress)

    const gameLoop = setInterval(moveSnake, 100)

    return () => {
      window.removeEventListener("keydown", handleKeyPress)
      clearInterval(gameLoop)
    }
  }, [moveSnake])

  const resetGame = () => {
    setSnake(INITIAL_SNAKE)
    setDirection(INITIAL_DIRECTION)
    setFood(INITIAL_FOOD)
    setGameOver(false)
    setScore(0)
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-4">Snake Game</h2>
      <div className="mb-4">Pontuação: {score}</div>
      <div
        className="border-2 border-gray-400"
        style={{
          width: GRID_SIZE * CELL_SIZE,
          height: GRID_SIZE * CELL_SIZE,
          position: "relative",
        }}
      >
        {snake.map((segment, index) => (
          <div
            key={index}
            className="bg-green-500"
            style={{
              position: "absolute",
              width: CELL_SIZE,
              height: CELL_SIZE,
              left: segment.x * CELL_SIZE,
              top: segment.y * CELL_SIZE,
            }}
          />
        ))}
        <div
          className="bg-red-500"
          style={{
            position: "absolute",
            width: CELL_SIZE,
            height: CELL_SIZE,
            left: food.x * CELL_SIZE,
            top: food.y * CELL_SIZE,
          }}
        />
      </div>
      {gameOver && (
        <div className="mt-4">
          <p className="text-xl font-bold mb-2">Game Over!</p>
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

