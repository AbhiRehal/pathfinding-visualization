export async function aStar(grid, setGrid, inBounds, generatePath, getGridInfo, getCompassDirections) {
  const [x_dir, y_dir, startNode, endNode] = getGridInfo(grid);
  const compass_directions = getCompassDirections('both');
  let localGrid = [...grid];

  let end_found = false;
  const stack = [];
}
