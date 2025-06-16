import './buttons.css';
import { primsMazeGeneration } from '../../algorithms/maze-gen/prims';
import { randomWalls } from '../../algorithms/maze-gen/random-walls.js';
import { inBounds, getRandomInt, getGridInfo, getCompassDirections } from '../../utils/helpers';

export function GenerateMazeButton({ algorithm, grid, setGrid }) {
  async function handleClick() {
    if (algorithm == 'prims') {
      primsMazeGeneration(grid, setGrid, inBounds, getRandomInt, getGridInfo, getCompassDirections);
    }
    if (algorithm == 'random') {
      randomWalls(grid, setGrid, getRandomInt, getGridInfo);
    }
  }

  return (
    <button className="generate-maze-button" onClick={handleClick}>
      <span className="generate-maze-text">Generate {algorithm} maze</span>
    </button>
  );
}
