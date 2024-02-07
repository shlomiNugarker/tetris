import { Game } from '.'
import { Tetromino } from './Tetromino'

export const BlockTypes = {
  Empty: [],
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

export class Board {
  game: Game
  board: (Tetromino | null)[][] = []

  constructor(game: Game) {
    this.game = game

    for (let x = 0; x < 8; x++) {
      this.board[x] = []
      for (let y = 0; y < 8; y++) {
        let tetromino = null
        this.board[x][y] = tetromino
      }
    }
  }
}
