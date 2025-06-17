import { clearAll } from '../../utils/helpers';
import './buttons.css';

export function ClearAll({ grid, setGrid, setMazeHasBeenVisualized, setPathHasBeenVisualized }) {
  function handleClick() {
    clearAll(grid, setGrid);
    setMazeHasBeenVisualized(false);
    setPathHasBeenVisualized(false);
  }

  return (
    <button className="clear-button" onClick={handleClick}>
      <span className="clear-all-button-text">Clear Grid</span>
    </button>
  );
}
