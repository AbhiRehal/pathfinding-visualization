import './buttons.css';

export function TitleButton() {
  return (
    <button className="title-button" onClick={() => window.location.reload()}>
      <span className="title-button-text">Pathfinding Visualizer</span>
    </button>
  );
}
