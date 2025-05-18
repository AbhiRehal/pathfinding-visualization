export function Node({
  className = 'node',
  visited = 'false',
  walkable = 'false',
  row,
  col,
  isChecked,
  setGrid,
  grid,
  prev_node_row,
  prev_node_col
}) {
  function handleClick() {
    console.log(
      `x: ${col} y: ${row} className:${className} prev_node_row: ${prev_node_row} prev_node_col: ${prev_node_col}}`
    );

    let localGrid = [...grid];

    if (className != 'wall') {
      localGrid[row][col].className = 'wall';
    } else {
      localGrid[row][col].className = 'node';
    }

    setGrid(localGrid);
  }

  return <button className={className} onClick={handleClick}></button>;
}
