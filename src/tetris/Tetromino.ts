import { Game } from '.'

const SHAPES = {
  straight: [['straight'], ['straight'], ['straight'], ['straight']],
  square: [
    ['square', 'square'],
    ['square', 'square'],
  ],
  tTetromino: [
    ['tTetromino', 'tTetromino', 'tTetromino'],
    ['', 'tTetromino', ''],
  ],
  lTetromino: [
    ['lTetromino', ''],
    ['lTetromino', ''],
    ['lTetromino', 'lTetromino'],
  ],
  skew: [
    ['', 'skew', 'skew'],
    ['skew', 'skew', ''],
  ],
}

const types: ('straight' | 'square' | 'tTetromino' | 'lTetromino' | 'skew')[] =
  ['straight', 'square', 'tTetromino', 'lTetromino', 'skew']

export class Tetromino {
  public x: number
  public y: number
  public game: Game
  moveDownInterval = 1000
  lastMoveDownTime = 0

  private keyState: { [key: string]: boolean } = {}

  type: 'straight' | 'square' | 'tTetromino' | 'lTetromino' | 'skew' =
    types[Math.floor(Math.random() * types.length)]

  shape: string[][] = SHAPES[this.type]

  constructor(game: Game) {
    this.game = game
    this.x = 9
    this.y = -4

    window.addEventListener('keydown', (event) => {
      this.keyState[event.key] = true
    })

    window.addEventListener('keyup', (event) => {
      this.keyState[event.key] = false
    })
  }

  update(_deltaTime: number, timeStamp: number) {
    if (timeStamp - this.lastMoveDownTime > this.moveDownInterval) {
      this.lastMoveDownTime = timeStamp
      this.moveDown()
    }

    if (this.keyState['ArrowRight']) {
      this.moveRight()
      delete this.keyState['ArrowRight']
    } else if (this.keyState['ArrowLeft']) {
      this.moveLeft()
      delete this.keyState['ArrowLeft']
    } else if (this.keyState['ArrowUp']) {
      this.rotate()
      delete this.keyState['ArrowUp']
    } else if (this.keyState['ArrowDown']) {
      this.moveDown(1)
      delete this.keyState['ArrowDown']
    }
  }

  moveDown(dy: number = 1) {
    this.y += dy
  }
  moveRight(dx: number = 1) {
    if (this.x + this.getRightPoint().x === 19) this.x = 0
    else this.x += dx
  }
  moveLeft(dx: number = 1) {
    this.x -= dx
  }
  rotate() {
    const rotatedShape: string[][] = []
    const shape = this.shape
    const rows = shape.length
    const cols = shape[0].length

    for (let col = 0; col < cols; col++) {
      rotatedShape[col] = []
      for (let row = 0; row < rows; row++) {
        rotatedShape[col][row] = shape[rows - row - 1][col]
      }
    }

    const maxX = this.game.board[0].length - rotatedShape[0].length
    const maxY = this.game.board.length - rotatedShape.length
    if (this.x > maxX || this.y > maxY) {
      return
    }

    this.shape = rotatedShape
  }

  isMoveEnd() {
    return this.y + this.getBottomPoint().y === 19
  }

  addTetrominoToMatrix() {
    for (let y = 0; y < this.shape.length; y++) {
      for (let x = 0; x < this.shape[y].length; x++) {
        const matrixX = this.x + x
        const matrixY = this.y + y

        if (
          matrixX >= 0 &&
          matrixX < this.game.board[0].length &&
          matrixY >= 0 &&
          matrixY < this.game.board.length &&
          this.shape[y][x] !== ''
        ) {
          this.game.board[matrixY][matrixX] = this.type
        }
      }
    }
  }

  getBottomPoint() {
    let bottomPoint = { x: 0, y: 0 }
    for (let y = 0; y < this.shape.length; y++) {
      for (let x = 0; x < this.shape[y].length; x++) {
        if (this.shape[y][x] !== '' && y > bottomPoint.y) {
          bottomPoint = { x, y }
        }
      }
    }
    return bottomPoint
  }

  getRightPoint() {
    let rightPoint = { x: 0, y: 0 }
    for (let y = 0; y < this.shape.length; y++) {
      for (let x = 0; x < this.shape[y].length; x++) {
        if (this.shape[y][x] !== '' && x > rightPoint.x) {
          rightPoint = { x, y }
        }
      }
    }
    return rightPoint
  }

  draw(_ctx: CanvasRenderingContext2D) {
    const { x, y } = this
    for (let row = 0; row < this.shape.length; row++) {
      for (let col = 0; col < this.shape[row].length; col++) {
        const blockType = this.shape[row][col]
        if (blockType) {
          const color = this.game.getBlockColor(blockType)
          this.game.drawBlock(x + col, y + row, color)
        }
      }
    }
  }
}
