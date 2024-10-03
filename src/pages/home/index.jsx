import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import logo from "../../img/logo.png";
import UserCard from "../../components/user-card";
const Home = ({ user }) => {
  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <div className="home-page">
      <UserCard user={user} />
    </div>
  );
};

export default Home;
