export function GenerateMazeDropdown({ setAlgorithm }) {
  const handleEvent = event => {
    setAlgorithm(event.target.value);
  };

  return (
    <>
      <select name="generate-maze-dropdown" id="generate-maze-dropdown" onChange={handleEvent}>
        <option value="prims">Prims Maze Gen</option>
      </select>
    </>
  );
}
