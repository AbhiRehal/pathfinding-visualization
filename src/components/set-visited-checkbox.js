export function Visited({ isChecked, setChecked }) {
  return (
    <>
      <input id="visited-checkbox" type="checkbox" checked={isChecked} onChange={e => setChecked(e.target.checked)}></input>
      <label for="visited-checkbox">Set visited</label>
    </>
  );
}
