import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild('canvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  rows = 40;
  cols = 60;
  cellSize = 12;

  grid: number[][] = [];
  running = true;
  generation = 0;
  tickMs = 200;
  timerId?: ReturnType<typeof setInterval>;

  ngOnInit() {
    this.canvasRef.nativeElement.width = this.cols * this.cellSize;
    this.canvasRef.nativeElement.height = this.rows * this.cellSize;

    this.clearGrid();
    this.randomizeGrid();
    this.running = true;
    this.updateTimer();
  }

  toggleRunning() {
    this.running = !this.running;
    this.updateTimer();
  }

  step() {
    this.grid = this.nextGeneration();
    this.generation++;
    this.draw();
  }

  randomizeGrid() {
    this.grid = Array.from({ length: this.rows }, () =>
      Array.from({ length: this.cols }, () => (Math.random() > 0.7 ? 1 : 0))
    );
    this.generation = 0;
    this.draw();
  }

  clearGrid() {
    this.grid = Array.from({ length: this.rows }, () =>
      Array.from({ length: this.cols }, () => 0)
    );
    this.generation = 0;
    this.draw();
  }

  onTickChange(event: Event) {
    this.tickMs = +(event.target as HTMLInputElement).value;
    this.updateTimer();
  }

  private updateTimer() {
    clearInterval(this.timerId);
    if (this.running) {
      this.timerId = setInterval(() => this.step(), this.tickMs);
    }
  }

  /**
   * Returns a new grid with the next generation of cells based on the current
   * grid. The rules for determining the next generation are as follows:
   * - If a cell is alive (value of 1), it survives if it has 2 or 3 live neighbors,
   *   and dies otherwise.
   * - If a cell is dead (value of 0), it becomes alive if it has exactly 3 live
   *   neighbors.
   * @returns {number[][]} A new grid with the next generation of cells.
   */
  private nextGeneration(): number[][] {
    const newGrid = this.grid.map((arr) => [...arr]);
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const liveNeighbors = this.countNeighbors(r, c);
        if (this.grid[r][c] === 1) {
          if (liveNeighbors < 2 || liveNeighbors > 3) newGrid[r][c] = 0;
        } else {
          if (liveNeighbors === 3) newGrid[r][c] = 1;
        }
      }
    }
    return newGrid;
  }

  /**
   * Counts the number of live neighbors for a given cell.
   * The grid uses wrap-around (toroidal) boundaries, so edges are connected.
   *
   * @param {number} row - The row index of the cell.
   * @param {number} col - The column index of the cell.
   * @returns {number} The number of live neighbors.
   */
  private countNeighbors(row: number, col: number): number {
    let count = 0;
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;
        const r = (row + dr + this.rows) % this.rows;
        const c = (col + dc + this.cols) % this.cols;
        count += this.grid[r][c];
      }
    }
    return count;
  }

  /**
   * Draws the game board on the canvas.
   *
   * This function clears the canvas and then loops through each cell in the
   * grid, setting the fill and stroke styles based on the cell's state and
   * drawing a filled rectangle with a stroked outline at the appropriate
   * coordinates.
   */
  private draw() {
    const ctx = this.canvasRef.nativeElement.getContext('2d')!;
    ctx.clearRect(
      0,
      0,
      this.canvasRef.nativeElement.width,
      this.canvasRef.nativeElement.height
    );
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        ctx.fillStyle = this.grid[r][c] ? '#0a1310ff' : '#f6f8fbff';
        ctx.fillRect(
          c * this.cellSize,
          r * this.cellSize,
          this.cellSize,
          this.cellSize
        );

        ctx.strokeStyle = '#1f2937';
        ctx.strokeRect(
          c * this.cellSize,
          r * this.cellSize,
          this.cellSize,
          this.cellSize
        );
      }
    }
  }

  @HostListener('click', ['$event'])
  /**
   * Handles a click event on the canvas, toggling the state of the cell under
   * the cursor if the game is not running.
   *
   * @param {MouseEvent} event - The click event.
   */
  handleClick(event: MouseEvent) {
    if (this.running) return;

    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const c = Math.floor(x / this.cellSize);
    const r = Math.floor(y / this.cellSize);

    this.toggleCell(r, c);
    this.draw();
  }

  private toggleCell(r: number, c: number) {
    this.grid[r][c] = this.grid[r][c] ? 0 : 1;
  }
}
