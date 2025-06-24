import { useEffect, useRef, useState } from 'react';
import { Node } from './components/node.js';
import { ClearAll } from './components/buttons/clear-all-button.js';
import { Clear } from './components/buttons/clear.js';
import { init } from './utils/init.js';
import { AlgorithmDropdown } from './components/dropdowns/algorithm-dropdown.js';
import { VisualizeButton } from './components/buttons/visualize-button.js';
import { GenerateMazeButton } from './components/buttons/generate-maze-button.js';
import { GenerateMazeDropdown } from './components/dropdowns/generate-maze-dropdown.js';
import { getGridInfo, getRandomInt } from './utils/helpers.js';
import { TitleButton } from './components/buttons/title-button.js';
import { ToggleWeightsButton } from './components/buttons/toggle-weights.js';
import { SidebarButton } from './components/buttons/sidebar-button.js';

export default function Grid() {
  const [mouseIsDown, setMouseDown] = useState(false);
  const [draggingStartNode, setDraggingStartNode] = useState(false);
  const [draggingEndNode, setDraggingEndNode] = useState(false);
  const [grid, setGrid] = useState(() => init());
  const [algorithm, setAlgorithm] = useState('');
  const [mazeGenAlgorithm, setMazeGenAlgorithm] = useState('prims');
  const [pathHasBeenVisualized, setPathHasBeenVisualized] = useState(false);
  const [moveNodeRandomly, setMoveNodeRandomly] = useState(true);
  const [needsStartNodeHint, setStartNodeHint] = useState(true);
  const [mazeHasBeenVisualized, setMazeHasBeenVisualized] = useState(false);
  const [viewWeights, setViewWeights] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  function handleResize() {
    const [x_dir, y_dir] = getGridInfo(grid);

    let margin = 0;
    if (window.innerWidth < window.innerHeight) {
      margin = Math.floor(0.05 * window.innerWidth);
    } else {
      margin = Math.floor(0.05 * window.innerHeight);
    }

    const nodeSize =
      Math.floor((window.innerHeight - 85 - margin) / y_dir) <
      Math.floor((window.innerWidth - margin) / x_dir)
        ? Math.floor((window.innerHeight - 85 - margin) / y_dir)
        : Math.floor((window.innerWidth - margin) / x_dir);

    document.documentElement.style.setProperty('--node-size', `${nodeSize}px`);
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
        <TitleButton></TitleButton>
        <GenerateMazeButton
          algorithm={mazeGenAlgorithm}
          grid={grid}
          setGrid={setGrid}
          mazeHasBeenVisualized={mazeHasBeenVisualized}
          setMazeHasBeenVisualized={setMazeHasBeenVisualized}
        ></GenerateMazeButton>
        <GenerateMazeDropdown setAlgorithm={setMazeGenAlgorithm}></GenerateMazeDropdown>
        <VisualizeButton
          algorithm={algorithm}
          grid={grid}
          setGrid={setGrid}
          pathHasBeenVisualized={pathHasBeenVisualized}
          setPathHasBeenVisualized={setPathHasBeenVisualized}
        ></VisualizeButton>
        <AlgorithmDropdown setAlgorithm={setAlgorithm}></AlgorithmDropdown>
        <Clear grid={grid} setGrid={setGrid} setPathHasBeenVisualized={setPathHasBeenVisualized}></Clear>
        <ClearAll
          grid={grid}
          setGrid={setGrid}
          setMazeHasBeenVisualized={setMazeHasBeenVisualized}
          setPathHasBeenVisualized={setPathHasBeenVisualized}
        ></ClearAll>
        <ToggleWeightsButton viewWeights={viewWeights} setViewWeights={setViewWeights}></ToggleWeightsButton>
        <SidebarButton sidebarVisible={sidebarVisible} setSidebarVisible={setSidebarVisible}></SidebarButton>
      </div>
      <div className="legend">
        <div>
          <label>Start Node</label>
          <Node className="startNode"></Node>
        </div>
        <div>
          <label>Target Node</label>
          <Node className="endNode"></Node>
        </div>
        <div>
          <label>Unvisited Node</label>
          <Node className="blank"></Node>
        </div>
        <div>
          <label>Visited Nodes</label>
          <Node className="visited"></Node>
          <Node className="on-stack"></Node>
        </div>
        <div>
          <label>Shorest Path</label>
          <Node className="path"></Node>
        </div>
        <div>
          <label>Wall</label>
          <Node className="wall"></Node>
        </div>
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
                viewWeights={viewWeights}
                heuristic={ele.heuristic}
              ></Node>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
