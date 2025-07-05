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
      // set --sidebar-button-padding after calculating the required padding
      document.querySelector('.sidebar-button').classList.add('sidebar-button-padding');
      const sidebarWidth = getComputedStyle(document.documentElement).getPropertyValue('--sidebar-width');
      const sidebarWidthPixels = (window.innerWidth * parseFloat(sidebarWidth)) / 100;
      document.documentElement.style.setProperty('--sidebar-button-padding', `${sidebarWidthPixels - 34}px`);
      document.documentElement.style.setProperty('--sidebar-button-pointer', 'e-resize');
      const height = Math.floor(
        (window.innerHeight - Math.floor(0.15 * window.innerHeight) - margin) / y_dir
      );
      const width = Math.floor((window.innerWidth - sidebarWidthPixels - margin) / x_dir);
      nodeSize = height < width ? height : width;
    } else {
      // set --sidebar-button-padding to default 30px when sidebar is closed
      document.querySelector('.sidebar-button').classList.remove('sidebar-button-padding');
      document.documentElement.style.setProperty('--sidebar-button-padding', `30px`);
      document.documentElement.style.setProperty('--sidebar-button-pointer', 'w-resize');
      const height = Math.floor(
        (window.innerHeight - Math.floor(0.15 * window.innerHeight) - margin) / y_dir
      );
      const width = Math.floor((window.innerWidth - margin) / x_dir);
      nodeSize = height < width ? height : width;
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
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M14.97 2V22"
            stroke="#fff"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M7.96997 9.43994L10.53 11.9999L7.96997 14.5599"
            stroke="#fff"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
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
