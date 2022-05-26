import React, { Component } from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";

import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

import routes from "routes.js";

import UserProfile from "../views/UserProfile.js";
import ProductDetails from "../views/ProductDetails.js";
import SubCategories from "../views/SubCategories.js";
import CategoryProducts from "../views/CategoryProducts.js";
import ReportedUsers from "../views/ReportedUsers.js";
import ReportedReviews from "../views/ReportedReviews.js";

import sidebarImage from "assets/img/sidebar-3.jpg";
import { isAuthenticated } from "../services/auth";

function Admin() {
  const [image, setImage] = React.useState(sidebarImage);
  const [color, setColor] = React.useState("black");
  const [hasImage, setHasImage] = React.useState(true);
  const location = useLocation();
  const mainPanel = React.useRef(null);
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            render={(props) =>
              isAuthenticated() ? (
                <prop.component {...props} />
              ) : (
                <Redirect
                  to={{
                    pathname: "/",
                    state: { from: props.location },
                  }}
                />
              )
            }
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    // mainPanel.current.scrollTop = 0;
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      var element = document.getElementById("bodyClick");
      element.parentNode.removeChild(element);
    }
  }, [location]);
  return (
    <>
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <Sidebar color={color} image={hasImage ? image : ""} routes={routes} />
          <div className="layout-page">
            <AdminNavbar />
            <div className="content-wrapper">
              <Switch>
                {getRoutes(routes)}

                <Route
                  path="/admin/UserProfile"
                  component={isAuthenticated() ? UserProfile : null}
                />
                <Route
                  path="/admin/ProductDetails"
                  component={isAuthenticated() ? ProductDetails : null}
                />
                <Route
                  path="/admin/SubCategory"
                  component={isAuthenticated() ? SubCategories : null}
                />
                <Route
                  path="/admin/CategoryProducts"
                  component={isAuthenticated() ? CategoryProducts : null}
                />
                <Route
                  path="/admin/ReportedUsers"
                  component={isAuthenticated() ? ReportedUsers : null}
                />
                <Route
                  path="/admin/ReportedReviews"
                  component={isAuthenticated() ? ReportedReviews : null}
                />
              </Switch>
              <Footer />
            </div>     
          </div>     
        </div>     
      </div>
    </>
  );
}

export default Admin;
