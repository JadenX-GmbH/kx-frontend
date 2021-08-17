import React, { useEffect, FC } from "react";
import { useLocation, Route, Switch } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";

import axios from "axios";
// core components
import AdminNavbar from "../components/Navbars/AdminNavbar";
// import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "../components/Sidebar/Sidebar";
import { useHistory } from "react-router-dom";

import routes from "../routes";
import inner_routes from "../inner-page-routes";

import { Auth } from "aws-amplify";

import { setToken, setUser } from "../store/actions";
import { USER_PROFILE } from "../util/api";
import { useDispatch } from "react-redux";
import { routeProp } from "../util/types";

type Props = {
  location: {
    pathname: string;
  };
};

const Admin: FC<Props> = ({ location, children, ...props }) => {
  const dispatch = useDispatch();
  let history = useHistory();
  const mainContent = React.useRef(null);
  const Location = useLocation();

  const logUserOut = () => {
    Auth.signOut()
      .then((result) => {
        history.push(`/auth/login`);
      })
      .catch((e) => {
        console.log(e);
        history.push(`/auth/login`);
      });
  };

  useEffect(() => {
    console.log("trying to authenticate");
    Auth.currentAuthenticatedUser()
      .then((user) => {
        console.log(user.pool);

        let token = "";

        Object.keys(localStorage).forEach((item) => {
          if (item.includes("idToken")) {
            token = localStorage.getItem(item)!;
          }
        });

        if (token.length) {
          dispatch(setToken(token));
          axios
            .get(USER_PROFILE, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              console.log(response.data);
              dispatch(
                setUser({
                  name: `${response.data.details.surname} ${response.data.details.name}`,
                  userPhoto: response.data.userPhoto,
                })
              );
            })
            .catch((err) => {
              console.log(err);
              logUserOut();
            });
        } else logUserOut();
      })
      .catch((e) => {
        console.log(e);
        logUserOut();
      });
  }, []);

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement!.scrollTop = 0;
    //mainContent.current!.scrollTop = 0;
  }, [Location]);

  const getRoutes = (routes: routeProp[]) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            exact
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  const getBrandText = (path: string) => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  return (
    <>
      <Sidebar
        {...props}
        routes={routes}
        logo={{
          innerLink: "/admin/index",
          imgSrc: require("../assets/img/brand/kx_3_normal.png").default,
          imgAlt: "...",
        }}
      />
      <div className="main-content" ref={mainContent}>
        <AdminNavbar {...props} brandText={getBrandText(location.pathname)} />
        <Switch>
          {getRoutes(routes.concat(inner_routes))}
          {/* <Redirect from="*" to="/admin/index" /> */}
        </Switch>
        <Container fluid>{/* <AdminFooter /> */}</Container>
      </div>
    </>
  );
};

export default Admin;
