export function ToggleWeightsButton({ viewWeights, setViewWeights, setViewHeuristic }) {
  function handleClick() {
    setViewHeuristic(false);
    setViewWeights(!viewWeights);
  }

  return <button onClick={handleClick}>Toggle weights</button>;
}
