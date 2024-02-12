import { Game } from '.'

export class Tetromino {
  public x: number
  public y: number
  public rotation: number
  public game: Game
  public type: string
  public color: string

  constructor(game: Game, type: string, color: string) {
    this.game = game
    this.x = 9
    this.y = 4
    this.rotation = 0
    this.type = type
    this.color = color
  }

  public draw(ctx: CanvasRenderingContext2D) {
    const { x, y, color } = this
    const blockSize = this.game.canvas.width / 20

    ctx.fillStyle = color

    const xPos = x * blockSize
    const yPos = y * blockSize

    ctx.fillRect(xPos, yPos, blockSize, blockSize)
    ctx.strokeStyle = 'red'
    ctx.strokeRect(xPos, yPos, blockSize, blockSize)
  }

  public move(dx: number, dy: number) {
    this.x += dx
    this.y += dy
  }

  public rotate() {}
}
