import { clearAll } from '../../utils/helpers.js';

export async function primsMazeGeneration(
  grid,
  setGrid,
  inBounds,
  getRandomInt,
  getGridInfo,
  getCompassDirections,
  mazeHasBeenVisualized
) {
  clearAll(grid, setGrid);
  const [x_dir, y_dir, startNode, endNode] = getGridInfo(grid);
  const cardinal_directions = getCompassDirections('maze');
  let localGrid = [...grid];

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      // set the blanks to walls to do algorithm
      if (localGrid[row][col].className == 'blank') {
        localGrid[row][col].className = 'wall';
      }
    }
  }

  const frontier_set = [];
  localGrid[startNode.y][startNode.x].className = 'startNode';

  for (const dir of cardinal_directions) {
    if (!inBounds(startNode.x + dir.dx, startNode.y + dir.dy, x_dir, y_dir)) {
      continue;
    }
    const frontier_node = localGrid[startNode.y + dir.dy][startNode.x + dir.dx];
    frontier_set.push(frontier_node);
    frontier_node.className = 'frontier';
  }

  do {
    const neighbour_set = [];
    const random_cell_from_fs = frontier_set.splice(getRandomInt(0, frontier_set.length), 1)[0];
    for (const dir of cardinal_directions) {
      if (!inBounds(random_cell_from_fs.x + dir.dx, random_cell_from_fs.y + dir.dy, x_dir, y_dir)) {
        continue;
      }
      const neighbour_cell = localGrid[random_cell_from_fs.y + dir.dy][random_cell_from_fs.x + dir.dx];
      if (
        neighbour_cell.className == 'node' ||
        neighbour_cell.className == 'startNode' ||
        neighbour_cell.className == 'endNode'
      ) {
        neighbour_set.push(neighbour_cell);
      } else if (neighbour_cell.className == 'wall') {
        frontier_set.push(neighbour_cell);
        neighbour_cell.className = 'frontier';
      }
    }
    // we then take a random cell form the neighbours and join the random_cell_from_fs with that neightbour
    const random_neighbour_cell = neighbour_set.splice(getRandomInt(0, neighbour_set.length), 1)[0];
    random_cell_from_fs.className = 'node';
    localGrid[(random_cell_from_fs.y + random_neighbour_cell.y) / 2][
      (random_cell_from_fs.x + random_neighbour_cell.x) / 2
    ].className = 'node';

    if (!mazeHasBeenVisualized) {
      setGrid([...localGrid]);
      await new Promise(resolve => setTimeout(resolve, 1));
    }
  } while (frontier_set.length > 0);

  localGrid[endNode.y][endNode.x].className = 'endNode';

  for (let i = 0; i < y_dir; i++) {
    for (let j = 0; j < x_dir; j++) {
      if (i == 0 || i == y_dir - 1 || j == 0 || j == x_dir - 1) {
        grid[i][j].className = 'wall';
      }
    }
  }

  setGrid(localGrid);
}
