export function Node({ className = 'node', visited = 'false', walkable = 'false', row, col, isChecked, setButtonClassNames, grid }) {
  function handleClick() {
    const localGrid = [...grid];
    if (isChecked) {
      localGrid[row][col].className = 'frontier';
    } else {
      localGrid[row][col].className = 'node';
    }
    setButtonClassNames(localGrid);
    console.log(`x: ${col} y: ${row} className:${className}`);
  }

  return <button className={className} onClick={handleClick}></button>;
}
