export function init(isChecked) {
  const n = 70;
  const m = 30;

  const grid = [];

  const startNode = {
    x: getRandomInt(0, 70),
    y: getRandomInt(0, 30)
  };

  const endNode = {
    x: getRandomInt(0, 70),
    y: getRandomInt(0, 30)
  };

  console.log(`startNode: ${JSON.stringify(startNode)}`);
  console.log(`endNode: ${JSON.stringify(endNode)}`);

  for (let i = 0; i < m; i++) {
    const row = [];
    for (let j = 0; j < n; j++) {
      let node = {
        index: n * i + j,
        visited: false,
        walkable: false,
        className: 'wall'
      };
      if (j == startNode.x && i == startNode.y) {
        node.className = 'startNode';
      } else if (j == endNode.x && i == endNode.y) {
        node.className = 'endNode';
      } else {
        node.className = 'node';
      }
      row.push(node);
    }
    grid.push(row);
  }

  return grid;
}

function getRandomInt(min, max) {
  const minimum = Math.ceil(min);
  const maximum = Math.floor(max);
  return Math.floor(Math.random() * (maximum - minimum) + minimum);
}
