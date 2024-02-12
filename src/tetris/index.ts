import { Tetromino } from './Tetromino'

export class Game {
  isGameOver: boolean = false
  board: (Tetromino | null)[][] = []
  currentTetromino: Tetromino | null = null
  canvas: HTMLCanvasElement

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.initBoard()
  }

  private initBoard() {
    for (let i = 0; i < 20; i++) {
      this.board[i] = []
      for (let j = 0; j < 20; j++) {
        this.board[i][j] = null
      }
    }
  }

  update(deltaTime: number) {
    this.currentTetromino = new Tetromino(this, '0', '')
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.drawBoard(ctx)
    this.currentTetromino?.draw(ctx)
  }

  drawBlock(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    color: string
  ) {
    const BLOCK_SIZE_WIDTH = this.canvas.width / 20
    const BLOCK_SIZE_HEIGHT = this.canvas.height / 20
    ctx.fillStyle = color
    ctx.fillRect(
      x * BLOCK_SIZE_WIDTH,
      y * BLOCK_SIZE_HEIGHT,
      BLOCK_SIZE_WIDTH,
      BLOCK_SIZE_HEIGHT
    )
    ctx.strokeStyle = 'black'
    ctx.strokeRect(
      x * BLOCK_SIZE_WIDTH,
      y * BLOCK_SIZE_HEIGHT,
      BLOCK_SIZE_WIDTH,
      BLOCK_SIZE_HEIGHT
    )
  }

  drawBoard(ctx: CanvasRenderingContext2D) {
    for (let row = 0; row < this.board.length; row++) {
      for (let col = 0; col < this.board[0].length; col++) {
        this.drawBlock(ctx, col, row, 'lightgray')
      }
    }
  }
}
