import { Game } from "./index";

export class UI {
  game: Game;
  fontFamily: string;
  fontSize: number;

  constructor(game: Game) {
    this.game = game;
    this.fontSize = 25;
    this.fontFamily = "Helvetica";
  }

  getMaxWidth(shape: string[][]): number {
    let maxWidth = 0;
    for (let row of shape) {
      let rowWidth = 0;

      for (let element of row) {
        if (element) {
          rowWidth++;
        }
      }
      if (rowWidth > maxWidth) {
        maxWidth = rowWidth;
      }
    }
    return maxWidth;
  }

  draw(context: CanvasRenderingContext2D) {
    context.save();
    // Draw the next text:
    const BLOCK_SIZE_WIDTH = this.game.canvas.width / this.game.boardSize;
    const BLOCK_SIZE_HEIGHT = this.game.canvas.height / this.game.boardSize;

    const leftX =
      (this.game.boardSize - this.game.spaceWidth) * BLOCK_SIZE_WIDTH;
    const rightX = this.game.canvas.width;

    const textMetrics = context.measureText("Next");

    context.fillStyle = "black";
    context.fillText(
      "Next",
      leftX + (rightX - leftX) / 2 - textMetrics.width / 2,
      BLOCK_SIZE_HEIGHT * 4
    );
    context.fillStyle = "black";

    context.font = this.fontSize * 0.7 + "px " + this.fontFamily;
    context.textAlign = "left";

    // Draw the next Tetromino:
    if (this.game.nextTetromino) {
      const shape = this.game.nextTetromino.shape;

      // Calculate the starting X position to center the shape inside the spaceWidth
      const shapeWidth = shape[0].length; // The width of the Tetromino in blocks
      const spaceWidthInBlocks = this.game.spaceWidth; // The width of the space in blocks
      const startX =
        this.game.boardSize -
        spaceWidthInBlocks +
        Math.floor((spaceWidthInBlocks - shapeWidth) / 2); // Calculate the centered X position

      for (let row = 0; row < shape.length; row++) {
        for (let col = 0; col < shape[row].length; col++) {
          const blockType = shape[row][col];
          if (blockType) {
            const color = this.game.getBlockColor(blockType);
            this.game.drawBlock(startX + col, 6 + row, color); // 6 is the vertical position
          }
        }
      }
    }

    // draw score:
    const textMetricsScore = context.measureText("Score");
    context.fillStyle = "black";
    context.fillText(
      "Score",
      leftX + (rightX - leftX) / 2 - textMetricsScore.width / 2,
      13 * BLOCK_SIZE_HEIGHT
    );

    const numberMetricsScore = context.measureText("" + this.game.points);
    context.fillText(
      "" + this.game.points,
      leftX + (rightX - leftX) / 2 - numberMetricsScore.width / 2,
      15 * BLOCK_SIZE_HEIGHT
    );

    // draw level:
    const textMetricsLevel = context.measureText("Level");
    context.fillText(
      "Level",
      leftX + (rightX - leftX) / 2 - textMetricsLevel.width / 2,
      21 * BLOCK_SIZE_HEIGHT
    );
    context.fillStyle = "black";

    const numberMetricsLevel = context.measureText("" + this.game.points);
    context.fillText(
      "" + this.game.level,
      leftX + (rightX - leftX) / 2 - numberMetricsLevel.width / 2,
      23 * BLOCK_SIZE_HEIGHT
    );
  }
}
