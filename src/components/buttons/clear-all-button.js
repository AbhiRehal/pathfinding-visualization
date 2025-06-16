import { clearAll } from '../../utils/helpers';
import './buttons.css';

export function ClearAll({ grid, setGrid, setPathHasBeenVisualized }) {
  function handleClick() {
    clearAll(grid, setGrid);
    setPathHasBeenVisualized(false);
  }

  return (
    <button className="clear-button" onClick={handleClick}>
      <span className="clear-all-button-text">Clear Grid</span>
    </button>
  );
}
