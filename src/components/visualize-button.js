import { aStar } from '../algorithms/a-star.js';
import { breadthFirstSearch } from '../algorithms/breadth-first-search';
import { depthFirstSearch } from '../algorithms/depth-first-search';
import { dijkstras } from '../algorithms/dijkstras';
import { inBounds, generatePath, getGridInfo, getCompassDirections } from '../utils/helpers';

export function VisualizeButton({ algorithm, grid, setGrid }) {
  async function handleClick() {
    if (algorithm == 'a-star') {
      aStar(grid, setGrid, inBounds, generatePath, getGridInfo, getCompassDirections);
    } else if (algorithm == 'breadth-first-search') {
      breadthFirstSearch(grid, setGrid, inBounds, generatePath, getGridInfo, getCompassDirections);
    } else if (algorithm == 'depth-first-search') {
      depthFirstSearch(grid, setGrid, inBounds, generatePath, getGridInfo, getCompassDirections);
    } else if (algorithm == 'dijkstras') {
      dijkstras(grid, setGrid, inBounds, generatePath, getGridInfo, getCompassDirections);
    }
  }

  return (
    <button className="visualize" onClick={handleClick}>
      Visualize {algorithm}
    </button>
  );
}
