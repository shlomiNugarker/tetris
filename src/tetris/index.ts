import { Tetromino } from './Tetromino'

const ROWS = 20
const COLS = 10
const BLOCK_SIZE = 30

export class Game {
  isGameOver: boolean = false
  board: (Tetromino | null)[][] = []
  currentTetromino: any

  constructor() {
    this.initBoard()
  }

  private initBoard() {
    for (let i = 0; i < 20; i++) {
      this.board[i] = []
      for (let j = 0; j < 10; j++) {
        this.board[i][j] = null
      }
    }
  }

  update(deltaTime: number) {}

  draw(ctx: CanvasRenderingContext2D) {
    const drawBlock = (x: number, y: number, color: string) => {
      ctx.fillStyle = color
      ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE)
      ctx.strokeStyle = 'black'
      ctx.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE)
    }

    function drawBoard() {
      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          drawBlock(col, row, 'lightgray')
        }
      }
    }

    drawBoard()
  }
}
