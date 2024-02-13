import { Game } from '.'

const SHAPES = {
  straight: ['st', 'st', 'st', 'st'],
  square: [
    ['sq', 'sq'],
    ['sq', 'sq'],
  ],
  tTetromino: [
    ['t', 't', 't'],
    ['', 't', ''],
  ],
  lTetromino: [
    ['l', ''],
    ['l', ''],
    ['l', 'l'],
  ],
  skew: [
    ['', 'sk', 'sk'],
    ['sk', 'sk', ''],
  ],
}

export class Tetromino {
  public x: number
  public y: number
  public game: Game
  shape: string[] | string[][] = SHAPES.lTetromino

  constructor(game: Game) {
    this.game = game
    this.x = 6
    this.y = 5
  }

  update(input: string[], deltaTime: number) {
    if (input.includes('ArrowRight')) {
      this.y += 1
    } else if (input.includes('ArrowLeft')) {
      this.y -= 1
    } else if (input.includes('ArrowUp')) {
      this.rotate()
    } else if (input.includes('ArrowDown')) {
    }
  }

  public draw(ctx: CanvasRenderingContext2D) {
    const { x, y } = this

    const blockSize = this.game.canvas.width / 20

    const xPos = x * blockSize
    const yPos = y * blockSize
  }

  public rotate() {}
}
