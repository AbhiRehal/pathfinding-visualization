import { getGridInfo } from '../../utils/helpers';

export function RandomUseButton({ grid, setGrid }) {
  function handleClick() {
    const localGrid = [...grid];
    const [x, y, s, e] = getGridInfo(localGrid);
    localGrid[s.y][s.x].className = 'startNode idle';
    setGrid(localGrid);
  }
  return (
    <button className="visualize" onClick={handleClick}>
      Random Use
    </button>
  );
}
