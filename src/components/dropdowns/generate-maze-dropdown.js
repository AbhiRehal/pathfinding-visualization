import './dropdowns.css';

export function GenerateMazeDropdown({ setAlgorithm }) {
  const handleEvent = event => {
    setAlgorithm(event.target.value);
  };

  return (
    <>
      <select
        className="generate-maze-dropdown"
        name="generate-maze-dropdown"
        id="generate-maze-dropdown"
        onChange={handleEvent}
      >
        <option value="prims">Prims Maze Gen</option>
        <option value="random">Random Walls</option>
      </select>
    </>
  );
}
