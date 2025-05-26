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
import { GenerateMazeButton } from './components/generate-maze-button.js';
import { GenerateMazeDropdown } from './components/generate-maze-dropdown.js';

export default function Grid() {
  const [mouseIsDown, setMouseDown] = useState(false);
  const [draggingStartNode, setDraggingStartNode] = useState(false);
  const [draggingEndNode, setDraggingEndNode] = useState(false);
  const [grid, setGrid] = useState(() => init());
  const [algorithm, setAlgorithm] = useState('breadth-first-search');
  const [mazeGenAlgorithm, setMazeGenAlgorithm] = useState('prims');

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
        <GenerateMazeButton algorithm={mazeGenAlgorithm} grid={grid} setGrid={setGrid}></GenerateMazeButton>
        <GenerateMazeDropdown setAlgorithm={setMazeGenAlgorithm}></GenerateMazeDropdown>
      </div>
      <div className="grid" onMouseDown={handleGridMouseDown} onMouseUp={handleGridMouseUp}>
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
                weight={ele.weight}
                distance={ele.distance}
                draggingStartNode={draggingStartNode}
                setDraggingStartNode={setDraggingStartNode}
                draggingEndNode={draggingEndNode}
                setDraggingEndNode={setDraggingEndNode}
                prevClassName={ele.prev_className}
              ></Node>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
