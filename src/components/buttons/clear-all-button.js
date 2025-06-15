import { clearAll } from '../../utils/helpers';

export function ClearAll({ grid, setGrid, setPathHasBeenVisualized }) {
  function handleClick() {
    clearAll(grid, setGrid);
    setPathHasBeenVisualized(false);
  }

  return (
    <button className="clear-button" onClick={handleClick}>
      Clear Grid
    </button>
  );
}
