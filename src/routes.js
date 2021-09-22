import Gigs from "./views/general/Gigs/Gigs";
import Datasets from "./views/general/Datasets/Datasets";
import Executions from "./views/general/Executions/Executions";
import Home from "./views/general/Dashboard/Home";
import Offers from "./views/general/Gigs/Offers";

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
    path: "/offers",
    name: "Offers",
    icon: "ni ni-bold-right text-primary",
    component: Offers,
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
];
export default routes;
