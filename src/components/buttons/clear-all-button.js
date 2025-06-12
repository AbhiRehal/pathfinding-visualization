export function ClearAll({ grid, setGrid, setPathHasBeenVisualized }) {
  function handleClick() {
    const x_dir = grid[0].length;
    const y_dir = grid.length;
    const localGrid = grid.map(row => [...row]);
    for (let row = 0; row < y_dir; row++) {
      for (let col = 0; col < x_dir; col++) {
        const node = localGrid[row][col];
        if (node.className != 'startNode' && node.className != 'endNode') {
          node.className = 'blank';
          node.prev_node_x = 0;
          node.prev_node_y = 0;
        }
        if (node.className == 'startNode') {
          node.distance = 0;
        } else {
          node.distance = 999;
        }
      }
    }
    setPathHasBeenVisualized(false);
    setGrid(localGrid);
  }

  return (
    <button className="clear-button" onClick={handleClick}>
      Clear Grid
    </button>
  );
}
