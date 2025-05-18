import { dijkstras } from '../algorithms/dijkstras';
import { inBounds, generatePath, getGridInfo } from '../utils/helpers';

export function Dijkstras({ grid, setGrid }) {
  async function handleClick() {
    dijkstras(grid, setGrid, inBounds, generatePath, getGridInfo);
  }

  return (
    <button className="dijkstras" onClick={handleClick}>
      Dijkstras
    </button>
  );
}
