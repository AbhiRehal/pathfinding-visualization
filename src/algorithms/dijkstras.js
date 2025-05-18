export async function dijkstras(grid, setGrid, inBounds, generatePath, getGridInfo, getCompassDirections) {
  const [x_dir, y_dir, startNode, endNode] = getGridInfo(grid);
  const compass_directions = getCompassDirections('both');
  let localGrid = [...grid];

  let end_found = false;
  const stack = [];
}

// export async function breadthFirstSearch(grid, setGrid, inBounds, generatePath, getGridInfo) {
//   const [x_dir, y_dir, startNode, endNode, cardinal_directions] = getGridInfo(grid);
//   let localGrid = [...grid];
//
//   let end_found = false;
//   const stack = [];
//
//   for (const dir of cardinal_directions) {
//     if (!inBounds(startNode.x + dir.dx, startNode.y + dir.dy, x_dir, y_dir)) {
//       continue;
//     }
//
//     const neighbour_node = localGrid[startNode.y + dir.dy][startNode.x + dir.dx];
//
//     // if neighbour is the end we break
//     if (neighbour_node.className == 'endNode') {
//       end_found = true;
//       break;
//     }
//     // neigbour isnt a wall i.e. its a passage we push it onto array
//     if (neighbour_node.className != 'wall') {
//       stack.push(neighbour_node);
//       neighbour_node.prev_node_x = startNode.x;
//       neighbour_node.prev_node_y = startNode.y;
//       // neighbour_node.className = 'visited';
//       neighbour_node.className = 'on-stack';
//     }
//   }
//
//   setGrid([...localGrid]);
//   await new Promise(resolve => setTimeout(resolve, 1));
//
//   while (!end_found && stack.length > 0) {
//     const current_node = stack.shift();
//     for (const dir of cardinal_directions) {
//       const neighbour_node = localGrid[current_node.y + dir.dy][current_node.x + dir.dx];
//       if (!inBounds(neighbour_node.x, neighbour_node.y, x_dir, y_dir)) {
//         continue;
//       }
//       if (neighbour_node.className == 'endNode') {
//         neighbour_node.prev_node_x = current_node.x;
//         neighbour_node.prev_node_y = current_node.y;
//         end_found = true;
//         break;
//       }
//       if (neighbour_node.className == 'node') {
//         stack.push(neighbour_node);
//         neighbour_node.className = 'on-stack';
//         neighbour_node.prev_node_x = current_node.x;
//         neighbour_node.prev_node_y = current_node.y;
//         current_node.className = 'visited';
//       }
//     }
//     current_node.className = 'visited';
//     setGrid([...localGrid]);
//     await new Promise(resolve => setTimeout(resolve, 1));
//   }
//
//   const path = generatePath(localGrid, endNode);
//   while (path.length > 0) {
//     let node = path.pop();
//     node.className = 'path';
//     setGrid([...localGrid]);
//     await new Promise(resolve => setTimeout(resolve, 25));
//   }
//
//   setGrid(localGrid);
// }
