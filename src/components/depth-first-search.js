export function DFS({ grid, setGrid }) {
  async function handleClick() {
    const x_dir = grid[0].length;
    const y_dir = grid.length;
    const startNode = {
      x: 0,
      y: 0
    };
    const endNode = {
      x: 0,
      y: 0
    };

    for (let row = 0; row < y_dir; row++) {
      for (let col = 0; col < x_dir; col++) {
        if (grid[row][col].className == 'startNode') {
          startNode.x = col;
          startNode.y = row;
        }
        if (grid[row][col].className == 'endNode') {
          endNode.x = col;
          endNode.y = row;
        }
      }
    }

    const directions = [
      { dx: 1, dy: 0 },
      { dx: 0, dy: 1 },
      { dx: -1, dy: 0 },
      { dx: 0, dy: -1 }
    ];

    let localGrid = [...grid];
    const stack = [];

    // bug here where if startNode and endNode are next to each other it wont account for that
    // as this assumes that doesnt happen
    for (const dir of directions) {
      if (
        inBounds(startNode.x, startNode.y, x_dir, y_dir) &&
        localGrid[startNode.y + dir.dy][startNode.x + dir.dx].className == 'node'
      ) {
        stack.push(localGrid[startNode.y + dir.dy][startNode.x + dir.dx]);
        localGrid[startNode.y + dir.dy][startNode.x + dir.dx].prev_node_x = startNode.x;
        localGrid[startNode.y + dir.dy][startNode.x + dir.dx].prev_node_y = startNode.y;
        localGrid[startNode.y + dir.dy][startNode.x + dir.dx].className = 'on-stack';
      }
    }

    setGrid([...localGrid]);
    await new Promise(resolve => setTimeout(resolve, 1));

    let end_found = false;
    do {
      const node_being_checked = stack.pop();
      for (const dir of directions) {
        if (!inBounds(node_being_checked.x + dir.dx, node_being_checked.y + dir.dy, x_dir, y_dir)) {
          continue;
        }
        if (localGrid[node_being_checked.y + dir.dy][node_being_checked.x + dir.dx].className == 'endNode') {
          localGrid[node_being_checked.y + dir.dy][node_being_checked.x + dir.dx].prev_node_x =
            node_being_checked.x;
          localGrid[node_being_checked.y + dir.dy][node_being_checked.x + dir.dx].prev_node_y =
            node_being_checked.y;
          end_found = true;
          break;
        }
        if (
          localGrid[node_being_checked.y + dir.dy][node_being_checked.x + dir.dx].className != 'wall' &&
          localGrid[node_being_checked.y + dir.dy][node_being_checked.x + dir.dx].className != 'startNode' &&
          localGrid[node_being_checked.y + dir.dy][node_being_checked.x + dir.dx].className != 'visited'
        ) {
          stack.push(localGrid[node_being_checked.y + dir.dy][node_being_checked.x + dir.dx]);
          localGrid[node_being_checked.y + dir.dy][node_being_checked.x + dir.dx].className = 'on-stack';
          localGrid[node_being_checked.y + dir.dy][node_being_checked.x + dir.dx].prev_node_x =
            node_being_checked.x;
          localGrid[node_being_checked.y + dir.dy][node_being_checked.x + dir.dx].prev_node_y =
            node_being_checked.y;
          localGrid[node_being_checked.y][node_being_checked.x].className = 'visited';
          continue;
        }
        // if the node being checked is surrounded by walls for example it will just set itself to visited
        localGrid[node_being_checked.y][node_being_checked.x].className = 'visited';
        setGrid([...localGrid]);
        await new Promise(resolve => setTimeout(resolve, 1));
      }
    } while (!end_found && stack.length > 0);

    let path_node = localGrid[endNode.y][endNode.x];
    path_node = localGrid[path_node.prev_node_y][path_node.prev_node_x];
    do {
      path_node.className = 'path';
      path_node = localGrid[path_node.prev_node_y][path_node.prev_node_x];
      setGrid([...localGrid]);
      await new Promise(resolve => setTimeout(resolve, 1));
    } while (path_node.className != 'startNode');

    setGrid(localGrid);
  }

  return (
    <button className="dfs" onClick={handleClick}>
      DFS
    </button>
  );
}

function getRandomInt(min, max) {
  const minimum = Math.ceil(min);
  const maximum = Math.floor(max);
  return Math.floor(Math.random() * (maximum - minimum) + minimum);
}

function inBounds(x, y, x_dir, y_dir) {
  return x < x_dir && x >= 0 && y < y_dir && y >= 0;
}
