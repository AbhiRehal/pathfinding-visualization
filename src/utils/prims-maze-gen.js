export function primsMazeGen() {
  const x_dir = 71;
  const y_dir = 31;

  // grid is the board that we have. Start with an empty array for this
  const grid = [];

  for (let y = 0; y < y_dir; y++) {
    const row = [];
    for (let x = 0; x < x_dir; x++) {
      const node = {
        index: x * y + x,
        x: x,
        y: y,
        className: "wall",
        walkable: false,
        visited: false,
      };
      row.push(node);
    }
    grid.push(row);
  }

  const starterNode = {
    x: getRandomInt(1, x_dir - 1),
    y: getRandomInt(1, y_dir - 1),
  };

  const frontier_set = [];
  grid[starterNode.y][starterNode.x].className = "startNode";

  const directions = [
    { dx: 2, dy: 0 },
    { dx: 0, dy: 2 },
    { dx: -2, dy: 0 },
    { dx: 0, dy: -2 },
  ];

  for (const dir of directions) {
    if (
      inBounds(starterNode.x + dir.dx, starterNode.y + dir.dy, x_dir, y_dir)
    ) {
      frontier_set.push(grid[starterNode.y + dir.dy][starterNode.x + dir.dx]);
      grid[starterNode.y + dir.dy][starterNode.x + dir.dx].className =
        "frontier";
    }
  }

  do {
    const random_cell_from_fs = frontier_set.splice(
      getRandomInt(0, frontier_set.length),
      1,
    )[0];
    // get neighbours_cells of the random_cell you just got
    const neighbour_set = [];
    for (const dir of directions) {
      if (
        inBounds(
          random_cell_from_fs.x + dir.dx,
          random_cell_from_fs.y + dir.dy,
          x_dir,
          y_dir,
        ) &&
        (grid[random_cell_from_fs.y + dir.dy][random_cell_from_fs.x + dir.dx]
          .className == "node" ||
          grid[random_cell_from_fs.y + dir.dy][random_cell_from_fs.x + dir.dx]
            .className == "startNode")
      ) {
        neighbour_set.push(
          grid[random_cell_from_fs.y + dir.dy][random_cell_from_fs.x + dir.dx],
        );
      } else if (
        inBounds(
          random_cell_from_fs.x + dir.dx,
          random_cell_from_fs.y + dir.dy,
          x_dir,
          y_dir,
        ) &&
        grid[random_cell_from_fs.y + dir.dy][random_cell_from_fs.x + dir.dx]
          .className == "wall"
      ) {
        frontier_set.push(
          grid[random_cell_from_fs.y + dir.dy][random_cell_from_fs.x + dir.dx],
        );
      }
    }
    const random_neighbour_cell = neighbour_set.splice(
      getRandomInt(0, neighbour_set.length),
      1,
    )[0];

    random_cell_from_fs.className = "node";

    grid[(random_cell_from_fs.y + random_neighbour_cell.y) / 2][
      (random_cell_from_fs.x + random_neighbour_cell.x) / 2
    ].className = "node";
  } while (frontier_set.length > 0);

  for (let i = 0; i < y_dir; i++) {
    for (let j = 0; j < x_dir; j++) {
      if (i == 0 || i == y_dir - 1 || j == 0 || j == x_dir - 1) {
        grid[i][j].className = "wall";
      }
    }
  }

  let endNode = {};
  do {
    endNode = {
      x: getRandomInt(1, x_dir - 1),
      y: getRandomInt(1, y_dir - 1),
    };
  } while (grid[endNode.y][endNode.x].className == "wall");
  grid[endNode.y][endNode.x].className = "endNode";

  return grid;
}

function getRandomInt(min, max) {
  const minimum = Math.ceil(min);
  const maximum = Math.floor(max);
  return Math.floor(Math.random() * (maximum - minimum) + minimum);
}

function inBounds(x, y, x_dir, y_dir) {
  return x < x_dir && x >= 0 && y < y_dir && y >= 0;
}
