export function DFS({ grid, setGrid }) {
  async function handleClick() {}

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
