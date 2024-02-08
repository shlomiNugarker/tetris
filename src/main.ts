import './style.css'
import './tetris/index'
import { Game } from './tetris/index'

const canvas = <HTMLCanvasElement>document.getElementById('canvas')
const ctx = canvas.getContext('2d')!
canvas.width = 300
canvas.height = 500

const game = new Game()

let lastTime = 0

function animate(timeStamp: number) {
  const deltaTime = timeStamp - lastTime
  lastTime = timeStamp
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  game.update(deltaTime)
  game.draw(ctx)
  if (!game.isGameOver) requestAnimationFrame(animate)
}

animate(0)
