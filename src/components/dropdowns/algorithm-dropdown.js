export function AlgorithmDropdown({ setAlgorithm }) {
  const handleEvent = event => {
    setAlgorithm(event.target.value);
  };

  return (
    <>
      <select name="algorithms" id="algorithm-dropdown" onChange={handleEvent}>
        <option value="a-star">A*</option>
        <option value="breadth-first-search">Breadth first serach</option>
        <option value="depth-first-search">Depth first search</option>
        <option value="dijkstras">Dijkstras</option>
      </select>
    </>
  );
}
