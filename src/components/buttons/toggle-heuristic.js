import { getGridInfo } from '../../utils/helpers';

export function ToggleHeuristicButton({
  grid,
  heuristic,
  viewHeuristic,
  setViewHeuristic,
  setViewWeights,
  setGrid
}) {
  function handleClick() {
    let localGrid = [...grid];
    const [x_dir, y_dir, startNode, endNode] = getGridInfo(grid);
    calculateHeuristic(heuristic, localGrid, x_dir, y_dir, startNode, endNode);
    setGrid(localGrid);
    setViewWeights(false);
    setViewHeuristic(!viewHeuristic);
  }

  return <button onClick={handleClick}>Toggle heuristic</button>;
}

function calculateHeuristic(heuristic, localGrid, x_dir, y_dir, startNode, endNode) {
  if (heuristic == 'm') {
    for (let row = 0; row < y_dir; row++) {
      for (let col = 0; col < x_dir; col++) {
        localGrid[row][col].heuristic = Math.abs(endNode.x - col) + Math.abs(endNode.y - row);
      }
    }
  }
  if (heuristic == 'e') {
    for (let row = 0; row < y_dir; row++) {
      for (let col = 0; col < x_dir; col++) {
        localGrid[row][col].heuristic = Math.sqrt(
          Math.pow(endNode.x - col, 2) + Math.pow(endNode.y - row, 2)
        );
      }
    }
  }
}
