import './style.css'
import './tetris/index'
import { Game } from './tetris/index'

function startNewGame() {
  const canvas = <HTMLCanvasElement>document.getElementById('canvas')
  let game = new Game(canvas)

  let lastTime = 0

  function gameLoop(timeStamp: number) {
    const deltaTime = timeStamp - lastTime
    lastTime = timeStamp
    game.update(deltaTime, timeStamp)
    game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height)
    game.draw()
    if (!game.isGameOver) {
      requestAnimationFrame(gameLoop)
    } else {
      game = new Game(canvas)
      lastTime = 0
      requestAnimationFrame(gameLoop)
    }
  }

  gameLoop(0)
}

startNewGame()
