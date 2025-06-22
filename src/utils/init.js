import { getRandomInt, getRandomEvenInt } from './helpers';

export function init() {
  let margin = 0;
  if (window.innerWidth < window.innerHeight) {
    margin = Math.floor(0.05 * window.innerWidth);
  } else {
    margin = Math.floor(0.05 * window.innerHeight);
  }

  const x_dir = Math.floor((window.innerWidth - margin) / 21);
  const y_dir = Math.floor((window.innerHeight - 85 - margin) / 21);

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
        prev_className: 'blank',
        walkable: false,
        visited: false,
        prev_node_x: 0,
        prev_node_y: 0,
        weight: getRandomInt(1, 4),
        distance: 1_000_000,
        heuristic: 1_000_000
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
  grid[starterNode.y][starterNode.x].heuristic = 0;

  const endNode = {
    x: getRandomInt(1, x_dir - 1),
    y: getRandomInt(1, y_dir - 1)
  };
  grid[endNode.y][endNode.x].className = 'endNode';

  return grid;
}
