import { useState } from 'react';
import { Node } from './components/node.js';
import { DebugButton } from './components/debug.js';
import { Checkbox } from './components/checkbox.js';
import { BFS } from './components/breadth-first-search.js';
import { DFS } from './components/depth-first-search.js';
import { ClearAll } from './components/clear-all-button.js';
import { Clear } from './components/clear.js';
import { PrimsMazeGenButton } from './components/prims-maze-gen-button.js';
import { init } from './utils/init.js';
import { Dijkstras } from './components/dijkstras-button.js';
import { AlgorithmDropdown } from './components/algorithm-dropdown.js';
import { VisualizeButton } from './components/visualize-button.js';

export default function Grid() {
  const [mouseIsDown, setMouseDown] = useState(false);
  const [grid, setGrid] = useState(() => init());
  const [algorithm, setAlgorithm] = useState('a-star');

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
        <Clear grid={grid} setGrid={setGrid}></Clear>
        <VisualizeButton algorithm={algorithm} grid={grid} setGrid={setGrid}></VisualizeButton>
        <AlgorithmDropdown setAlgorithm={setAlgorithm}></AlgorithmDropdown>
        <PrimsMazeGenButton grid={grid} setGrid={setGrid}></PrimsMazeGenButton>
      </div>
      <div onMouseDown={handleGridMouseDown} onMouseUp={handleGridMouseUp}>
        {grid.map((row, rowIndex) => (
          <div key={rowIndex}>
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
              ></Node>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
