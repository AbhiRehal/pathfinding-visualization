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
  } while (path_node.className != 'startNode' && path_node.className != 'startNode idle');

  return path;
}

export function getGridInfo(grid) {
  const x_dir = grid[0].length;
  const y_dir = grid.length;
  const startNode = {
    x: 0,
    y: 0,
    distance: 0
  };
  const endNode = {
    x: 0,
    y: 0,
    distance: 0
  };
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col].className == 'startNode' || grid[row][col].className == 'startNode idle') {
        startNode.x = col;
        startNode.y = row;
        startNode.distance = grid[row][col].distance;
      }
      if (grid[row][col].className == 'endNode' || grid[row][col].className == 'endNode idle') {
        endNode.x = col;
        endNode.y = row;
        endNode.distance = grid[row][col].distance;
      }
    }
  }
  return [x_dir, y_dir, startNode, endNode];
}

export function getCompassDirections(required_directions) {
  if (required_directions == 'maze') {
    return [
      { dx: 2, dy: 0 },
      { dx: 0, dy: 2 },
      { dx: -2, dy: 0 },
      { dx: 0, dy: -2 }
    ];
  }
  if (required_directions == 'both') {
    return [
      { dx: 1, dy: 0 },
      { dx: 0, dy: 1 },
      { dx: -1, dy: 0 },
      { dx: 0, dy: -1 },
      { dx: 1, dy: 1 },
      { dx: -1, dy: 1 },
      { dx: -1, dy: -1 },
      { dx: 1, dy: -1 }
    ];
  }
  return [
    { dx: 1, dy: 0 },
    { dx: 0, dy: 1 },
    { dx: -1, dy: 0 },
    { dx: 0, dy: -1 }
  ];
}

export function clearPath(grid, setGrid) {
  const localGrid = [...grid];
  const x_dir = localGrid[0].length;
  const y_dir = localGrid.length;
  for (let row = 0; row < y_dir; row++) {
    for (let col = 0; col < x_dir; col++) {
      const node = localGrid[row][col];
      if (node.className != 'wall' && node.className != 'startNode' && node.className != 'endNode') {
        node.className = 'node';
      }
      if ((node.className == 'startNode' || node.className == 'endNode') && !node.prev_className == 'wall') {
        node.prev_className = 'node';
      }
      if (node.className == 'startNode') {
        node.distance = 0;
      } else {
        node.distance = 1_000_000;
      }
      node.prev_node_x = 0;
      node.prev_node_y = 0;
    }
  }
  setGrid(localGrid);
}

export function resetWeights(grid, setGrid) {
  const localGrid = [...grid];
  const x_dir = localGrid[0].length;
  const y_dir = localGrid.length;
  for (let row = 0; row < y_dir; row++) {
    for (let col = 0; col < x_dir; col++) {
      const node = localGrid[row][col];
      if (node.className == 'startNode') {
        node.distance = 0;
        continue;
      }
      node.distance = 99;
    }
  }
  setGrid(localGrid);
}
