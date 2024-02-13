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

const types: ('straight' | 'square' | 'tTetromino' | 'lTetromino' | 'skew')[] =
  ['straight', 'square', 'tTetromino', 'lTetromino', 'skew']

export class Tetromino {
  public x: number
  public y: number
  public game: Game
  moveDownInterval = 1000
  lastMoveDownTime = 0

  type: 'straight' | 'square' | 'tTetromino' | 'lTetromino' | 'skew' =
    types[Math.floor(Math.random() * types.length)]

  shape: string[][] | string[] = SHAPES[this.type]

  constructor(game: Game) {
    this.game = game
    this.x = 9
    this.y = 0
  }

  update(input: string[], deltaTime: number, timeStamp: number) {
    if (timeStamp - this.lastMoveDownTime > this.moveDownInterval) {
      this.lastMoveDownTime = timeStamp
      this.moveDown()
    }

    if (input.includes('ArrowRight')) {
      this.moveRight()
    } else if (input.includes('ArrowLeft')) {
      this.moveLeft()
    } else if (input.includes('ArrowUp')) {
      this.rotate()
    } else if (input.includes('ArrowDown')) {
      this.moveDown(2)
    }
  }

  moveDown(dy: number = 1) {
    this.y += dy
  }
  moveRight(dx: number = 1) {
    this.x += dx
  }
  moveLeft(dx: number = 1) {
    this.x -= dx
  }
  rotate() {}

  isNextMoveValid() {
    console.log('isNextMoveValid')
  }

  draw(ctx: CanvasRenderingContext2D) {
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
