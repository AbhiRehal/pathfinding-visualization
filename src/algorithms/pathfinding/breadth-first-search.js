export async function breadthFirstSearch(
  grid,
  setGrid,
  inBounds,
  generatePath,
  getGridInfo,
  getCompassDirections,
  pathHasBeenVisualized
) {
  const [x_dir, y_dir, startNode, endNode] = getGridInfo(grid);
  const cardinal_directions = getCompassDirections();
  let localGrid = [...grid];

  let end_found = false;
  const stack = [];

  for (const dir of cardinal_directions) {
    if (!inBounds(startNode.x + dir.dx, startNode.y + dir.dy, x_dir, y_dir)) {
      continue;
    }

    const neighbour_node = localGrid[startNode.y + dir.dy][startNode.x + dir.dx];

    // if neighbour is the end we break
    if (neighbour_node.className == 'endNode') {
      end_found = true;
      break;
    }
    // neigbour isnt a wall i.e. its a passage we push it onto array
    if (neighbour_node.className != 'wall') {
      stack.push(neighbour_node);
      neighbour_node.prev_node_x = startNode.x;
      neighbour_node.prev_node_y = startNode.y;
      neighbour_node.className = `${pathHasBeenVisualized ? 'on-stack' : 'on-stack-animated'}`;
    }
  }

  if (!pathHasBeenVisualized) {
    setGrid([...localGrid]);
    await new Promise(resolve => setTimeout(resolve, 25));
  }

  while (!end_found && stack.length > 0) {
    const layer = stack.length;
    for (let i = 0; i < layer; i++) {
      const current_node = stack.shift();
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
          neighbour_node.className = `${pathHasBeenVisualized ? 'on-stack' : 'on-stack-animated'}`;
          neighbour_node.prev_node_x = current_node.x;
          neighbour_node.prev_node_y = current_node.y;
          current_node.className = `${pathHasBeenVisualized ? 'visited' : 'visited-animated'}`;
        }
      }
      current_node.className = `${pathHasBeenVisualized ? 'visited' : 'visited-animated'}`;
    }
    if (!pathHasBeenVisualized) {
      setGrid([...localGrid]);
      await new Promise(resolve => setTimeout(resolve, 25));
    }
  }

  const path = generatePath(localGrid, endNode);
  while (path.length > 0) {
    let node = path.pop();
    node.className = `${pathHasBeenVisualized ? 'path' : 'path-animated'}`;
    if (!pathHasBeenVisualized) {
      setGrid([...localGrid]);
      await new Promise(resolve => setTimeout(resolve, 25));
    }
  }

  setGrid(localGrid);
}
