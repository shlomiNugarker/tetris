import { Game } from '.'

export class InputHandler {
  keys: string[]
  game: Game
  constructor(game: Game) {
    this.keys = []
    this.game = game
    window.addEventListener('keydown', (ev) => {
      if (
        (ev.key === 'ArrowDown' ||
          ev.key === 'ArrowUp' ||
          ev.key === 'ArrowLeft' ||
          ev.key === 'ArrowRight' ||
          ev.key === 'ArrowEnter' ||
          ev.key === 'Enter') &&
        this.keys.indexOf(ev.key) === -1
      ) {
        this.keys.push(ev.key)
      }
    })

    window.addEventListener('keyup', (ev) => {
      if (
        ev.key === 'ArrowDown' ||
        ev.key === 'ArrowUp' ||
        ev.key === 'ArrowLeft' ||
        ev.key === 'ArrowRight' ||
        ev.key === 'ArrowEnter' ||
        ev.key === 'Enter'
      ) {
        this.keys.splice(this.keys.indexOf(ev.key), 1)
      }
    })
  }
}
