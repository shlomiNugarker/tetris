import { Game } from '.'

export class InputHandler {
  keys: string[]

  constructor() {
    this.keys = []

    window.addEventListener('keydown', (ev) => {
      if (
        (ev.key === 'ArrowDown' ||
          ev.key === 'ArrowLeft' ||
          ev.key === 'ArrowRight' ||
          ev.key === 'ArrowEnter') &&
        this.keys.indexOf(ev.key) === -1
      ) {
        this.keys.push(ev.key)
      }
    })

    window.addEventListener('keyup', (ev) => {
      if (
        ev.key === 'ArrowDown' ||
        ev.key === 'ArrowLeft' ||
        ev.key === 'ArrowRight' ||
        ev.key === 'ArrowEnter'
      ) {
        this.keys.splice(this.keys.indexOf(ev.key), 1)
      }
    })
  }
}
