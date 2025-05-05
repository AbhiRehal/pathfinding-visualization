export function CLEAR({ grid, setGrid }) {
  function handleClick() {
    const x_dir = grid[0].length;
    const y_dir = grid.length;
    const localGrid = grid.map(row => [...row]);
    for (let row = 0; row < y_dir; row++) {
      for (let col = 0; col < x_dir; col++) {
        if (localGrid[row][col].className == 'visited' || localGrid[row][col].className == 'path') {
          localGrid[row][col].className = 'node';
          localGrid[row][col].prev_node_x = 0;
          localGrid[row][col].prev_node_y = 0;
        }
        if (localGrid[row][col].className == 'endNode') {
          localGrid[row][col].prev_node_x = 0;
          localGrid[row][col].prev_node_y = 0;
        }
      }
    }
    setGrid(localGrid);
  }

  return (
    <button className="clear-button" onClick={handleClick}>
      Clear board
    </button>
  );
}
