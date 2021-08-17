import Index from "./views/Index";
import Profile from "./views/examples/Profile";
import Maps from "./views/examples/Maps";
import Register from "./views/examples/Register";
import Login from "./views/examples/Login";
import Tables from "./views/examples/Tables";
import Icons from "./views/examples/Icons";
import Contacts from "./views/general/Contacts";
import Gigs from "./views/general/Gigs/Gigs";
import Datasets from "./views/general/Datasets/Datasets";
import Executions from "./views/general/Executions/Executions";
import Home from "./views/general/Dashboard/Home";
import UnderConstruction from "./views/general/UnderConstruction";

var routes = [
  {
    path: "/home",
    name: "Home",
    icon: "ni ni-bold-right text-primary",
    component: Home,
    layout: "/admin",
  },
  {
    path: "/gigs",
    name: "Gigs",
    icon: "ni ni-bold-right text-primary",
    component: Gigs,
    layout: "/admin",
  },
  {
    path: "/data-sets",
    name: "Data Sets",
    icon: "ni ni-bold-right text-primary",
    component: Datasets,
    layout: "/admin",
  },
  {
    path: "/executions",
    name: "Executions",
    icon: "ni ni-bold-right text-primary",
    component: Executions,
    layout: "/admin",
  },
  {
    path: "/slas",
    name: "Agreements",
    icon: "ni ni-bold-right text-primary",
    component: UnderConstruction,
    layout: "/admin",
  },
  {
    path: "/contacts",
    name: "Contacts",
    icon: "ni ni-bold-right text-primary",
    component: Contacts,
    layout: "/admin",
  },
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "ni ni-pin-3 text-orange",
    component: Maps,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
  },
];
export default routes;
