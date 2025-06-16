import './dropdowns.css';

export function AlgorithmDropdown({ setAlgorithm }) {
  const handleEvent = event => {
    setAlgorithm(event.target.value);
  };

  return (
    <>
      <select
        className="algorithm-dropdown"
        name="algorithms"
        id="algorithm-dropdown"
        onChange={handleEvent}
        defaultValue=""
      >
        <option value="" disabled hidden>
          Algorithms
        </option>
        <option value="a-star">A*</option>
        <option value="breadth-first-search">Breadth first serach</option>
        <option value="depth-first-search">Depth first search</option>
        <option value="dijkstras">Dijkstras</option>
      </select>
    </>
  );
}
