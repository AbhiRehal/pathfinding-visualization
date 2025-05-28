import { breadthFirstSearch } from '../algorithms/pathfinding/breadth-first-search';
import { depthFirstSearch } from '../algorithms/pathfinding/depth-first-search';
import { inBounds, generatePath, getGridInfo, getCompassDirections, clearPath } from '../utils/helpers';

export function Node({
  className = 'node',
  visited = 'false',
  walkable = 'false',
  row,
  col,
  mouseIsDown,
  setGrid,
  grid,
  prev_node_row,
  prev_node_col,
  draggingStartNode,
  setDraggingStartNode,
  draggingEndNode,
  setDraggingEndNode,
  prevClassName,
  pathHasBeenVisualized,
  algorithm
}) {
  function handleMouseDown() {
    let localGrid = [...grid];

    if (className == 'startNode') {
      setDraggingStartNode(true);
      return;
    }

    if (className == 'endNode') {
      setDraggingEndNode(true);
      return;
    }

    if (className != 'wall') {
      localGrid[row][col].className = 'wall';
    } else {
      localGrid[row][col].className = 'node';
    }

    setGrid(localGrid);
  }

  function handleMouseUp() {
    let localGrid = [...grid];

    if (draggingStartNode) {
      localGrid[row][col].className = 'startNode';
      setDraggingStartNode(false);
    }

    if (draggingEndNode) {
      localGrid[row][col].className = 'endNode';
      setDraggingEndNode(false);
    }

    setGrid(localGrid);
  }

  function handleMouseEnter() {
    if (mouseIsDown && draggingStartNode) {
      let localGrid = [...grid];
      localGrid[row][col].prev_className = localGrid[row][col].className;
      localGrid[row][col].className = 'startNode';

      if (pathHasBeenVisualized) {
        clearPath(localGrid, setGrid);
        if (algorithm == 'breadth-first-search') {
          breadthFirstSearch(localGrid, setGrid, inBounds, generatePath, getGridInfo, getCompassDirections);
        } else if (algorithm == 'depth-first-search') {
          depthFirstSearch(localGrid, setGrid, inBounds, generatePath, getGridInfo, getCompassDirections);
        }
        return;
      }

      setGrid(localGrid);
      return;
    }

    if (mouseIsDown && draggingEndNode) {
      let localGrid = [...grid];
      localGrid[row][col].prev_className = localGrid[row][col].className;
      localGrid[row][col].className = 'endNode';

      if (pathHasBeenVisualized) {
        clearPath(localGrid, setGrid);
        if (algorithm == 'breadth-first-search') {
          breadthFirstSearch(localGrid, setGrid, inBounds, generatePath, getGridInfo, getCompassDirections);
        } else if (algorithm == 'depth-first-search') {
          depthFirstSearch(localGrid, setGrid, inBounds, generatePath, getGridInfo, getCompassDirections);
        }
        return;
      }

      setGrid(localGrid);
      return;
    }

    if (mouseIsDown) {
      let localGrid = [...grid];
      if (className == 'startNode' || className == 'endNode') {
        return;
      }
      if (className != 'wall') {
        localGrid[row][col].className = 'wall';
      } else {
        localGrid[row][col].className = 'node';
      }
      setGrid(localGrid);
    }
  }

  function handleMouseLeave() {
    if (draggingStartNode || draggingEndNode) {
      let localGrid = [...grid];
      localGrid[row][col].className = localGrid[row][col].prev_className;
      setGrid(localGrid);
    }
  }

  return (
    <button
      className={className}
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
    ></button>
  );
}
