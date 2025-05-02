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

    const localGrid = [...grid];

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
        nodes_to_check.push(localGrid[startNode.y + dir.dy][localGrid.x + dir.dx]);
        localGrid[startNode.y + dir.dy][startNode.x + dir.dx].className = 'visited';
      }
    }

    // for (let row = 0; row < localGrid.length; row++) {
    //   for (let col = 0; col < localGrid[row].length; col++) {
    //     if (localGrid[row][col].x == startNode.x + 1 && localGrid[row][col].y == startNode.y && localGrid[row][col].visited == false) {
    //       localGrid[row][col].className = 'visited';
    //     }
    //   }
    // }
    //
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
