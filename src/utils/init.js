import { getRandomInt, getRandomEvenInt } from './helpers';

export function init() {
  const x_dir = 65;
  const y_dir = 25;

  // grid is the board that we have. Start with an empty array for this
  const grid = [];

  for (let y = 0; y < y_dir; y++) {
    const row = [];
    for (let x = 0; x < x_dir; x++) {
      const node = {
        index: x * y + x,
        x: x,
        y: y,
        className: 'blank',
        walkable: false,
        visited: false,
        prev_node_x: 0,
        prev_node_y: 0,
        weight: getRandomInt(1, 10),
        distance: 1_000_000,
        prev_className: 'blank'
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
  grid[starterNode.y][starterNode.x].distance = 0;

  const endNode = {
    x: getRandomInt(1, x_dir - 1),
    y: getRandomInt(1, y_dir - 1)
  };
  grid[endNode.y][endNode.x].className = 'endNode';

  return grid;
}
