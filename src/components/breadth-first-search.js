import { breadthFirstSearch } from '../algorithms/breadth-first-search';
import { inBounds, generatePath, getGridInfo, getCompassDirections } from '../utils/helpers';

export function BFS({ grid, setGrid }) {
  async function handleClick() {
    breadthFirstSearch(grid, setGrid, inBounds, generatePath, getGridInfo, getCompassDirections);
  }

  return (
    <button className="bfs" onClick={handleClick}>
      BFS
    </button>
  );
}
