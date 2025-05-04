export function Node({
  className = 'node',
  visited = 'false',
  walkable = 'false',
  row,
  col,
  isChecked,
  setButtonClassNames,
  grid,
  prev_node_row,
  prev_node_col
}) {
  function handleClick() {
    console.log(
      `x: ${col} y: ${row} className:${className} prev_node_row: ${prev_node_row} prev_node_col: ${prev_node_col}}`
    );
  }

  return <button className={className} onClick={handleClick}></button>;
}
