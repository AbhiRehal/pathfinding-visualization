import { primsMazeGeneration } from '../../algorithms/maze-gen/prims';
import { inBounds, getRandomInt, getGridInfo, getCompassDirections } from '../../utils/helpers';

export function GenerateMazeButton({ algorithm, grid, setGrid }) {
  async function handleClick() {
    if (algorithm == 'prims') {
      primsMazeGeneration(grid, setGrid, inBounds, getRandomInt, getGridInfo, getCompassDirections);
    }
  }

  return (
    <button className="visualize" onClick={handleClick}>
      Generate {algorithm} maze
    </button>
  );
}
