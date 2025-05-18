import { depthFirstSearch } from '../algorithms/depth-first-search';
import { inBounds, generatePath, getGridInfo, getCompassDirections } from '../utils/helpers';

export function DFS({ grid, setGrid }) {
  async function handleClick() {
    depthFirstSearch(grid, setGrid, inBounds, generatePath, getGridInfo, getCompassDirections);
  }

  return (
    <button className="dfs" onClick={handleClick}>
      DFS
    </button>
  );
}
