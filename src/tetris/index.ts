import { Tetromino } from './Tetromino'

export class Game {
  isGameOver: boolean = false
  board: string[][] = []
  currentTetromino: Tetromino | null = null
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.canvas.width = 500
    this.canvas.height = 500
    this.ctx = canvas.getContext('2d')!

    this.initBoard()
    this.addTetromino()
  }

  private initBoard() {
    for (let i = 0; i < 20; i++) {
      this.board[i] = []
      for (let j = 0; j < 20; j++) {
        this.board[i][j] = ''
      }
    }
  }

  addTetromino() {
    this.currentTetromino = new Tetromino(this)
  }

  update(deltaTime: number, timeStamp: number) {
    this.currentTetromino?.update(deltaTime, timeStamp)
  }

  draw() {
    this.drawBoard()
    this.currentTetromino?.draw(this.ctx)
  }

  drawBlock(x: number, y: number, color: string) {
    const BLOCK_SIZE_WIDTH = this.canvas.width / 20
    const BLOCK_SIZE_HEIGHT = this.canvas.height / 20

    this.ctx.fillStyle = color

    this.ctx.fillRect(
      x * BLOCK_SIZE_WIDTH,
      y * BLOCK_SIZE_HEIGHT,
      BLOCK_SIZE_WIDTH,
      BLOCK_SIZE_HEIGHT
    )
    this.ctx.strokeStyle = 'white'

    this.ctx.strokeRect(
      x * BLOCK_SIZE_WIDTH,
      y * BLOCK_SIZE_HEIGHT,
      BLOCK_SIZE_WIDTH,
      BLOCK_SIZE_HEIGHT
    )
  }

  drawBoard() {
    for (let row = 0; row < this.board.length; row++) {
      for (let col = 0; col < this.board[0].length; col++) {
        if (this.board[row][col]) {
          const color = this.getBlockColor(this.board[row][col])
          this.drawBlock(col, row, color)
        } else this.drawBlock(col, row, 'lightgray')
      }
    }
  }

  getBlockColor(blockType: string): string {
    const colorMap: { [key: string]: string } = {
      st: 'blue',
      sq: 'red',
      t: 'green',
      l: 'black',
      sk: 'orange',
    }
    return colorMap[blockType] || 'lightgray'
  }
}
