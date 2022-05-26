import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Signin from "./admin/Signin";

// import "bootstrap/dist/css/bootstrap.min.css";
// import "./assets/css/animate.min.css";
// import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
// import "./assets/css/demo.css";
// import "./assets/css/style.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";

import "./assets/admin/vendor/fonts/boxicons.css";
import "./assets/admin/vendor/css/core.css";
import "./assets/admin/vendor/css/theme-default.css";
import "./assets/admin/css/demo.css";
import "./assets/admin/vendor/libs/perfect-scrollbar/perfect-scrollbar.css";
import "./assets/admin/vendor/css/pages/page-auth.css";

import "./assets/admin/vendor/js/helpers.js";
import "./assets/admin/js/config.js";

import "./assets/admin/vendor/libs/jquery/jquery.js";
import "./assets/admin/vendor/libs/popper/popper.js";
import "./assets/admin/vendor/js/bootstrap.js";
import "./assets/admin/vendor/libs/perfect-scrollbar/perfect-scrollbar.js";
import "./assets/admin/vendor/js/menu.js";
import "./assets/admin/js/main.js";

import AdminLayout from "layouts/Admin.js";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      <Route path="/" component={Signin} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
