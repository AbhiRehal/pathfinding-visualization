import { Node } from './node.js';

export function Legend() {
  return (
    <div className="legend">
      <div>
        <label>Start Node</label>
        <Node className="startNode"></Node>
      </div>
      <div>
        <label>Target Node</label>
        <Node className="endNode"></Node>
      </div>
      <div>
        <label>Unvisited Node</label>
        <Node className="blank"></Node>
      </div>
      <div>
        <label>Visited Nodes</label>
        <Node className="visited"></Node>
        <Node className="on-stack"></Node>
      </div>
      <div>
        <label>Shorest Path</label>
        <Node className="path"></Node>
      </div>
      <div>
        <label>Wall</label>
        <Node className="wall"></Node>
      </div>
    </div>
  );
}
