import React from "react";
import { Route } from "react-router-dom";
import { App, ZMPRouter, AnimationRoutes, SnackbarProvider } from "zmp-ui";
import { RecoilRoot } from "recoil";
import HomePage from "../pages";
import Home from "../pages/home";
import { UserProvider } from "../context/UserContext";
import PrivateRoute from "./PrivateRoute"; // Import PrivateRoute
import "@fortawesome/fontawesome-free/css/all.min.css";
import NhatroHome from "../pages/home/trangchu/NhatroDashboard";

const MyApp = () => {
  return (
    <RecoilRoot>
      <App>
        <SnackbarProvider>
          <ZMPRouter>
            <UserProvider>
              <AnimationRoutes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/start" element={<HomePage />}></Route>
                <Route path="/nhatro" element={<NhatroHome />}></Route>
              </AnimationRoutes>
            </UserProvider>
          </ZMPRouter>
        </SnackbarProvider>
      </App>
    </RecoilRoot>
  );
};
export default MyApp;
