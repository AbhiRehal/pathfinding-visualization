export function Node({
  className = "node",
  visited = "false",
  walkable = "false",
  row,
  col,
  isChecked,
  setButtonClassNames,
  grid,
}) {
  function handleClick() {
    const localGrid = [...grid];
    // const nodeParams = localGrid[row][col];
    if (isChecked) {
      localGrid[row][col].className = "wall";
    } else {
      localGrid[row][col].className = "visited";
    }
    setButtonClassNames(localGrid);
  }

  return <button className={className} onClick={handleClick}></button>;
}
