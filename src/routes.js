import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import Categories from "views/Categories.js";
import Foundations from "views/Foundations.js";
import AllUsers from "views/AllUsers.js";
import AllProducts from "views/AllProducts.js";
import Payments from "views/Payments.js";
import Typography from "views/Typography.js";
import Icons from "views/Icons.js";
import Maps from "views/Maps.js";
import Notifications from "views/Notifications.js";
import Upgrade from "views/Upgrade.js";

const dashboardRoutes = [
  // {
  //   upgrade: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "nc-icon nc-alien-33",
  //   component: Upgrade,
  //   layout: "/admin",
  // },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/list",
    name: "All Users",
    icon: "nc-icon nc-circle-09",
    component: AllUsers,
    layout: "/admin",
  },
  {
    path: "/categories",
    name: "Categories",
    icon: "nc-icon nc-grid-45",
    component: Categories,
    layout: "/admin",
  },
  {
    path: "/products",
    name: "Products",
    icon: "nc-icon nc-album-2",
    component: AllProducts,
    layout: "/admin",
  },

  {
    path: "/foundations",
    name: "Foundations",
    icon: "nc-icon nc-support-17",
    component: Foundations,
    layout: "/admin",
  },
  {
    path: "/payments",
    name: "Payments",
    icon: "nc-icon nc-credit-card",
    component: Payments,
    layout: "/admin",
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "nc-icon nc-atom",
  //   component: Icons,
  //   layout: "/admin",
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "nc-icon nc-pin-3",
  //   component: Maps,
  //   layout: "/admin",
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "nc-icon nc-bell-55",
  //   component: Notifications,
  //   layout: "/admin",
  // },
];

export default dashboardRoutes;
