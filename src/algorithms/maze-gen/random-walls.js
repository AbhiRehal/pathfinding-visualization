import { clearAll } from '../../utils/helpers.js';

export async function randomWalls(
  grid,
  setGrid,
  getRandomInt,
  getGridInfo,
  mazeHasBeenVisualized,
  wallChance
) {
  clearAll(grid, setGrid);
  const [x_dir, y_dir, startNode, endNode] = getGridInfo(grid);
  let localGrid = [...grid];

  for (let row = 0; row < y_dir; row++) {
    for (let col = 0; col < x_dir; col++) {
      if (getRandomInt(0, 100) < wallChance) {
        if (
          localGrid[row][col].className == 'startNode' ||
          localGrid[row][col].className == 'startNode hint' ||
          localGrid[row][col].className == 'endNode'
        ) {
          continue;
        }
        localGrid[row][col].className = 'wall';
      }
    }
    if (!mazeHasBeenVisualized) {
      setGrid([...localGrid]);
      await new Promise(resolve => setTimeout(resolve, 50));
    }
  }

  setGrid(localGrid);
}
