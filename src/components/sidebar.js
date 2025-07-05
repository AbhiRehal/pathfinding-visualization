export function Sidebar({ mousePosition, sidebarResizeRefObject }) {
  function handleMouseDown() {
    sidebarResizeRefObject.current.x = mousePosition.current.x;
    sidebarResizeRefObject.current.mouseDown = true;
  }

  function handleMouseUp() {
    console.log(`mouseUp at ${JSON.stringify(mousePosition)}`);
  }

  return (
    <div className="sidebar-layout-container">
      <div className="sidebar-resize-edge" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}></div>
      <div className="sidebar"></div>
    </div>
  );
}
