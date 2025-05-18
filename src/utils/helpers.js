export function getRandomInt(min, max) {
  const minimum = Math.ceil(min);
  const maximum = Math.floor(max);
  return Math.floor(Math.random() * (maximum - minimum) + minimum);
}

export function inBounds(x, y, x_dir, y_dir) {
  return x < x_dir && x >= 0 && y < y_dir && y >= 0;
}

export function generatePath(grid, endNode) {
  const localGrid = [...grid];
  const path = [];

  let path_node = localGrid[endNode.y][endNode.x];
  path_node = localGrid[path_node.prev_node_y][path_node.prev_node_x];
  if (path_node.x == 0 && path_node.y == 0) {
    // means there is no path found to the end
    return path;
  }

  do {
    if (path_node.className == 'startNode') {
      break;
    }
    path.push(path_node);
    path_node = localGrid[path_node.prev_node_y][path_node.prev_node_x];
  } while (path_node.className != 'startNode');

  return path;
}

export function getGridInfo(grid) {
  const x_dir = grid[0].length;
  const y_dir = grid.length;
  const startNode = {
    x: 0,
    y: 0
  };
  const endNode = {
    x: 0,
    y: 0
  };
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col].className == 'startNode') {
        startNode.x = col;
        startNode.y = row;
      }
      if (grid[row][col].className == 'endNode') {
        endNode.x = col;
        endNode.y = row;
      }
    }
  }
  const cardinal_directions = [
    { dx: 1, dy: 0 },
    { dx: 0, dy: 1 },
    { dx: -1, dy: 0 },
    { dx: 0, dy: -1 }
  ];
  return [x_dir, y_dir, startNode, endNode, cardinal_directions];
}
