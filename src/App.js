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

export default function Grid() {
  const [isChecked, setChecked] = useState(false);
  const [grid, setGrid] = useState(() => init(isChecked));

  function setCheckbox() {
    setChecked(!isChecked);
  }

  return (
    <>
      <div className="header">
        <DebugButton grid={grid}></DebugButton>
        <Checkbox isChecked={isChecked} setChecked={setChecked}></Checkbox>
        <ClearAll grid={grid} setGrid={setGrid}></ClearAll>
        <Clear grid={grid} setGrid={setGrid}></Clear>
        <BFS grid={grid} setGrid={setGrid}></BFS>
        <DFS grid={grid} setGrid={setGrid}></DFS>
        <Dijkstras grid={grid} setGrid={setGrid}></Dijkstras>
        <PrimsMazeGenButton grid={grid} setGrid={setGrid}></PrimsMazeGenButton>
      </div>
      {grid.map((row, rowIndex) => (
        <div key={rowIndex}>
          {row.map((ele, colIndex) => (
            <Node
              key={ele.index}
              isChecked={isChecked}
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
    </>
  );
}
