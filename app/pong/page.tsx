"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import AdPlaceholder from "../components/AdPlaceholder"

const CANVAS_WIDTH = 800
const CANVAS_HEIGHT = 400
const PADDLE_WIDTH = 10
const PADDLE_HEIGHT = 100
const BALL_SIZE = 10
const BALL_SPEED = 5

export default function PongGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [score, setScore] = useState({ player: 0, computer: 0 })
  const [gameOver, setGameOver] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number

    const player = {
      y: CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2,
      dy: 0,
    }

    const computer = {
      y: CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2,
      dy: 0,
    }

    const ball = {
      x: CANVAS_WIDTH / 2,
      y: CANVAS_HEIGHT / 2,
      dx: BALL_SPEED,
      dy: BALL_SPEED,
    }

    const drawRect = (x: number, y: number, w: number, h: number, color: string) => {
      ctx.fillStyle = color
      ctx.fillRect(x, y, w, h)
    }

    const drawCircle = (x: number, y: number, r: number, color: string) => {
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.arc(x, y, r, 0, Math.PI * 2, false)
      ctx.closePath()
      ctx.fill()
    }

    const drawScore = (x: number, y: number, score: number) => {
      ctx.fillStyle = "white"
      ctx.font = "30px Arial"
      ctx.fillText(score.toString(), x, y)
    }

    const collision = (b: typeof ball, p: typeof player) => {
      return (
        b.x + BALL_SIZE > p.x &&
        b.x - BALL_SIZE < p.x + PADDLE_WIDTH &&
        b.y + BALL_SIZE > p.y &&
        b.y - BALL_SIZE < p.y + PADDLE_HEIGHT
      )
    }

    const update = () => {
      // Move the player paddle
      player.y += player.dy
      player.y = Math.max(0, Math.min(CANVAS_HEIGHT - PADDLE_HEIGHT, player.y))

      // Move the computer paddle
      computer.y += (ball.y - (computer.y + PADDLE_HEIGHT / 2)) * 0.1
      computer.y = Math.max(0, Math.min(CANVAS_HEIGHT - PADDLE_HEIGHT, computer.y))

      // Move the ball
      ball.x += ball.dx
      ball.y += ball.dy

      // Ball collision with top and bottom walls
      if (ball.y - BALL_SIZE < 0 || ball.y + BALL_SIZE > CANVAS_HEIGHT) {
        ball.dy *= -1
      }

      // Ball collision with paddles
      const paddle = ball.x + BALL_SIZE < CANVAS_WIDTH / 2 ? player : computer

      if (collision(ball, paddle)) {
        const collidePoint = (ball.y - (paddle.y + PADDLE_HEIGHT / 2)) / (PADDLE_HEIGHT / 2)
        const angleRad = (Math.PI / 4) * collidePoint
        const direction = ball.x + BALL_SIZE < CANVAS_WIDTH / 2 ? 1 : -1
        ball.dx = direction * BALL_SPEED * Math.cos(angleRad)
        ball.dy = BALL_SPEED * Math.sin(angleRad)
      }

      // Reset ball if it goes past paddle
      if (ball.x - BALL_SIZE < 0) {
        setScore((prevScore) => ({ ...prevScore, computer: prevScore.computer + 1 }))
        ball.x = CANVAS_WIDTH / 2
        ball.y = CANVAS_HEIGHT / 2
        ball.dx *= -1
      } else if (ball.x + BALL_SIZE > CANVAS_WIDTH) {
        setScore((prevScore) => ({ ...prevScore, player: prevScore.player + 1 }))
        ball.x = CANVAS_WIDTH / 2
        ball.y = CANVAS_HEIGHT / 2
        ball.dx *= -1
      }

      // Check for game over
      if (score.player >= 5 || score.computer >= 5) {
        setGameOver(true)
      }
    }

    const render = () => {
      // Clear canvas
      drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT, "black")

      // Draw paddles
      drawRect(0, player.y, PADDLE_WIDTH, PADDLE_HEIGHT, "white")
      drawRect(CANVAS_WIDTH - PADDLE_WIDTH, computer.y, PADDLE_WIDTH, PADDLE_HEIGHT, "white")

      // Draw ball
      drawCircle(ball.x, ball.y, BALL_SIZE, "white")

      // Draw scores
      drawScore(CANVAS_WIDTH / 4, 50, score.player)
      drawScore((3 * CANVAS_WIDTH) / 4, 50, score.computer)
    }

    const gameLoop = () => {
      update()
      render()
      if (!gameOver) {
        animationFrameId = requestAnimationFrame(gameLoop)
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        player.dy = -5
      } else if (e.key === "ArrowDown") {
        player.dy = 5
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        player.dy = 0
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    gameLoop()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [score, gameOver])

  const resetGame = () => {
    setScore({ player: 0, computer: 0 })
    setGameOver(false)
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-4">Pong Game</h2>
      <canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
      {gameOver && (
        <div className="mt-4">
          <p className="text-xl font-bold mb-2">
            {score.player > score.computer ? "Você venceu!" : "Computador venceu!"}
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

