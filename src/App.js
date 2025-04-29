import { useState } from "react";
import { Node } from "./components/node.js";
import { DebugButton } from "./components/debug.js";
import { Checkbox } from "./components/checkbox.js";
import { BFS } from "./components/breadth-first-search.js";
import { primsMazeGen } from "./utils/prims-maze-gen.js";

export default function Grid() {
  const [isChecked, setChecked] = useState(false);
  const [grid, setGrid] = useState(() => primsMazeGen(isChecked));
  // const [grid, setGrid] = useState(() => init(isChecked));

  function setCheckbox() {
    setChecked(!isChecked);
  }

  return (
    <>
      <div className="header">
        <DebugButton grid={grid}></DebugButton>
        <Checkbox isChecked={isChecked} setChecked={setChecked}></Checkbox>
        <BFS></BFS>
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
              setButtonClassNames={setGrid}
              grid={grid}
            ></Node>
          ))}
        </div>
      ))}
    </>
  );
}

function init(isChecked) {
  const n = 70;
  const m = 30;

  const grid = [];

  const startNode = {
    x: getRandomInt(0, 70),
    y: getRandomInt(0, 30),
  };

  const endNode = {
    x: getRandomInt(0, 70),
    y: getRandomInt(0, 30),
  };

  console.log(`startNode: ${JSON.stringify(startNode)}`);
  console.log(`endNode: ${JSON.stringify(endNode)}`);

  for (let i = 0; i < m; i++) {
    const row = [];
    for (let j = 0; j < n; j++) {
      let node = {
        index: n * i + j,
        visited: false,
        walkable: false,
        className: "wall",
      };
      if (j == startNode.x && i == startNode.y) {
        node.className = "startNode";
      } else if (j == endNode.x && i == endNode.y) {
        node.className = "endNode";
      } else {
        node.className = "node";
      }
      row.push(node);
    }
    grid.push(row);
  }

  return grid;
}

function getRandomInt(min, max) {
  const minimum = Math.ceil(min);
  const maximum = Math.floor(max);
  return Math.floor(Math.random() * (maximum - minimum) + minimum);
}
