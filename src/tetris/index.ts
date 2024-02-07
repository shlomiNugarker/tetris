import { Board } from './Board'
import { InputHandler } from './InputHandler'

export class Game {
  isGameOver: boolean = false
  input: InputHandler
  board: Board

  constructor() {
    this.board = new Board(this)
    this.input = new InputHandler()
  }

  update(deltaTime: number) {}

  draw(ctx: CanvasRenderingContext2D) {}
}
