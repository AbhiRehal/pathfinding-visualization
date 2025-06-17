import './buttons.css';

export function ToggleWeightsButton({ viewWeights, setViewWeights }) {
  function handleClick() {
    setViewWeights(!viewWeights);
  }

  return (
    <button className="toggle-button" onClick={handleClick}>
      <span className="toggle-button-text">W</span>
    </button>
  );
}
