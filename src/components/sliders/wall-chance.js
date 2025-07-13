export function WallChanceSlider({ wallChance, setWallChance }) {
  return (
    <div>
      <label>Wall chance ({wallChance}%)</label>
      <input
        type="range"
        id="wall-chance"
        name="wall-chance"
        min="10"
        max="90"
        value={wallChance}
        onChange={e => setWallChance(e.target.value)}
      ></input>
    </div>
  );
}
