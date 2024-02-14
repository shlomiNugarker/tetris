
# Tetris-Like Game

This project is a simple Tetris-like game implemented in TypeScript.
It replicates the classic gameplay of Tetris,
where players control falling Tetrominoes (shapes composed of four blocks) and aim to 
create complete horizontal lines on the game board.
When a line is completed, it disappears, and the player scores points.


# Features

- Control falling Tetrominoes using arrow keys.
- Automatic downward movement of Tetrominoes with a configurable interval.
- Rotation of Tetrominoes.
- Clearing full rows when they are completed.
- Basic game loop for continuous gameplay.
- Rendering using HTML canvas.

# Setup

1. **Clone the repository:** git clone https://github.com/shlomiNugarker/tetris.git

2. **Install dependencies:** npm install

3. **Build the project:** npm run build

4.  **Open `index.html` in a web browser to play the game.**

# Gameplay

- **Controls:**
- Arrow keys: Move Tetrominoes left, right, up, or down, and rotate them.
- `Space`: Hard drop (instantly move Tetromino down to the lowest possible position).

- **Scoring: (soon)**
- Clear one line: 100 points.
- Clear two lines simultaneously (Tetris): 400 points.
- Clearing multiple lines at once increases the score multiplier.

- **Game Over:**
- The game ends when a new Tetromino cannot be placed on the board.

# Files Structure

- **`src/`**: Contains TypeScript source code.
- `Game.ts`: Defines the `Game` class responsible for game logic.
- `Tetromino.ts`: Defines the `Tetromino` class representing Tetromino shapes.
- `index.ts`: Entry point for the game.

- **`style.css`**: Contains styles for the game interface.
- **`index.html`**: HTML file for rendering the game.

# Technologies Used

- TypeScript
- HTML Canvas

<a href="https://shlominugarker.github.io/tetris/" target="_blank">
 <img src="https://res.cloudinary.com/duajg3ah1/image/upload/v1707876390/myPortfolio/iyhj3ijbrdrsivwat39b.png" width="50%" title="">
</a>

  


