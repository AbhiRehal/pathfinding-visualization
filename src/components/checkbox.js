export function Checkbox({ isChecked, setChecked }) {
  return (
    <>
      <input id="wall-checkbox" type="checkbox" checked={isChecked} onChange={e => setChecked(e.target.checked)}></input>
      <label for="wall-checkbox">Set walls</label>
    </>
  );
}
