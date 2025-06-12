export async function dijkstras(
  grid,
  setGrid,
  inBounds,
  generatePath,
  getGridInfo,
  getCompassDirections,
  pathHasBeenVisualized
) {
  const [x_dir, y_dir, startNode, endNode] = getGridInfo(grid);
  const compass_directions = getCompassDirections();
  let localGrid = [...grid];

  let end_found = false;
  const unvisited_set = [];

  for (const dir of compass_directions) {
    if (!inBounds(startNode.x + dir.dx, startNode.y + dir.dy, x_dir, y_dir)) {
      continue;
    }

    const neighbour_node = localGrid[startNode.y + dir.dy][startNode.x + dir.dx];
    if (neighbour_node.className == 'endNode') {
      neighbour_node.prev_node_x = startNode.x;
      neighbour_node.prev_node_y = startNode.y;
      neighbour_node.distance = startNode.distance + neighbour_node.weight;
      end_found = true;
      break;
    }

    if (neighbour_node.className == 'node' || neighbour_node.className == 'blank') {
      neighbour_node.prev_node_x = startNode.x;
      neighbour_node.prev_node_y = startNode.y;
      neighbour_node.distance = startNode.distance + neighbour_node.weight;
      neighbour_node.className = `${pathHasBeenVisualized ? 'on-stack' : 'on-stack-animated'}`;
      unvisited_set.push(neighbour_node);
    }
  }

  if (!pathHasBeenVisualized) {
    setGrid([...localGrid]);
    await new Promise(resolve => setTimeout(resolve, 25));
  }

  while (unvisited_set.length > 0 && !end_found) {
    const layer = unvisited_set.length;
    for (let i = 0; i < layer; i++) {
      unvisited_set.sort((a, b) => a.distance - b.distance);
      const current_node = unvisited_set.shift();

      for (const dir of compass_directions) {
        if (!inBounds(current_node.x + dir.dx, current_node.y + dir.dy, x_dir, y_dir)) {
          continue;
        }

        const neighbour_node = localGrid[current_node.y + dir.dy][current_node.x + dir.dx];
        if (neighbour_node.className == 'endNode') {
          neighbour_node.prev_node_x = current_node.x;
          neighbour_node.prev_node_y = current_node.y;
          neighbour_node.distance = current_node.distance + neighbour_node.weight;
          end_found = true;
          break;
        }

        if (neighbour_node.className == 'node' || neighbour_node.className == 'blank') {
          if (neighbour_node.distance >= neighbour_node.weight + current_node.distance) {
            neighbour_node.prev_node_x = current_node.x;
            neighbour_node.prev_node_y = current_node.y;
            neighbour_node.distance = current_node.distance + neighbour_node.weight;
            neighbour_node.className = `${pathHasBeenVisualized ? 'on-stack' : 'on-stack-animated'}`;
            unvisited_set.push(neighbour_node);
          }
        }
        current_node.className = `${pathHasBeenVisualized ? 'visited' : 'visited-animated'}`;
      }
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
