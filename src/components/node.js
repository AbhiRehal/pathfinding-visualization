import { aStar } from '../algorithms/pathfinding/a-star';
import { breadthFirstSearch } from '../algorithms/pathfinding/breadth-first-search';
import { depthFirstSearch } from '../algorithms/pathfinding/depth-first-search';
import { dijkstras } from '../algorithms/pathfinding/dijkstras';
import {
  inBounds,
  getRandomInt,
  generatePath,
  getGridInfo,
  getCompassDirections,
  clearPath
} from '../utils/helpers';

const debug = false;

export function Node({
  className = 'node',
  visited = 'false',
  walkable = 'false',
  row,
  col,
  mouseIsDown,
  setGrid,
  grid,
  prev_node_row,
  prev_node_col,
  draggingStartNode,
  setDraggingStartNode,
  draggingEndNode,
  setDraggingEndNode,
  prevClassName,
  pathHasBeenVisualized,
  algorithm,
  moveNodeRandomly,
  setMoveNodeRandomly,
  timestamp,
  setStartNodeHint,
  distance,
  weight,
  viewWeights,
  heuristic,
  viewHeuristic
}) {
  function handleMouseDown() {
    if (debug) {
      console.log(
        `mouseDown from row: ${row} col: ${col} className: ${className} at timestamp: ${Date.now()}`
      );
    }
    let localGrid = [...grid];

    // set booleans to true if initial click is on start/endNode or on a blinking node due to idle animation
    // also sets the node hint boolena to false because the users already clicked it
    if (className == 'startNode' || className == 'startNode hint') {
      timestamp.current = Date.now();
      let localGrid = [...grid];
      localGrid[row][col].className = 'startNode';
      localGrid[row][col].distance = 99;
      setGrid(localGrid);
      setStartNodeHint(false);
      setDraggingStartNode(true);
      return;
    }

    if (className == 'endNode' || className == 'endNode idle') {
      timestamp.current = Date.now();
      let localGrid = [...grid];
      localGrid[row][col].className = 'endNode';
      setGrid(localGrid);
      setDraggingEndNode(true);
      return;
    }

    // handles initial click one time
    if (className != 'wall') {
      localGrid[row][col].className = 'wall';
    } else {
      localGrid[row][col].className = 'node';
    }

    setGrid(localGrid);
  }

  function handleMouseUp() {
    if (debug) {
      console.log(`mouseUp from row: ${row} col: ${col} className: ${className} at timestamp: ${Date.now()}`);
    }
    let localGrid = [...grid];

    // if you you were dragging the start/endNode you set the boolean back to false
    // moveNodeRandomly == true from App.js as if you just click start/endNode it randomly place it somewhere
    // and if pathHasBeenVisualized it will recalculate the path on click, else itll just move node randomly
    if (draggingStartNode) {
      setDraggingStartNode(false);
      if (moveNodeRandomly) {
        const [x_dir, y_dir, startNode, endNode] = getGridInfo(localGrid);
        let rand = {};
        do {
          rand = {
            x: getRandomInt(1, x_dir),
            y: getRandomInt(1, y_dir)
          };
        } while (localGrid[rand.y][rand.x].className == 'endNode');
        localGrid[rand.y][rand.x].prev_className = localGrid[rand.y][rand.x].className;
        localGrid[rand.y][rand.x].className = 'startNode';
        localGrid[rand.y][rand.x].distance = 0;
        localGrid[startNode.y][startNode.x].className = localGrid[startNode.y][startNode.x].prev_className;
      } else {
        localGrid[row][col].distance = 0;
      }
    }

    if (draggingEndNode) {
      setDraggingEndNode(false);
      if (moveNodeRandomly) {
        const [x_dir, y_dir, startNode, endNode] = getGridInfo(localGrid);
        let rand = {};
        do {
          rand = {
            x: getRandomInt(1, x_dir),
            y: getRandomInt(1, y_dir)
          };
        } while (localGrid[rand.y][rand.x].className == 'startNode');
        localGrid[rand.y][rand.x].prev_className = localGrid[rand.y][rand.x].className;
        localGrid[rand.y][rand.x].className = 'endNode';
        localGrid[endNode.y][endNode.x].className = localGrid[endNode.y][endNode.x].prev_className;
      }
    }

    // visualizes the path if pathHasBeenVisualized - outside prior ifs makes it do it everytime even if
    // youre just adding walls which can
    if (pathHasBeenVisualized) {
      clearPath(localGrid, setGrid);
      if (algorithm == 'a-star') {
        aStar(
          'm',
          grid,
          setGrid,
          inBounds,
          generatePath,
          getGridInfo,
          getCompassDirections,
          pathHasBeenVisualized
        );
      } else if (algorithm == 'breadth-first-search') {
        breadthFirstSearch(
          localGrid,
          setGrid,
          inBounds,
          generatePath,
          getGridInfo,
          getCompassDirections,
          pathHasBeenVisualized
        );
      } else if (algorithm == 'depth-first-search') {
        depthFirstSearch(
          localGrid,
          setGrid,
          inBounds,
          generatePath,
          getGridInfo,
          getCompassDirections,
          pathHasBeenVisualized
        );
      } else if (algorithm == 'dijkstras') {
        dijkstras(
          localGrid,
          setGrid,
          inBounds,
          generatePath,
          getGridInfo,
          getCompassDirections,
          pathHasBeenVisualized
        );
      }
    }

    setMoveNodeRandomly(true);
    setGrid(localGrid);
  }

  function handleMouseEnter() {
    if (debug) {
      console.log(
        `mouseEnter from row: ${row} col: ${col} className: ${className} at timestamp: ${Date.now()}`
      );
    }
    // if we are dragging the start/endNode we need to setMoveNodeRandomly(false) to make sure it doesnt move
    // those respective nodes to a random position. Other than that, it preserves current state by setting
    // prev_className and revisualises path if pathHasBeenVisualized. Guarded clasuses to prevent recalling
    // setGrid redundantly as pathdinging algorithms already do that
    if (mouseIsDown && draggingStartNode) {
      setMoveNodeRandomly(false);
      let localGrid = [...grid];
      localGrid[row][col].prev_className = localGrid[row][col].className;
      localGrid[row][col].className = 'startNode';

      if (pathHasBeenVisualized) {
        clearPath(localGrid, setGrid);
        if (algorithm == 'a-star') {
          aStar(
            'm',
            grid,
            setGrid,
            inBounds,
            generatePath,
            getGridInfo,
            getCompassDirections,
            pathHasBeenVisualized
          );
        } else if (algorithm == 'breadth-first-search') {
          breadthFirstSearch(
            localGrid,
            setGrid,
            inBounds,
            generatePath,
            getGridInfo,
            getCompassDirections,
            pathHasBeenVisualized
          );
        } else if (algorithm == 'depth-first-search') {
          depthFirstSearch(
            localGrid,
            setGrid,
            inBounds,
            generatePath,
            getGridInfo,
            getCompassDirections,
            pathHasBeenVisualized
          );
        } else if (algorithm == 'dijkstras') {
          dijkstras(
            localGrid,
            setGrid,
            inBounds,
            generatePath,
            getGridInfo,
            getCompassDirections,
            pathHasBeenVisualized
          );
        }
        return;
      }

      setGrid(localGrid);
      return;
    }

    if (mouseIsDown && draggingEndNode) {
      setMoveNodeRandomly(false);
      let localGrid = [...grid];
      localGrid[row][col].prev_className = localGrid[row][col].className;
      localGrid[row][col].className = 'endNode';

      if (pathHasBeenVisualized) {
        clearPath(localGrid, setGrid);
        if (algorithm == 'a-star') {
          aStar(
            'm',
            grid,
            setGrid,
            inBounds,
            generatePath,
            getGridInfo,
            getCompassDirections,
            pathHasBeenVisualized
          );
        } else if (algorithm == 'breadth-first-search') {
          breadthFirstSearch(
            localGrid,
            setGrid,
            inBounds,
            generatePath,
            getGridInfo,
            getCompassDirections,
            pathHasBeenVisualized
          );
        } else if (algorithm == 'depth-first-search') {
          depthFirstSearch(
            localGrid,
            setGrid,
            inBounds,
            generatePath,
            getGridInfo,
            getCompassDirections,
            pathHasBeenVisualized
          );
        } else if (algorithm == 'dijkstras') {
          dijkstras(
            localGrid,
            setGrid,
            inBounds,
            generatePath,
            getGridInfo,
            getCompassDirections,
            pathHasBeenVisualized
          );
        }
        return;
      }

      setGrid(localGrid);
      return;
    }

    // if youre not dragging start/endNode just add/erase walls
    if (mouseIsDown) {
      let localGrid = [...grid];
      if (className == 'startNode' || className == 'startNode hint' || className == 'endNode') {
        return;
      }
      if (className != 'wall') {
        localGrid[row][col].className = 'wall';
      } else {
        localGrid[row][col].className = 'node';
      }
      setGrid(localGrid);
    }
  }

  function handleMouseLeave() {
    if (debug) {
      console.log(
        `mouseLeave from row: ${row} col: ${col} className: ${className} at timestamp: ${Date.now()}`
      );
    }
    // sets node back to what it was before the start/endNode was dragged into its spot
    if (draggingStartNode || draggingEndNode) {
      let localGrid = [...grid];
      localGrid[row][col].className = localGrid[row][col].prev_className;
      setGrid(localGrid);
    }
  }

  return (
    <button
      className={className}
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
    >
      {viewWeights ? weight : viewHeuristic ? (heuristic > 1000 ? '\u221E' : heuristic) : ''}
    </button>
  );
}
