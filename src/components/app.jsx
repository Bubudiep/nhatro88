import React from "react";
import { Route } from "react-router-dom";
import { App, ZMPRouter, AnimationRoutes, SnackbarProvider } from "zmp-ui";
import { RecoilRoot } from "recoil";
import HomePage from "../pages";
import Home from "../pages/home";
import { UserProvider } from "../context/UserContext";
import PrivateRoute from "./PrivateRoute"; // Import PrivateRoute
import "@fortawesome/fontawesome-free/css/all.min.css";

const MyApp = () => {
  return (
    <RecoilRoot>
      <App>
        <SnackbarProvider>
          <ZMPRouter>
            <UserProvider>
              <AnimationRoutes>
                <Route
                  path="/"
                  element={<PrivateRoute element={Home} />}
                ></Route>
                <Route path="/start" element={<HomePage />}></Route>
              </AnimationRoutes>
            </UserProvider>
          </ZMPRouter>
        </SnackbarProvider>
      </App>
    </RecoilRoot>
  );
};
export default MyApp;
