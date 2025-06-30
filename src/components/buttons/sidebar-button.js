import './buttons.css';
import { getGridInfo } from '../../utils/helpers';

export function SidebarButton({ grid, sidebarVisible, setSidebarVisible }) {
  function handleClick() {
    const [x_dir, y_dir] = getGridInfo(grid);

    let margin = 0;
    if (window.innerWidth < window.innerHeight) {
      margin = Math.floor(0.05 * window.innerWidth);
    } else {
      margin = Math.floor(0.05 * window.innerHeight);
    }

    let nodeSize = 0;
    if (!sidebarVisible) {
      nodeSize =
        Math.floor((window.innerHeight - Math.floor(0.1 * window.innerHeight) - margin) / y_dir) <
        Math.floor((window.innerWidth - Math.floor(0.2 * window.innerWidth) - margin) / x_dir)
          ? Math.floor((window.innerHeight - Math.floor(0.1 * window.innerHeight) - margin) / y_dir)
          : Math.floor((window.innerWidth - Math.floor(0.2 * window.innerWidth) - margin) / x_dir);
      // set --sidebar-button-padding after calculating the required padding
      document.querySelector('.sidebar-button').classList.add('sidebar-button-padding');
      document.documentElement.style.setProperty(
        '--sidebar-button-padding',
        `${Math.floor(0.2 * window.innerWidth) - 34}px`
      );
    } else {
      nodeSize =
        Math.floor((window.innerHeight - Math.floor(0.1 * window.innerHeight) - margin) / y_dir) <
        Math.floor((window.innerWidth - margin) / x_dir)
          ? Math.floor((window.innerHeight - Math.floor(0.1 * window.innerHeight) - margin) / y_dir)
          : Math.floor((window.innerWidth - margin) / x_dir);
      // set --sidebar-button-padding to default 30px when sidebar is closed
      document.querySelector('.sidebar-button').classList.remove('sidebar-button-padding');
      document.documentElement.style.setProperty('--sidebar-button-padding', `30px`);
    }
    document.documentElement.style.setProperty('--node-size', `${nodeSize}px`);

    setSidebarVisible(!sidebarVisible);
  }

  return (
    <button className="sidebar-button" onClick={handleClick}>
      {sidebarVisible ? (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M21.97 15V9C21.97 4 19.97 2 14.97 2H8.96997C3.96997 2 1.96997 4 1.96997 9V15C1.96997 20 3.96997 22 8.96997 22H14.97C19.97 22 21.97 20 21.97 15Z"
            stroke="#fff"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M14.97 2V22"
            stroke="#fff"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M7.96997 9.43994L10.53 11.9999L7.96997 14.5599"
            stroke="#fff"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      ) : (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M21.97 15V9C21.97 4 19.97 2 14.97 2H8.96997C3.96997 2 1.96997 4 1.96997 9V15C1.96997 20 3.96997 22 8.96997 22H14.97C19.97 22 21.97 20 21.97 15Z"
            stroke="#fff"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.96997 2V22"
            stroke="#fff"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14.97 9.43994L12.41 11.9999L14.97 14.5599"
            stroke="#fff"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}
