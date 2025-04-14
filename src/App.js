import { useState, useEffect } from "react";
import { Node } from "./components/node.js";
import { DebugButton } from "./components/debug.js";
import { Checkbox } from "./components/checkbox.js";

export default function Grid() {
  const [isChecked, setChecked] = useState(false);
  const [grid, setGrid] = useState(init(isChecked));
  // state to track mouse being pressed
  const [isMousePressed, setIsMousePressed] = useState(false);

  useEffect(() => {
    const handleMousePressed = () => setIsMousePressed(false);
    document.addEventListener("mouseup", handleMousePressed);
    return () => document.removeEventListener("mouseup", handleMousePressed);
  }, []);

  function setCheckbox() {
    setChecked(!isChecked);
  }

  return (
    <>
      <div className="header">
        <DebugButton grid={grid}></DebugButton>
        <Checkbox isChecked={isChecked} setChecked={setChecked}></Checkbox>
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

  for (let i = 0; i < m; i++) {
    const row = [];
    for (let j = 0; j < n; j++) {
      const node = {
        index: n * i + j,
        visited: false,
        walkable: false,
        className: "node",
        // className: `${(n * i + j) % 2 == 0 ? "node" : "wall"}`,
      };
      row.push(node);
    }
    grid.push(row);
  }

  return grid;
}
