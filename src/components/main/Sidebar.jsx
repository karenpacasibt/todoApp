import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '@styles/Sidebar.css';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`sidebar bg-dark text-white p-2 ${collapsed ? 'collapsed' : ''}`}>
      <button
        className="btn btn-outline-light btn-sm w-100 mb-3"
        onClick={() => setCollapsed(!collapsed)}
      >
        <i className={`bi ${collapsed ? 'bi-arrow-bar-right' : 'bi-arrow-bar-left'}`}></i>
      </button>

      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink to="/task" className="nav-link">
            <i className="bi bi-list-task me-2"></i>
            {!collapsed && 'Task'}
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/" className="nav-link">
            <i className="bi bi-tags me-2"></i>
            {!collapsed && 'Tag'}
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/" className="nav-link">
            <i className="bi bi-bookmark-check-fill me-2"></i>
            {!collapsed && 'Categories'}
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
