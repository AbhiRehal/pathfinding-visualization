import { useEffect, useRef, useState } from 'react';
import { Node } from './components/node.js';
import { DebugButton } from './components/debug.js';
import { Checkbox } from './components/checkbox.js';
import { ClearAll } from './components/buttons/clear-all-button.js';
import { Clear } from './components/buttons/clear.js';
import { init } from './utils/init.js';
import { AlgorithmDropdown } from './components/dropdowns/algorithm-dropdown.js';
import { VisualizeButton } from './components/buttons/visualize-button.js';
import { GenerateMazeButton } from './components/buttons/generate-maze-button.js';
import { GenerateMazeDropdown } from './components/dropdowns/generate-maze-dropdown.js';
import { RandomUseButton } from './components/buttons/random-use-button.js';
import { getGridInfo, getRandomInt } from './utils/helpers.js';

export default function Grid() {
  const [mouseIsDown, setMouseDown] = useState(false);
  const [draggingStartNode, setDraggingStartNode] = useState(false);
  const [draggingEndNode, setDraggingEndNode] = useState(false);
  const [grid, setGrid] = useState(() => init());
  const [algorithm, setAlgorithm] = useState('breadth-first-search');
  const [mazeGenAlgorithm, setMazeGenAlgorithm] = useState('prims');
  const [pathHasBeenVisualized, setPathHasBeenVisualized] = useState(false);
  const [moveNodeRandomly, setMoveNodeRandomly] = useState(true);
  const [needsStartNodeHint, setStartNodeHint] = useState(true);

  let timestamp = useRef(Date.now());
  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() - timestamp.current < 5000) {
        return;
      }
      if (needsStartNodeHint && !pathHasBeenVisualized) {
        let localGrid = [...grid];
        const [x_dir, y_dir, startNode, endNode] = getGridInfo(localGrid);
        localGrid[startNode.y][startNode.x].className = 'startNode idle';
        setStartNodeHint(false);
        setGrid(localGrid);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [needsStartNodeHint, pathHasBeenVisualized]);

  function handleGridMouseDown() {
    setMouseDown(true);
  }

  function handleGridMouseUp() {
    setMouseDown(false);
  }

  return (
    <>
      <div className="header">
        <ClearAll grid={grid} setGrid={setGrid}></ClearAll>
        <Clear grid={grid} setGrid={setGrid} setPathHasBeenVisualized={setPathHasBeenVisualized}></Clear>
        <RandomUseButton grid={grid} setGrid={setGrid}></RandomUseButton>
        <VisualizeButton
          algorithm={algorithm}
          grid={grid}
          setGrid={setGrid}
          setPathHasBeenVisualized={setPathHasBeenVisualized}
        ></VisualizeButton>
        <AlgorithmDropdown setAlgorithm={setAlgorithm}></AlgorithmDropdown>
        <GenerateMazeButton algorithm={mazeGenAlgorithm} grid={grid} setGrid={setGrid}></GenerateMazeButton>
        <GenerateMazeDropdown setAlgorithm={setMazeGenAlgorithm}></GenerateMazeDropdown>
      </div>
      <div className="grid" onMouseDown={handleGridMouseDown} onMouseUp={handleGridMouseUp}>
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="grid-row">
            {row.map((ele, colIndex) => (
              <Node
                key={ele.index}
                mouseIsDown={mouseIsDown}
                visited={ele.visited}
                walkable={ele.walkable}
                className={ele.className}
                row={rowIndex}
                col={colIndex}
                setGrid={setGrid}
                grid={grid}
                prev_node_row={ele.prev_node_y}
                prev_node_col={ele.prev_node_x}
                weight={ele.weight}
                distance={ele.distance}
                draggingStartNode={draggingStartNode}
                setDraggingStartNode={setDraggingStartNode}
                draggingEndNode={draggingEndNode}
                setDraggingEndNode={setDraggingEndNode}
                prevClassName={ele.prev_className}
                pathHasBeenVisualized={pathHasBeenVisualized}
                algorithm={algorithm}
                moveNodeRandomly={moveNodeRandomly}
                setMoveNodeRandomly={setMoveNodeRandomly}
                timestamp={timestamp}
                setStartNodeHint={setStartNodeHint}
              ></Node>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
