import { clearPath } from '../../utils/helpers.js';
import './buttons.css';

export function Clear({ grid, setGrid, setPathHasBeenVisualized }) {
  function handleClick() {
    clearPath(grid, setGrid);
    setPathHasBeenVisualized(false);
  }

  return (
    <button className="clear-button" onClick={handleClick}>
      <span className="clear-button-text">Clear Paths</span>
    </button>
  );
}
