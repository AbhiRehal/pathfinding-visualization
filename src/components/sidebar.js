import * as Tabs from '@radix-ui/react-tabs';
import { ToggleWeightsButton } from './buttons/toggle-weights.js';
import { ToggleHeuristicButton } from './buttons/toggle-heuristic.js';
import './sidebar.css';
import { WallChanceSlider } from './sliders/wall-chance.js';

export function Sidebar({
  grid,
  mousePosition,
  sidebarResizeRefObject,
  viewWeights,
  setViewWeights,
  heuristic,
  viewHeuristic,
  setViewHeuristic,
  setGrid,
  wallChance,
  setWallChance
}) {
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
      <div className="sidebar">
        <Tabs.Root defaultValue="tab1" orientation="vertical" className="tabs-root">
          <Tabs.List aria-label="tabs example" className="tabs-list">
            <Tabs.Trigger value="tab1" className="tab-icon">
              <svg
                viewBox="0 0 24 24"
                height="32px"
                width="32px"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  {' '}
                  <path
                    d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13M12 17H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                    stroke="#fff"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{' '}
                </g>
              </svg>
            </Tabs.Trigger>
            <Tabs.Trigger value="tab2" className="tab-icon">
              <svg
                viewBox="0 0 512 512"
                height="32px"
                width="32px"
                fill="#fff"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    fill="#fff"
                    d="M92.6 21c-32 0-64.04 24-64.04 72L92.6 221l64-128c0-48-32-72-64-72zm282.3 39c-6.9.29-13.6 1.6-19.2 2.8l3.8 17.6c5.6-1.25 11.4-2.04 16.3-2.4zM92.6 61c17.7 0 32 14.33 32 32 0 17.7-14.3 32-32 32-17.67 0-32-14.3-32-32 0-17.67 14.33-32 32-32zm302.2.2l-3 17.7c4.9 1.03 9.8 2.32 14.1 4.9l8.7-15.8c-6.1-3.25-12.9-6.17-19.8-6.8zm-57.5 6.7c-6.1 2.38-12.2 4.51-17.4 6.6L327 91c5.5-2.34 11.3-4.38 16.2-6.1zM431 81.3L417.3 93c3.6 4.12 6.4 9.2 8.6 13.3l16.1-8.1c-3.4-6.55-6.4-11.51-11-16.9zm-127.8.9c-6.1 3.11-11.1 5.88-16.5 8.6l8.8 15.8c5.2-3 10.9-5.9 15.5-8.2zm-32.3 17.9c-5.3 3.1-10.5 6.2-15.6 9.6l9.8 15c4.9-3.2 10-6.2 15-9.2zM448.2 118c-5.9 1-11.9 1.7-17.8 2.4.4 5 .1 10.4-.9 14.6l17.5 4.1c1-7.2 1.9-14.6 1.2-21.1zm-208.1 1.7c-5 3.4-9.9 6.9-14.9 10.3l10.4 14.7c4.8-3.5 9.7-6.8 14.6-10.2zm-29.6 21.1c-5 3.6-10.2 7.6-14.5 10.9l10.9 14.3c5.5-4 9.3-7 14.3-10.7zm213 8c-3 4.6-6.5 9.2-10 12.7l13.1 12.5c4.3-5.1 8.9-10.3 12.1-15.5zm-241.8 14.1c-4.9 3.8-9.8 7.7-14.1 11.3l11.4 13.9c4.7-3.9 9.5-7.9 13.9-11.1zM401.1 173c-4.6 3.7-9.4 7.3-13.8 10.3l10.3 14.8c5.3-3.6 10.5-7.5 15-11.1zm-247.4 12.9c-4.7 3.8-9.2 7.8-13.8 11.7l11.7 13.7c4.5-3.9 9-7.8 13.6-11.6zm218.9 7c-5.1 3-10.4 6.1-15.2 8.7l8.6 15.9c5.4-3.3 11.5-6.2 16-9.2zm-246.4 16.6c-4.5 4-8.9 8-13.4 12.1l12.1 13.4c4.4-4 8.9-8 13.3-12zm215.5.4c-5.3 2.6-10.6 5.3-15.9 7.9l7.7 16.2c6.2-3 10.8-5.5 16.4-8.1zm-32 15.4c-5.5 2.5-10.8 4.9-16.4 7.2l7.3 16.5c5.5-2.4 11-4.9 16.5-7.4zM99.6 234c-5.1 4.5-8.65 8-13.3 12.5l12.7 13c4.7-4.5 8.5-8.4 12.9-12.2zm177.3 5.8c-5.5 2.3-11 4.7-16.5 7l7 16.7c5.6-2.3 11.1-4.7 16.6-7.1zm-33.1 14c-5.5 2.4-11 4.8-16.6 7l7 16.7c5.5-2.3 11.1-4.7 16.6-7zm184.8 7.2c-32 0-64 24-64 72l64 128 64-128c0-48-32-72-64-72zm-218 6.8c-5.7 2.6-11.7 5-16.6 7.1l7.1 16.6c5.9-2.5 11.5-4.9 16.5-7.1zM177.4 282c-5.4 2.5-11.7 5.3-16.5 7.5l7.4 16.4c5.9-2.6 11.1-5.2 16.3-7.4zm-33 15c-5.6 2.7-11.4 5.5-16.4 8l8.1 16.1c5.4-2.8 11-5.4 15.9-7.8zm284.2 4c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zm-316.8 12.3c-5.3 2.9-10.6 5.9-16 9l9 15.6c5.1-3 10.3-5.8 15.5-8.6zM80.1 332c-5.61 3.2-11.03 7.5-15.7 10.6L75.3 357c4.97-3.6 10.32-7.3 14.6-9.9zm-29.9 22.6c-4.8 4.4-9.53 9.5-13.2 13.8l13.7 11.7c3.85-4.7 7.2-8.2 11.7-12.2zm217.8 1.3l1.6 17.9c5.2-.9 10.4-.3 15.6.5l3.1-17.7c-6.6-1-13.6-1.7-20.3-.7zm-37.2 10l6.8 16.7c5.2-2.3 10.6-4.1 16.1-5.8-1.9-5.7-3.3-11.5-4.8-17.3-6.3 1.8-12.6 4.2-18.1 6.4zm77.5-.9l-10.2 14.8c4.2 3.1 8.3 6.4 11.6 10.5l13.6-11.8c-5.1-5.2-9-10.1-15-13.5zm-94.5 9c-5.5 2.8-10.8 6-16.1 9.1l9.1 15.5c5.2-2.8 10.3-6.1 15.4-8.8zM26.01 385c-3.02 6.5-5.47 13.5-6.61 19.7l17.7 3.1c1.08-5.7 2.63-9.8 4.9-14.7-5.49-2.4-10.73-5.3-15.99-8.1zm156.09 7.8c-5.1 3.3-10.1 6.6-15.1 10l10 15c5-3.3 9.9-6.7 14.9-10zm152.7 1.2l-15.1 9.8c3.2 4.8 6.3 9.8 9.2 14.9l15.6-9c-3.5-5.6-6-10.6-9.7-15.7zm-182.7 19c-5 3.3-10 6.5-14.9 10l10 15c4.8-3.5 9.9-6.8 15-10.2zm-114.8 9.5c-5.79 1.2-11.63 2.2-17.45 3.3 1.05 7 3.86 13.8 6.4 19.2l16.25-7.8c-2.17-5-4.23-10.2-5.2-14.7zm316.1 2.8l-15.6 9c3.1 5.4 6.7 11.2 9.6 15.8l15.1-9.7c-3.4-5.3-6.3-10.3-9.1-15.1zm-231 7.5c-5 3.1-9.9 6.1-15.1 9l8.9 15.7c5.3-3.1 10.6-6.2 15.7-9.5zm-71.3 16.3l-12.3 13.2c5.56 5.3 12.42 8.8 19.9 10.4l4-17.5c-4.44-.9-8.59-3.1-11.6-6.1zm41 .3c-5.01 2.3-10.21 4.1-15.6 5.2l4.1 17.6c6.42-1.3 12.46-3.7 18.5-6.2zm280.3 4.8l-13.9 11.3c4.3 5.3 9.6 10.4 14.2 14l11.1-14.2c-4.4-3.4-8.2-7.5-11.4-11.1zm24.1 17.5l-4.5 17.5c7.9 1.6 13.8 2.1 21.2 1.3l-2.2-17.9c-4.9.8-9.7.3-14.5-.9z"
                  ></path>
                </g>
              </svg>
            </Tabs.Trigger>
            <Tabs.Trigger value="tab3" className="tab-icon">
              <svg
                viewBox="0 0 330 330"
                height="32px"
                width="32px"
                fill="#fff"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  {' '}
                  <g>
                    {' '}
                    <path d="M69.166,230c-8.284,0-15,6.716-15,15s6.716,15,15,15h95.836c8.284,0,15-6.716,15-15v-65H230v65c0,8.284,6.716,15,15,15 s15-6.716,15-15V71.547c0-8.284-6.716-15-15-15s-15,6.716-15,15V150H30V30h75.082c8.284,0,15-6.716,15-15s-6.716-15-15-15H15 C6.716,0,0,6.716,0,15v300c0,8.284,6.716,15,15,15h150c8.284,0,15-6.716,15-15s-6.716-15-15-15H30V180h120.002v50H69.166z"></path>{' '}
                    <path d="M315,0H165.002c-8.284,0-15,6.716-15,15v65H75c-8.284,0-15,6.716-15,15s6.716,15,15,15h90.002c8.284,0,15-6.716,15-15V30 H300v270h-75c-8.284,0-15,6.716-15,15s6.716,15,15,15h90c8.284,0,15-6.716,15-15V15C330,6.716,323.284,0,315,0z"></path>{' '}
                  </g>{' '}
                </g>
              </svg>
            </Tabs.Trigger>
            <Tabs.Trigger value="tab4" className="tab-icon">
              <svg
                viewBox="0 0 24 24"
                height="32px"
                width="32px"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  {' '}
                  <path
                    d="M11 3H13C13.5523 3 14 3.44772 14 4V4.56879C14 4.99659 14.2871 5.36825 14.6822 5.53228C15.0775 5.69638 15.5377 5.63384 15.8403 5.33123L16.2426 4.92891C16.6331 4.53838 17.2663 4.53838 17.6568 4.92891L19.071 6.34312C19.4616 6.73365 19.4615 7.36681 19.071 7.75734L18.6688 8.1596C18.3661 8.46223 18.3036 8.92247 18.4677 9.31774C18.6317 9.71287 19.0034 10 19.4313 10L20 10C20.5523 10 21 10.4477 21 11V13C21 13.5523 20.5523 14 20 14H19.4312C19.0034 14 18.6318 14.2871 18.4677 14.6822C18.3036 15.0775 18.3661 15.5377 18.6688 15.8403L19.071 16.2426C19.4616 16.6331 19.4616 17.2663 19.071 17.6568L17.6568 19.071C17.2663 19.4616 16.6331 19.4616 16.2426 19.071L15.8403 18.6688C15.5377 18.3661 15.0775 18.3036 14.6822 18.4677C14.2871 18.6318 14 19.0034 14 19.4312V20C14 20.5523 13.5523 21 13 21H11C10.4477 21 10 20.5523 10 20V19.4313C10 19.0034 9.71287 18.6317 9.31774 18.4677C8.92247 18.3036 8.46223 18.3661 8.1596 18.6688L7.75732 19.071C7.36679 19.4616 6.73363 19.4616 6.34311 19.071L4.92889 17.6568C4.53837 17.2663 4.53837 16.6331 4.92889 16.2426L5.33123 15.8403C5.63384 15.5377 5.69638 15.0775 5.53228 14.6822C5.36825 14.2871 4.99659 14 4.56879 14H4C3.44772 14 3 13.5523 3 13V11C3 10.4477 3.44772 10 4 10L4.56877 10C4.99658 10 5.36825 9.71288 5.53229 9.31776C5.6964 8.9225 5.63386 8.46229 5.33123 8.15966L4.92891 7.75734C4.53838 7.36681 4.53838 6.73365 4.92891 6.34313L6.34312 4.92891C6.73365 4.53839 7.36681 4.53839 7.75734 4.92891L8.15966 5.33123C8.46228 5.63386 8.9225 5.6964 9.31776 5.53229C9.71288 5.36825 10 4.99658 10 4.56876V4C10 3.44772 10.4477 3 11 3Z"
                    stroke="#fff"
                    stroke-width="1.5"
                  ></path>{' '}
                  <path
                    d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z"
                    stroke="#fff"
                    stroke-width="1.5"
                  ></path>{' '}
                </g>
              </svg>
            </Tabs.Trigger>
            <button
              className="share-button"
              onClick={e => {
                navigator.clipboard.writeText(window.location.href);
              }}
            >
              <svg
                viewBox="0 0 24 24"
                height="32px"
                width="32px"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  {' '}
                  <g id="Communication / Share_iOS_Export">
                    {' '}
                    <path
                      id="Vector"
                      d="M9 6L12 3M12 3L15 6M12 3V13M7.00023 10C6.06835 10 5.60241 10 5.23486 10.1522C4.74481 10.3552 4.35523 10.7448 4.15224 11.2349C4 11.6024 4 12.0681 4 13V17.8C4 18.9201 4 19.4798 4.21799 19.9076C4.40973 20.2839 4.71547 20.5905 5.0918 20.7822C5.5192 21 6.07899 21 7.19691 21H16.8036C17.9215 21 18.4805 21 18.9079 20.7822C19.2842 20.5905 19.5905 20.2839 19.7822 19.9076C20 19.4802 20 18.921 20 17.8031V13C20 12.0681 19.9999 11.6024 19.8477 11.2349C19.6447 10.7448 19.2554 10.3552 18.7654 10.1522C18.3978 10 17.9319 10 17 10"
                      stroke="#fff"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{' '}
                  </g>{' '}
                </g>
              </svg>
            </button>
          </Tabs.List>
          <Tabs.Content value="tab1" className="tabs-content">
            <h3>About</h3>
            <br></br>
            <p>
              An algorithm is just a set of instructions a computer follows to solve a specific problem.
              Pathfinding algorithms determine a route between 2 given points (nodes). They can be weighted or
              unweighted, and directed or undirected.
              <br></br>
              <br></br>
              Weighted algorithms take into account the cost of visiting a node while unweighted algorithms
              cannot. Below you'll see that the weighted path, although more convoluted, is cheaper and only
              costs 12 while the unweighted path is simpler but costs 19.
              <br></br>
              <br></br>
              <div>
                {/* <img src="/assets/weighted.gif" alt="Weighted algorithm gif"></img> */}
                <img src="/assets/weighted.png" alt="Weighted algorithm gif"></img>
                <br></br>
                <label>weighted</label>
              </div>
              <br></br>
              <div>
                {/* <img src="/assets/unweighted.gif" alt="Unweighted algorithm gif"></img> */}
                <img src="/assets/unweighted.png" alt="Unweighted algorithm gif"></img>
                <br></br>
                <label>unweighted</label>
              </div>
              <br></br>I mentioned earlier that algorithms can be directed or undirected but theres a subtle
              distinction to be made here. It's more accurate to describe graphs as directed or undirected and
              decribe algorithms as being able to work on directed or undirected graphs. In this project, the
              graph (grid) is undirected which means that there is no edge-edge restriction i.e. there isn't a
              scenario where you can move from node A &rarr; node B but not from node B &rarr; node A.
              <br></br>
              <br></br> The real life analogy for this would be a one way street which is the perfect segway
              into the why? Well, now you essentially know how google maps works! In real life, this grid
              would be the roads you'd drive. The costs would be how busy a road was and as I'm sure you're
              aware, some roads are one way. We could extend this to avoid motorways or add a stop by the
              petstore. Hopefully this has added some context around this application.
            </p>
          </Tabs.Content>
          <Tabs.Content value="tab2" className="tabs-content">
            <h3>Algorithms</h3>
            <br></br>
            <Tabs.Root defaultValue="subtab-2" orientation="horizontal" className="subtabs-root">
              <Tabs.List className="subtabs-list">
                <Tabs.Trigger value="subtab-1" className="subtab-icon">
                  A*
                </Tabs.Trigger>
                <Tabs.Trigger value="subtab-2" className="subtab-icon">
                  BFS
                </Tabs.Trigger>
                <Tabs.Trigger value="subtab-3" className="subtab-icon">
                  DFS
                </Tabs.Trigger>
                <Tabs.Trigger value="subtab-4" className="subtab-icon">
                  Dijkstra's
                </Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content value="subtab-1" className="tabs-content">
                <br></br>
                <h4>A-star</h4>
                <p>
                  <br></br>
                  A* is an informed search algorithm. It's weighted and makes use of a heuristic to guide its
                  search towards the target. You'll notice that compared to the others, A* hones in on the
                  target node as opposed to moving in a general outwards direction from the starting node.
                  <br></br>
                  <br></br>
                  <img src="/assets/a-star-demo.gif" alt="A* demo gif"></img>
                  *numbers above represent the heuristic + the distance for each node.
                  <br></br>
                  <br></br>
                  <img src="/assets/a-star-distances.png" alt="A* distance png"></img>
                  *numbers above represent the distance away form the starting node to each node. The distance
                  is the cost of visiting a node plus the sum of all the nodes visited to get to said node.
                  <br></br>
                  <br></br>
                  <img src="/assets/a-star-heuristic.png" alt="A* heuristic png"></img>
                  *numbers above represent the heuristic for each node. In this example, it uses the Manhattan
                  distance from the target node.
                </p>
              </Tabs.Content>
              <Tabs.Content value="subtab-2" className="tabs-content">
                <br></br>
                <h4>Breadth First Search</h4>
                <p>
                  <br></br>
                  BFS searches outwards in all directions equally. Being an unweighted algorithm, it doesn't
                  take into account the cost of visiting a node. You can see in the gif below that
                  irrespective of whether a node costs '1', '2' or '3' to visit, it searches them all the same
                  and returns the simpliest route once its found its target node - irrespective of whether or
                  not there is a cheaper route to get there. In an unweighted graph, BFS guarantees the
                  shortest path.
                  <br></br>
                  <br></br>
                  <img src="/assets/bfs-demo.gif" alt="BFS demo gif"></img>
                  *numbers above represent the cost associated for visiting each node
                </p>
              </Tabs.Content>
              <Tabs.Content value="subtab-3" className="tabs-content">
                <br></br>
                <h4>Depth First Search</h4>
                <p>
                  <br></br>
                  DFS searches as far down a given path as it can before retracing its steps and then
                  searching as far as possible on the next path until it completes running. DFS is unweighted
                  and is NOT guaranteed to give you the shortest path.
                  <br></br>
                  <br></br>
                  <img src="/assets/dfs-demo-1.gif" alt="DFS demo gif 1"></img>
                  Notice how it just picks a direction and searches until it hits a deadend before retracing
                  its steps until it can search down another path.
                  <br></br>
                  <br></br>
                  <img src="/assets/dfs-demo-2.gif" alt="DFS demo gif 2"></img>
                  DFS does NOT guarantee the shortest path.
                </p>
              </Tabs.Content>
              <Tabs.Content value="subtab-4" className="tabs-content">
                <br></br>
                <h4>Dijkstra's</h4>
                <p>
                  <br></br>
                  Dijksta's is a weighted algorithm and guarantees the shortest path on both weighted and
                  unweighted graphs. On an unweighted graph, Dijkstra's and BFS are the same.
                  <br></br>
                  <br></br>
                  <img src="/assets/dijkstras-demo.gif" alt="Dijkstra's demo gif"></img>
                  *numbers above represent the distance of each node. The distance is calculated by adding the
                  costs of visiting each node leading up to a given node to the number of steps taken to said
                  node. Nodes of an unknown distance represented by &infin;
                  <br></br>
                  <br></br>
                  Notice how it doesn't search outwards equally like BFS does. Instead it preferentially picks
                  the node that is the shortest distance away to visit.
                  <br></br>
                  <br></br>
                  Below you'll see that the path generated by this algorithm is convoluted. It has more turns
                  than simply going straight down and then straight right, however, going straight down and
                  right would be more expensive. You'll also notice that the algorithm hasn't uniformly
                  explored outwards from the start.
                  <br></br>
                  <br></br>
                  <img src="/assets/dijkstras-demo.png" alt="Dijkstra's demo png"></img>
                  *numbers above represent the cost associated for visiting each node. In this case, the
                  cheapest path costs 11.
                </p>
              </Tabs.Content>
            </Tabs.Root>
          </Tabs.Content>
          <Tabs.Content value="tab3" className="tabs-content">
            <h3>Maze Generation Algorithms</h3>
            <Tabs.Root defaultValue="subtab-11" orientation="horizontal" className="subtabs-root">
              <Tabs.List className="subtabs-list">
                <Tabs.Trigger value="subtab-11" className="subtab-icon">
                  Random Walls
                </Tabs.Trigger>
                <Tabs.Trigger value="subtab-12" className="subtab-icon">
                  Prim's
                </Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content value="subtab-11" className="tabs-content">
                <br></br>
                <h4>Random Walls</h4>
                <p>
                  <br></br>
                  Randomly turns blank squares into walls. You can control the random chance of walls being
                  generated under the advanced settings.
                  <br></br>
                  <br></br>
                  <img src="/assets/random-walls-demo.gif" alt="Random walls demo gif"></img>
                </p>
              </Tabs.Content>
              <Tabs.Content value="subtab-12" className="tabs-content">
                <br></br>
                <h4>Prim's</h4>
                <p>
                  <br></br>
                  Prim's algorithm.
                  <br></br>
                  <br></br>
                  <img src="/assets/prims-maze-demo.gif" alt="Prims maze demo gif"></img>
                </p>
              </Tabs.Content>
            </Tabs.Root>
          </Tabs.Content>
          <Tabs.Content value="tab4" className="tabs-content">
            <h3>Advanced Settings</h3>
            <br></br>
            <div>
              <h5>Change the % chance of the random walls maze generation placing a wall</h5>
              <br></br>
              <WallChanceSlider wallChance={wallChance} setWallChance={setWallChance}></WallChanceSlider>
              <br></br>
              <h5>Show more info</h5>
              <br></br>
              <ToggleHeuristicButton
                grid={grid}
                heuristic={heuristic}
                viewHeuristic={viewHeuristic}
                setViewHeuristic={setViewHeuristic}
                setViewWeights={setViewWeights}
                setGrid={setGrid}
              ></ToggleHeuristicButton>
              <ToggleWeightsButton
                viewWeights={viewWeights}
                setViewWeights={setViewWeights}
                setViewHeuristic={setViewHeuristic}
              ></ToggleWeightsButton>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <h4>Coming soon...</h4>
            <div className="coming-soon">
              <br></br>
              <h5>Select the algorithms to compare:</h5>
              <br></br>
              <input type="checkbox" id="a-star-checkbox" name="a-star"></input>
              <label for="a-star-checkbox">A*</label>
              <br></br>
              <input type="checkbox" id="bfs-checkbox" name="bfs-star"></input>
              <label for="bfs-checkbox">BFS</label>
              <br></br>
              <input type="checkbox" id="dfs-checkbox" name="dfs-star"></input>
              <label for="dfs-checkbox">DFS</label>
              <br></br>
              <input type="checkbox" id="dijkstras-checkbox" name="dijkstras-star"></input>
              <label for="dijkstras-checkbox">Dijkstras</label>
            </div>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  );
}
