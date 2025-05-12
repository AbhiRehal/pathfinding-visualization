export function PrimsMazeGenButton({ grid, setGrid }) {
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
    const frontier_set = [];
    localGrid[startNode.y][startNode.x].className = 'startNode';

    const directions = [
      { dx: 2, dy: 0 },
      { dx: 0, dy: 2 },
      { dx: -2, dy: 0 },
      { dx: 0, dy: -2 }
    ];

    for (const dir of directions) {
      if (!inBounds(startNode.x + dir.dx, startNode.y + dir.dy, x_dir, y_dir)) {
        continue;
      }
      frontier_set.push(localGrid[startNode.y + dir.dy][startNode.x + dir.dx]);
      localGrid[startNode.y + dir.dy][startNode.x + dir.dx].className = 'frontier';
    }

    do {
      const random_cell_from_fs = frontier_set.splice(getRandomInt(0, frontier_set.length), 1)[0];
      // get neighbours_cells of the random_cell you just got
      const neighbour_set = [];
      // for the random_cell we look at its neighbours in all 4 directions. If the neighbours are
      // either a node/starterNode, the node is added to the neighbour_set otherwise its added to
      // the frontier_set which we will continue to explore later.
      for (const dir of directions) {
        if (!inBounds(random_cell_from_fs.x + dir.dx, random_cell_from_fs.y + dir.dy, x_dir, y_dir)) {
          continue;
        }
        if (
          localGrid[random_cell_from_fs.y + dir.dy][random_cell_from_fs.x + dir.dx].className == 'node' ||
          localGrid[random_cell_from_fs.y + dir.dy][random_cell_from_fs.x + dir.dx].className ==
            'startNode' ||
          localGrid[random_cell_from_fs.y + dir.dy][random_cell_from_fs.x + dir.dx].className == 'endNode'
        ) {
          neighbour_set.push(localGrid[random_cell_from_fs.y + dir.dy][random_cell_from_fs.x + dir.dx]);
        } else if (
          localGrid[random_cell_from_fs.y + dir.dy][random_cell_from_fs.x + dir.dx].className == 'wall'
        ) {
          frontier_set.push(localGrid[random_cell_from_fs.y + dir.dy][random_cell_from_fs.x + dir.dx]);
          localGrid[random_cell_from_fs.y + dir.dy][random_cell_from_fs.x + dir.dx].className = 'frontier';
        }
      }
      // we then take a random cell form the neighbours and join the random_cell_from_fs with that neightbour
      const random_neighbour_cell = neighbour_set.splice(getRandomInt(0, neighbour_set.length), 1)[0];
      random_cell_from_fs.className = 'node';
      localGrid[(random_cell_from_fs.y + random_neighbour_cell.y) / 2][
        (random_cell_from_fs.x + random_neighbour_cell.x) / 2
      ].className = 'node';

      // uncomment for animation
      // setGrid([...localGrid]);
      // await new Promise(resolve => setTimeout(resolve, 1));
    } while (frontier_set.length > 0);

    localGrid[endNode.y][endNode.x].className = 'endNode';

    for (let i = 0; i < y_dir; i++) {
      for (let j = 0; j < x_dir; j++) {
        if (i == 0 || i == y_dir - 1 || j == 0 || j == x_dir - 1) {
          grid[i][j].className = 'wall';
        }
      }
    }

    setGrid(localGrid);
  }

  return (
    <button className="pmg" onClick={handleClick}>
      Prims Maze Gen
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
