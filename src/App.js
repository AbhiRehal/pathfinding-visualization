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
import { Legend } from './components/legend.js';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { tourSteps } from './config/tourConfig.js';
import { Sidebar } from './components/sidebar.js';

export default function Grid() {
  const [mouseIsDown, setMouseDown] = useState(false);
  const [draggingStartNode, setDraggingStartNode] = useState(false);
  const [draggingEndNode, setDraggingEndNode] = useState(false);
  const [grid, setGrid] = useState(() => init());
  const [algorithm, setAlgorithm] = useState('');
  const [mazeGenAlgorithm, setMazeGenAlgorithm] = useState('random');
  const [pathHasBeenVisualized, setPathHasBeenVisualized] = useState(false);
  const [moveNodeRandomly, setMoveNodeRandomly] = useState(true);
  const [needsStartNodeHint, setStartNodeHint] = useState(true);
  const [mazeHasBeenVisualized, setMazeHasBeenVisualized] = useState(false);
  const [viewWeights, setViewWeights] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  let mousePosition = useRef({ x: 0, y: 0 });
  let sidebarResizeRefObject = useRef({ mouseDown: false, x: 0 });

  function handleMousePosition(e) {
    mousePosition.current.x = e.clientX;
    mousePosition.current.y = e.clientY;
    if (sidebarResizeRefObject.current.mouseDown) {
      const sidebarWidth =
        100 - (100 * e.clientX) / window.innerWidth > 35
          ? 35
          : 100 - (100 * e.clientX) / window.innerWidth < 20
            ? 20
            : 100 - (100 * e.clientX) / window.innerWidth;
      document.documentElement.style.setProperty('--sidebar-width', `${sidebarWidth}vw`);
      document.documentElement.style.setProperty(
        '--sidebar-button-padding',
        `${(sidebarWidth * window.innerWidth) / 100 - 34}px`
      );
      if (sidebarWidth >= 35 || sidebarWidth <= 20) {
        return;
      }

      function resizeGrid() {
        const [x_dir, y_dir] = getGridInfo(grid);

        let margin = 0;
        if (window.innerWidth < window.innerHeight) {
          margin = Math.floor(0.05 * window.innerWidth);
        } else {
          margin = Math.floor(0.05 * window.innerHeight);
        }

        const height = Math.floor(
          (window.innerHeight - Math.floor(0.15 * window.innerHeight) - margin) / y_dir
        );
        const width = Math.floor(
          (window.innerWidth - (window.innerWidth * sidebarWidth) / 100 - margin) / x_dir
        );

        const nodeSize = height < width ? height : width;
        document.documentElement.style.setProperty('--node-size', `${nodeSize}px`);
      }

      resizeGrid();
    }
  }

  function handleMouseUpSidebarResize(e) {
    sidebarResizeRefObject.current.mouseDown = false;
  }

  // setup listeners for sidebar resizing
  useEffect(() => {
    window.addEventListener('mousemove', handleMousePosition);
    window.addEventListener('mouseup', handleMouseUpSidebarResize);
    return () => {
      window.removeEventListener('mousemove', handleMousePosition);
      window.removeEventListener('mouseup', handleMouseUpSidebarResize);
    };
  }, []);

  // setup tour
  useEffect(() => {
    const delayTour = setTimeout(() => {
      let driverObj = driver({
        showProgress: false,
        allowClose: false,
        showButtons: ['next', 'close'],
        steps: [
          {
            element: null,
            popover: {
              title: 'Pathfinding Visualizer',
              description: 'This short tutorial will walk you through the features of this application.',
              doneBtnText: 'Continue',
              onNextClick: () => {
                driverObj = driver({
                  showProgress: true,
                  steps: [...tourSteps]
                });
                driverObj.drive();
              }
            }
          }
        ]
      });
      driverObj.drive();
    }, 50);
    return () => clearInterval(delayTour);
  }, []);

  function handleResize() {
    const [x_dir, y_dir] = getGridInfo(grid);

    let margin = 0;
    if (window.innerWidth < window.innerHeight) {
      margin = Math.floor(0.05 * window.innerWidth);
    } else {
      margin = Math.floor(0.05 * window.innerHeight);
    }

    const height = Math.floor((window.innerHeight - Math.floor(0.15 * window.innerHeight) - margin) / y_dir);
    const sidebarWidth = getComputedStyle(document.documentElement).getPropertyValue('--sidebar-width');
    const sidebarWidthPixels = (window.innerWidth * parseFloat(sidebarWidth)) / 100;
    const width = sidebarVisible
      ? Math.floor((window.innerWidth - sidebarWidthPixels - margin) / x_dir)
      : Math.floor((window.innerWidth - margin) / x_dir);
    const nodeSize = height < width ? height : width;

    document.documentElement.style.setProperty('--node-size', `${nodeSize}px`);
  }

  // setup resizing listener for window
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [sidebarVisible]);

  // setup hint timer
  let timestamp = useRef(Date.now());
  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() - timestamp.current < 5000) {
        return;
      }
      if (needsStartNodeHint && !pathHasBeenVisualized) {
        let localGrid = [...grid];
        const [x_dir, y_dir, startNode, endNode] = getGridInfo(localGrid);
        localGrid[startNode.y][startNode.x].className = 'startNode hint';
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
        {/* <ToggleWeightsButton viewWeights={viewWeights} setViewWeights={setViewWeights}></ToggleWeightsButton> */}
        <SidebarButton
          grid={grid}
          sidebarVisible={sidebarVisible}
          setSidebarVisible={setSidebarVisible}
        ></SidebarButton>
      </div>
      <div className="content-container">
        <div className="legend-grid-container">
          <Legend></Legend>
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
        </div>
        {sidebarVisible ? (
          <Sidebar mousePosition={mousePosition} sidebarResizeRefObject={sidebarResizeRefObject}></Sidebar>
        ) : null}
      </div>
    </>
  );
}
