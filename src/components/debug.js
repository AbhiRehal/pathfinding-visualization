export function DebugButton({ grid }) {
  function handleClick() {
    console.log(`grid: ${grid}`);
  }

  return (
    <button className="debug-button" onClick={handleClick}>
      DEBUG
    </button>
  );
}
