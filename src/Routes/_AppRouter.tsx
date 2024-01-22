import { Route, Switch } from "react-router-dom";

import { lecturerRoutes, publicRoutes, userRoutes } from "./routesData";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import { useAppSelector } from "../store/hooks";
import { selectAuthentication } from "../store/reducers/auth-reducer";


function AppRouter() {
  const authSlice = useAppSelector(selectAuthentication);
  return (
    <Switch>
      {!authSlice.isLoggedIn &&
        publicRoutes.map((route) => (
          <Route
            path={route.path}
            exact
            key={route.path}
          >
            <route.element />
          </Route>
        ))}
      {authSlice.isLoggedIn &&
        userRoutes.map((route) => (
          <Route
            path={route.path}
            exact
            key={route.path}
          >
            <route.element />
          </Route>
        ))}

      {authSlice.isLoggedIn &&
        authSlice.user?.role === "Lecturer" &&
        lecturerRoutes.map((route) => (
          <Route
            path={route.path}
            exact
            key={route.path}
          >
            <route.element />
          </Route>
        ))}
      {authSlice.isLoggedIn ? (
        <Route
          path="*"
          exact
          component={HomePage}
        />
      ) : (
        <Route
          path="*"
          exact
          component={LoginPage}
        />
      )}
    </Switch>
  );
}

export default AppRouter;
