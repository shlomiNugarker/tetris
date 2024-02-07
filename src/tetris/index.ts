import { InputHandler } from './InputHandler'

export const BlockTypes = {
  Empty: null,
  straight: [[1, 1, 1, 1]],
  square: [
    [1, 1],
    [1, 1],
  ],
  T: [
    [1, 1, 1],
    [0, 1, 0],
  ],
  L: [
    [1, 0],
    [1, 0],
    [1, 1],
  ],
  skew: [
    [0, 1, 1],
    [1, 1, 0],
  ],
}

export class Game {
  isGameOver: boolean = false
  input: InputHandler
  board: (number[][] | null)[][] = []
  x = 100

  constructor() {
    this.initBoard()
    this.input = new InputHandler()
  }

  private initBoard() {
    for (let i = 0; i < 8; i++) {
      this.board[i] = []
      for (let j = 0; j < 8; j++) {
        this.board[i][j] = BlockTypes.Empty
      }
    }
  }

  update(deltaTime: number) {}

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.x, 100, 50, 0, 2 * Math.PI)
    ctx.fillStyle = 'blue'
    ctx.fill()
    ctx.closePath()
  }
}
