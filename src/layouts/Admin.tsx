import React, { useEffect, FC, useState } from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
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
import { useSelector } from "react-redux";

import { setToken, setUser } from "../store/actions";
import { USER_PROFILE } from "../util/api";
import { useDispatch } from "react-redux";
import { routeProp, UserType, Store } from "../util/types";
import ProgressIndicator from "../components/Utility/ProgressIndicator/ProgressIndicator";

type Props = {
  location: {
    pathname: string;
  };
};

const Admin: FC<Props> = ({ location, children, ...props }) => {
  const user = useSelector((state: Store) => state.user);
  const dispatch = useDispatch();
  let history = useHistory();
  const mainContent = React.useRef(null);
  const Location = useLocation();
  const [loading, setLoading] = useState<boolean>(false);

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
    setLoading(true);
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
              setLoading(false);
              dispatch(
                setUser({
                  interId: response.data.id,
                  id: response.data.uid,
                  userPhoto: response.data.userPhoto,
                  description: response.data.description,
                  firstName: response.data.details.name,
                  lastName: response.data.details.surname,
                  email: response.data.details.email,
                  type: response.data.type as UserType,
                  addresses: response.data.userAddresses,
                  skills: response.data.userSkillsets,
                  backgroundPhoto: response.data.backgroundPhoto,
                  tagLine: response.data.tagLine,
                  userGigs: response.data.userGigs,
                })
              );
            })
            .catch((err) => {
              setLoading(false);
              console.log(err);
              logUserOut();
            });
        } else logUserOut();
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
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
            path={prop.path}
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
      if (location.pathname.indexOf(routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  let filtered = routes.filter((item) => {
    if (user && user.type === "RDO" && item.name === "Offers") {
      return false;
    }

    if (user && user.type === "DS" && item.name === "Data Sets") {
      return false;
    }

    return true;
  });

  let filteredInnerRoutes = inner_routes.filter((item) => {
    if (user && user.type === "DS" && item.name === "DatasetNew") {
      return false;
    }

    return true;
  });

  return (
    <>
      <Sidebar
        {...props}
        routes={filtered}
        logo={{
          innerLink: "/home",
          imgSrc: require("../assets/img/brand/kx_3_normal.png").default,
          imgAlt: "...",
        }}
      />
      <div className="main-content" ref={mainContent}>
        <AdminNavbar {...props} brandText={getBrandText(location.pathname)} />
        <Switch>
          {getRoutes(filtered.concat(filteredInnerRoutes))}
          <Route path="*" >
            <Redirect to="/home"/>
          </Route>
        </Switch>
        {/* {loading ? <ProgressIndicator message="Loading..." /> : null} */}
        <Container fluid>{/* <AdminFooter /> */}</Container>
      </div>
    </>
  );
};

export default Admin;
