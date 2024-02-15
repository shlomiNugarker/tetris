import { Tetromino } from './Tetromino'
import { UI } from './UI'

export class Game {
  isGameOver: boolean = false
  points = 0
  boardSize = 30
  spaceWidth = 8
  level = 1
  time = 0
  moveDownInterval = 700
  board: (
    | 'straight'
    | 'square'
    | 'tTetromino'
    | 'lTetromino'
    | 'skew'
    | ''
  )[][] = []

  currentTetromino: Tetromino | null = null
  nextTetromino: Tetromino | null = null
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  UI: UI

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.canvas.width = 600
    this.canvas.height = 600
    this.ctx = canvas.getContext('2d')!
    this.UI = new UI(this)

    this.initBoard()
    this.addTetromino()
  }

  private initBoard() {
    for (let i = 0; i < this.boardSize; i++) {
      this.board[i] = []
      for (let j = 0; j < this.boardSize; j++) {
        this.board[i][j] = ''
      }
    }
  }

  addTetromino() {
    this.currentTetromino = this.nextTetromino || new Tetromino(this)
    this.nextTetromino = new Tetromino(this)
  }

  update(deltaTime: number, timeStamp: number) {
    this.time += deltaTime

    this.currentTetromino?.update(deltaTime, timeStamp)

    if (this.currentTetromino?.isMoveEnd) {
      this.currentTetromino.addTetrominoToMatrix()
      this.checkAndClearFullRows()
      this.addTetromino()

      if (
        !this.currentTetromino.isNextMoveEmpty(
          this.currentTetromino.x,
          this.currentTetromino.y
        )
      ) {
        this.isGameOver = true
        // alert('game over')
      }
    }
  }

  draw() {
    this.drawBoard()
    this.currentTetromino?.draw(this.ctx)
    this.UI.draw(this.ctx)
  }

  checkAndClearFullRows() {
    for (let row = this.board.length - 1; row >= 0; row--) {
      if (this.isRowFull(row)) {
        this.clearRow(row)
        this.moveRowsDown(row)
        row++
        this.points += 10

        if (this.points && this.points % 100 === 0) {
          this.level += 1
          if (this.moveDownInterval > 50) this.moveDownInterval -= 20
        }
      }
    }
  }

  isRowFull(row: number): boolean {
    let isFull = true

    for (let i = 0; i < this.board[row].length - this.spaceWidth; i++) {
      const cell = this.board[row][i]
      if (cell === '') isFull = false
    }
    return isFull
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

  drawBlock(
    x: number,
    y: number,
    fillStyle: string,
    strokeStyle: string = 'white'
  ) {
    const BLOCK_SIZE_WIDTH = this.canvas.width / this.boardSize
    const BLOCK_SIZE_HEIGHT = this.canvas.height / this.boardSize

    this.ctx.fillStyle = fillStyle

    this.ctx.fillRect(
      x * BLOCK_SIZE_WIDTH,
      y * BLOCK_SIZE_HEIGHT,
      BLOCK_SIZE_WIDTH,
      BLOCK_SIZE_HEIGHT
    )
    this.ctx.strokeStyle = strokeStyle

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
        const isGoingToDrawInsideBoardGame =
          col >= 0 && col < this.board[0].length - this.spaceWidth

        if (isGoingToDrawInsideBoardGame) {
          if (this.board[row][col]) {
            const color = this.getBlockColor(this.board[row][col])
            this.drawBlock(col, row, color)
          } else this.drawBlock(col, row, 'lightgray')
        } else if (!isGoingToDrawInsideBoardGame) {
          this.drawBlock(col, row, 'lightblue', 'lightblue')
        }
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
