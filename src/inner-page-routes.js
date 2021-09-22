import ExecutionDetail from "./views/general/Executions/ExecutionDetail";
import ExplorationDetail from "./views/general/Executions/ExplorationDetail";
import ExecutionCreate from "./views/general/Executions/ExecutionCreate";
import ExplorationCreate from "./views/general/Executions/ExplorationCreate";
import GigDetail from "./views/general/Gigs/GigDetail";
import GigCreate from "./views/general/Gigs/GigCreate";

import OfferDetail from "./views/general/Gigs/OfferDetail";
import OfferCreate from "./views/general/Gigs/OfferCreate";
import Login from "./views/examples/Login";

import Profile from "./views/general/Profile/View";
import ProfileEdit from "./views/general/Profile/Edit";
import DatasetCreate from "./views/general/Datasets/DatasetCreate";

var routes = [
  {
    path: "/executions/explorations/new/:gigId",
    name: "ExplorationCreate",
    icon: "",
    component: ExplorationCreate,
    layout: "/admin",
  },
  {
    path: "/executions/new/:gigId",
    name: "ExecutionCreate",
    icon: "",
    component: ExecutionCreate,
    layout: "/admin",
  },
  {
    path: "/executions/:execId/",
    name: "ExecutionDetail",
    icon: "",
    component: ExecutionDetail,
    layout: "/admin",
  },
  {
    path: "/executions/explorations/:explId/",
    name: "ExplorationDetail",
    icon: "",
    component: ExplorationDetail,
    layout: "/admin",
  },
  {
    path: "/gigs/:gigId/offers/new",
    name: "OfferCreate",
    icon: "",
    component: OfferCreate,
    layout: "/admin",
  },
  {
    path: "/gigs/:gigId/offers/:offerId",
    name: "OfferDetail",
    icon: "",
    component: OfferDetail,
    layout: "/admin",
  },

  {
    path: "/gigs/new",
    name: "GigCreate",
    icon: "",
    component: GigCreate,
    layout: "/admin",
  },
  {
    path: "/gigs/:gigId",
    name: "GigDetail",
    icon: "",
    component: GigDetail,
    layout: "/admin",
  },

  {
    path: "/profile/:userId/edit",
    name: "ProfileEdit",
    icon: "",
    component: ProfileEdit,
    layout: "/admin",
  },

  {
    path: "/profile/:userId",
    name: "ProfileView",
    icon: "",
    component: Profile,
    layout: "/admin",
  },

  {
    path: "/data-sets/new",
    name: "DatasetNew",
    icon: "",
    component: DatasetCreate,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },
];
export default routes;
