export class Tetromino {
  public x: number
  public y: number
  public rotation: number

  constructor(public type: any, public color: string) {
    this.x = 0
    this.y = 0
    this.rotation = 0
    this.color = color
  }

  public draw(ctx: CanvasRenderingContext2D) {}

  public move(dx: number, dy: number) {
    this.x += dx
    this.y += dy
  }

  public rotate() {}
}
