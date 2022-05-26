import React, { Component } from "react";
import { useLocation, NavLink } from "react-router-dom";

import { Nav } from "react-bootstrap";

import logo from "assets/img/reactlogo.png";

function Sidebar({ color, image, routes }) {
  const location = useLocation();
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  return (
    <aside id="layout-menu" class="layout-menu menu-vertical menu bg-menu-theme">
      <div class="app-brand demo">
        <a href="/" class="app-brand-link">
          <span class="app-brand-text demo menu-text fw-bolder ms-2">Just Friend</span>
        </a>

        <a href="javascript:void(0);" class="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
          <i class="bx bx-chevron-left bx-sm align-middle"></i>
        </a>
      </div>

      <div class="menu-inner-shadow"></div>

      <ul class="menu-inner py-1">
        {routes.map((prop, key) => {
          if (!prop.redirect)
            return (
              <li
                className={"menu-item " + activeRoute(prop.layout + prop.path)}
                key={key}
              >
                <NavLink
                  to={prop.layout + prop.path}
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bx-home-circle"></i>
                  {/* <i className={prop.icon}></i> */}
                  <div>{prop.name}</div>
                </NavLink>
              </li>
            );s
          return null;
        })}
        <li className={"menu-item "}>
          <NavLink
            to="/admin/ReportedUsers"
            className="menu-link"
          >
            <i className="menu-icon tf-icons bx bx-user"></i>
            <div>Reported Users</div>
          </NavLink>
        </li>
        <li className={"menu-item "}>
          <NavLink
            to="/admin/ReportedReviews"
            className="menu-link"
          >
            <i className="menu-icon tf-icons bx bx-user"></i>
            <div>Reported Reviews</div>
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
