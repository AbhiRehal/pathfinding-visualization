import './buttons.css';

export function TitleButton() {
  function handleClick() {
    console.log(`This will take you back to the initial state`);
  }

  return (
    <button className="title-button" onClick={handleClick}>
      <span className="title-button-text">Pathfinding Visualizer</span>
    </button>
  );
}
