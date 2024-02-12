// Layout.js

import { Outlet, Link } from "react-router-dom";
import "./Layout.css"; // Import the CSS file for styling

const Layout = () => {
  return (
    <div className="container">
      <nav className="sidebar">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Profile">Profile</Link>
          </li>
          <li>
            <Link to="/Chat">Chat</Link>
          </li>
          <li>
            <Link to="/Workflow">Workflow</Link>
          </li>
        </ul>
      </nav>

      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
