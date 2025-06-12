import { aStar } from '../../algorithms/pathfinding/a-star.js';
import { breadthFirstSearch } from '../../algorithms/pathfinding/breadth-first-search';
import { depthFirstSearch } from '../../algorithms/pathfinding/depth-first-search';
import { dijkstras } from '../../algorithms/pathfinding/dijkstras';
import { inBounds, generatePath, getGridInfo, getCompassDirections } from '../../utils/helpers';

export function VisualizeButton({
  algorithm,
  grid,
  setGrid,
  pathHasBeenVisualized,
  setPathHasBeenVisualized
}) {
  async function handleClick() {
    if (algorithm == 'a-star') {
      aStar(grid, setGrid, inBounds, generatePath, getGridInfo, getCompassDirections, pathHasBeenVisualized);
    } else if (algorithm == 'breadth-first-search') {
      breadthFirstSearch(
        grid,
        setGrid,
        inBounds,
        generatePath,
        getGridInfo,
        getCompassDirections,
        pathHasBeenVisualized
      );
    } else if (algorithm == 'depth-first-search') {
      depthFirstSearch(
        grid,
        setGrid,
        inBounds,
        generatePath,
        getGridInfo,
        getCompassDirections,
        pathHasBeenVisualized
      );
    } else if (algorithm == 'dijkstras') {
      dijkstras(
        grid,
        setGrid,
        inBounds,
        generatePath,
        getGridInfo,
        getCompassDirections,
        pathHasBeenVisualized
      );
    }
    setPathHasBeenVisualized(true);
  }

  return (
    <button className="visualize" onClick={handleClick}>
      Visualize {algorithm}
    </button>
  );
}
