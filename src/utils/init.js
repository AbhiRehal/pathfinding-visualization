export function init() {
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
        className: 'wall',
        walkable: false,
        visited: false,
        prev_node_x: 0,
        prev_node_y: 0
      };
      row.push(node);
    }
    grid.push(row);
  }

  const starterNode = {
    x: getRandomInt(1, x_dir - 1),
    y: getRandomInt(1, y_dir - 1)
  };
  grid[starterNode.y][starterNode.x].className = 'startNode';

  const endNode = {
    x: getRandomInt(1, x_dir - 1),
    y: getRandomInt(1, y_dir - 1)
  };
  grid[endNode.y][endNode.x].className = 'endNode';

  return grid;
}

function getRandomInt(min, max) {
  const minimum = Math.ceil(min);
  const maximum = Math.floor(max);
  return Math.floor(Math.random() * (maximum - minimum) + minimum);
}

// export function init(isChecked) {
//   const n = 70;
//   const m = 30;
//
//   const grid = [];
//
//   const startNode = {
//     x: getRandomInt(0, 70),
//     y: getRandomInt(0, 30)
//   };
//
//   const endNode = {
//     x: getRandomInt(0, 70),
//     y: getRandomInt(0, 30)
//   };
//
//   console.log(`startNode: ${JSON.stringify(startNode)}`);
//   console.log(`endNode: ${JSON.stringify(endNode)}`);
//
//   for (let i = 0; i < m; i++) {
//     const row = [];
//     for (let j = 0; j < n; j++) {
//       let node = {
//         index: n * i + j,
//         visited: false,
//         walkable: false,
//         className: 'wall'
//       };
//       if (j == startNode.x && i == startNode.y) {
//         node.className = 'startNode';
//       } else if (j == endNode.x && i == endNode.y) {
//         node.className = 'endNode';
//       } else {
//         node.className = 'node';
//       }
//       row.push(node);
//     }
//     grid.push(row);
//   }
//
//   return grid;
// }
//
// function getRandomInt(min, max) {
//   const minimum = Math.ceil(min);
//   const maximum = Math.floor(max);
//   return Math.floor(Math.random() * (maximum - minimum) + minimum);
// }
