import { Game } from './index'

export class UI {
  game: Game
  fontFamily: string
  fontSize: number

  constructor(game: Game) {
    this.game = game
    this.fontSize = 30
    this.fontFamily = 'Helvetica'
  }
  draw(ctx: CanvasRenderingContext2D) {}
}
