export async function dijkstras(grid, setGrid, inBounds, generatePath, getGridInfo, getCompassDirections) {
  const [x_dir, y_dir, startNode, endNode] = getGridInfo(grid);
  const compass_directions = getCompassDirections('both');
  let localGrid = [...grid];

  let end_found = false;
  const stack = [];

  for (const dir of compass_directions) {
    if (!inBounds(startNode.x + dir.dx, startNode.y + dir.dy, x_dir, y_dir)) {
      continue;
    }
    const neighbour_node = localGrid[startNode.y + dir.dy][startNode.x + dir.dx];
    if (neighbour_node.className == 'endNode') {
      end_found = true;
      break;
    }
    if (neighbour_node.className != 'wall') {
      stack.push(neighbour_node);
      neighbour_node.prev_node_x = startNode.x;
      neighbour_node.prev_node_y = startNode.y;
      neighbour_node.className = 'on-stack';
    }
  }

  setGrid(localGrid);
}
