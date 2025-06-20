import './buttons.css';
import { aStar } from '../../algorithms/pathfinding/a-star.js';
import { breadthFirstSearch } from '../../algorithms/pathfinding/breadth-first-search';
import { depthFirstSearch } from '../../algorithms/pathfinding/depth-first-search';
import { dijkstras } from '../../algorithms/pathfinding/dijkstras';
import { clearPath, inBounds, generatePath, getGridInfo, getCompassDirections } from '../../utils/helpers';

export function VisualizeButton({
  algorithm,
  grid,
  setGrid,
  pathHasBeenVisualized,
  setPathHasBeenVisualized
}) {
  async function handleClick() {
    if (algorithm == '') {
      return;
    }
    clearPath(grid, setGrid);
    if (algorithm == 'a-star') {
      aStar('m', grid, setGrid, inBounds, generatePath, getGridInfo, getCompassDirections, false);
    } else if (algorithm == 'breadth-first-search') {
      breadthFirstSearch(grid, setGrid, inBounds, generatePath, getGridInfo, getCompassDirections, false);
    } else if (algorithm == 'depth-first-search') {
      depthFirstSearch(grid, setGrid, inBounds, generatePath, getGridInfo, getCompassDirections, false);
    } else if (algorithm == 'dijkstras') {
      dijkstras(grid, setGrid, inBounds, generatePath, getGridInfo, getCompassDirections, false);
    }
    setPathHasBeenVisualized(true);
  }

  return (
    <button className="visualize-button" onClick={handleClick}>
      <span className="visualize-button-text">
        {algorithm == '' ? 'Pick an algorithm!' : 'Visualize ' + algorithm.replace(/[-.]/g, ' ')}
      </span>
    </button>
  );
}
