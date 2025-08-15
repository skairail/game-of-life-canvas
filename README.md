Вот пример профессионального README для твоей программы на Angular (игра “Жизнь”):

---

# Conway’s Game of Life – Angular Implementation

A simple interactive implementation of **Conway’s Game of Life** using Angular and HTML5 Canvas. This project demonstrates grid-based simulations, canvas drawing, and basic user interactions.

## Features

- **Dynamic grid**: Adjustable number of rows, columns, and cell size.
- **Random initialization**: Fill the grid with a random pattern of live and dead cells.
- **Step-by-step evolution**: Advance the simulation one generation at a time.
- **Automatic simulation**: Run continuously with adjustable tick speed.
- **Cell toggling**: Click cells to turn them on or off when the simulation is paused.
- **Toroidal grid**: The grid wraps around edges, making top/bottom and left/right borders connected.

## Installation

1. Clone the repository:

```bash
git clone <repo-url>
cd <repo-folder>
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
ng serve
```

4. Open your browser at `http://localhost:4200`.

## Usage

- **Start/Pause**: Click the “Start/Pause” button to toggle automatic simulation.
- **Step**: Advance one generation manually.
- **Randomize**: Fill the grid with a random pattern.
- **Clear**: Reset the grid to all dead cells.
- **Adjust speed**: Change the tick interval (ms) using the input slider.
- **Toggle cells**: Click individual cells when paused to turn them on or off.

## Code Structure

- `app.component.ts`: Main component containing the grid logic, simulation rules, and canvas drawing.
- `app.component.html`: UI controls and canvas element.
- `app.component.css`: Basic styling for canvas and buttons.

### Key Concepts

- **Grid representation**: 2D array of numbers (0 = dead, 1 = alive).
- **Next generation calculation**: Counts live neighbors for each cell, applies Conway’s rules.
- **Canvas drawing**: Each cell is drawn as a colored rectangle, with stroke lines for grid visualization.
- **Toroidal wrapping**: Neighbor calculation wraps edges using modulo arithmetic.

## Technologies

- Angular
- TypeScript
- HTML5 Canvas
- CSS

## License

This project is licensed under the MIT License.

---
