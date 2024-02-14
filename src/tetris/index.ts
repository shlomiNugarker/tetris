import { Tetromino } from './Tetromino'

export class Game {
  isGameOver: boolean = false
  board: (
    | 'straight'
    | 'square'
    | 'tTetromino'
    | 'lTetromino'
    | 'skew'
    | ''
  )[][] = []
  currentTetromino: Tetromino | null = null
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.canvas.width = 600
    this.canvas.height = 600
    this.ctx = canvas.getContext('2d')!

    this.initBoard()
    this.addTetromino()
  }

  private initBoard() {
    for (let i = 0; i < 30; i++) {
      this.board[i] = []
      for (let j = 0; j < 30; j++) {
        this.board[i][j] = ''
      }
    }
  }

  addTetromino() {
    this.currentTetromino = new Tetromino(this)
  }

  update(deltaTime: number, timeStamp: number) {
    this.currentTetromino?.update(deltaTime, timeStamp)

    if (this.currentTetromino?.isMoveEnd) {
      this.currentTetromino.addTetrominoToMatrix()
      this.checkAndClearFullRows()
      this.currentTetromino = null
      this.currentTetromino = new Tetromino(this)

      if (
        !this.currentTetromino.isNextMoveEmpty(
          this.currentTetromino.x,
          this.currentTetromino.y
        )
      ) {
        this.isGameOver = true
        alert('game over')
      }
    }
  }

  draw() {
    this.drawBoard()
    this.currentTetromino?.draw(this.ctx)
  }

  checkAndClearFullRows() {
    for (let row = this.board.length - 1; row >= 0; row--) {
      if (this.isRowFull(row)) {
        this.clearRow(row)
        this.moveRowsDown(row)
        row++
      }
    }
  }

  isRowFull(row: number): boolean {
    return this.board[row].every((cell) => cell !== '')
  }

  clearRow(row: number) {
    for (let col = 0; col < this.board[row].length; col++) {
      this.board[row][col] = ''
    }
  }

  moveRowsDown(clearedRow: number) {
    for (let row = clearedRow - 1; row >= 0; row--) {
      for (let col = 0; col < this.board[row].length; col++) {
        this.board[row + 1][col] = this.board[row][col]
      }
    }
    this.board[0].fill('')
  }

  drawBlock(x: number, y: number, color: string) {
    const BLOCK_SIZE_WIDTH = this.canvas.width / 30
    const BLOCK_SIZE_HEIGHT = this.canvas.height / 30

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
      straight: 'blue',
      square: 'red',
      tTetromino: 'green',
      lTetromino: 'black',
      skew: 'orange',
    }
    return colorMap[blockType] || 'lightgray'
  }

  getRandomColor() {
    const red = Math.floor(Math.random() * 256)
    const green = Math.floor(Math.random() * 256)
    const blue = Math.floor(Math.random() * 256)

    const color = 'rgb(' + red + ', ' + green + ', ' + blue + ')'

    return color
  }
}
