export function BFS({ grid, setGrid }) {
  function handleClick() {
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
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
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

    let localGrid = [...grid];

    const directions = [
      { dx: 1, dy: 0 },
      { dx: 0, dy: 1 },
      { dx: -1, dy: 0 },
      { dx: 0, dy: -1 }
    ];

    const nodes_to_check = [];
    for (const dir of directions) {
      if (
        inBounds(startNode.x + dir.dx, startNode.y + dir.dy, x_dir, y_dir) &&
        localGrid[startNode.y + dir.dy][startNode.x + dir.dx].className != 'wall'
      ) {
        nodes_to_check.push(grid[startNode.y + dir.dy][startNode.x + dir.dx]);
        localGrid[startNode.y + dir.dy][startNode.x + dir.dx].className = 'visited';
        localGrid[startNode.y + dir.dy][startNode.x + dir.dx].prev_node_x = startNode.x;
        localGrid[startNode.y + dir.dy][startNode.x + dir.dx].prev_node_y = startNode.y;
      }
    }

    let end_found = false;

    do {
      const node_being_checked = nodes_to_check.shift();
      for (const dir of directions) {
        if (
          inBounds(node_being_checked.x + dir.dx, node_being_checked.y + dir.dy, x_dir, y_dir) &&
          localGrid[node_being_checked.y + dir.dy][node_being_checked.x + dir.dx].className == 'endNode'
        ) {
          localGrid[node_being_checked.y + dir.dy][node_being_checked.x + dir.dx].prev_node_x =
            node_being_checked.x;
          localGrid[node_being_checked.y + dir.dy][node_being_checked.x + dir.dx].prev_node_y =
            node_being_checked.y;
          end_found = true;
          break;
        }
        if (
          inBounds(node_being_checked.x + dir.dx, node_being_checked.y + dir.dy, x_dir, y_dir) &&
          localGrid[node_being_checked.y + dir.dy][node_being_checked.x + dir.dx].className != 'wall' &&
          localGrid[node_being_checked.y + dir.dy][node_being_checked.x + dir.dx].className != 'startNode' &&
          localGrid[node_being_checked.y + dir.dy][node_being_checked.x + dir.dx].className != 'visited'
        ) {
          localGrid[node_being_checked.y + dir.dy][node_being_checked.x + dir.dx].prev_node_x =
            node_being_checked.x;
          localGrid[node_being_checked.y + dir.dy][node_being_checked.x + dir.dx].prev_node_y =
            node_being_checked.y;
          nodes_to_check.push(localGrid[node_being_checked.y + dir.dy][node_being_checked.x + dir.dx]);
          localGrid[node_being_checked.y + dir.dy][node_being_checked.x + dir.dx].className = 'visited';
        }
      }
    } while (!end_found && nodes_to_check.length > 0);
    console.log(`Finished loop`);

    let node_to_add_to_path = localGrid[endNode.y][endNode.x];
    do {
      if (node_to_add_to_path.className == 'startNode') {
        break;
      }
      node_to_add_to_path.className = 'path';
      node_to_add_to_path = localGrid[node_to_add_to_path.prev_node_y][node_to_add_to_path.prev_node_x];
    } while (node_to_add_to_path.className != 'startNode');
    localGrid[endNode.y][endNode.x].className = 'endNode';
    setGrid(localGrid);
  }

  return (
    <button className="bfs" onClick={handleClick}>
      BFS
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
