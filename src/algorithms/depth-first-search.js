export async function depthFirstSearch(
  grid,
  setGrid,
  inBounds,
  generatePath,
  getGridInfo,
  getCompassDirections
) {
  const [x_dir, y_dir, startNode, endNode] = getGridInfo(grid);
  const cardinal_directions = getCompassDirections();
  let localGrid = [...grid];

  let end_found = false;
  const stack = [];

  for (const dir of cardinal_directions) {
    if (!inBounds(startNode.x, startNode.y, x_dir, y_dir)) {
      continue;
    }

    const neighbour_node = localGrid[startNode.y + dir.dy][startNode.x + dir.dx];

    // if neighbour is the end we break
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

  setGrid([...localGrid]);
  await new Promise(resolve => setTimeout(resolve, 1));

  while (!end_found && stack.length > 0) {
    const current_node = stack.pop();
    for (const dir of cardinal_directions) {
      if (!inBounds(current_node.x + dir.dx, current_node.y + dir.dy, x_dir, y_dir)) {
        continue;
      }
      const neighbour_node = localGrid[current_node.y + dir.dy][current_node.x + dir.dx];
      if (neighbour_node.className == 'endNode') {
        neighbour_node.prev_node_x = current_node.x;
        neighbour_node.prev_node_y = current_node.y;
        end_found = true;
        break;
      }
      if (neighbour_node.className == 'node' || neighbour_node.className == 'blank') {
        stack.push(neighbour_node);
        neighbour_node.className = 'on-stack';
        neighbour_node.prev_node_x = current_node.x;
        neighbour_node.prev_node_y = current_node.y;
        current_node.className = 'visited';
        continue;
      }
      // if the node being checked is surrounded by walls for example it will just set itself to visited
      current_node.className = 'visited';
      setGrid([...localGrid]);
      await new Promise(resolve => setTimeout(resolve, 1));
    }
  }

  const path = generatePath(localGrid, endNode);
  while (path.length > 0) {
    let node = path.pop();
    node.className = 'path';
    setGrid([...localGrid]);
    await new Promise(resolve => setTimeout(resolve, 25));
  }

  setGrid(localGrid);
}
