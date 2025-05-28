import { clearPath } from '../../utils/helpers.js';

export function Clear({ grid, setGrid, setPathHasBeenVisualized }) {
  function handleClick() {
    clearPath(grid, setGrid);
    setPathHasBeenVisualized(false);
  }

  return (
    <button className="clear-button" onClick={handleClick}>
      Clear Paths
    </button>
  );
}
