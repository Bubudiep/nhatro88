import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import logo from "../../img/logo.png";
import UserCard from "../../components/user-card";
import bg_night from "../../img/home_city_night.png";
import bg_day from "../../img/bg_day.png";
const Home = ({ user }) => {
  const hour = new Date().getHours();
  const pageStyle = {
    backgroundImage: `url(${hour > 16 ? bg_night : bg_day})`,
  };
  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <div className="home-page" style={pageStyle}>
      <UserCard user={user} />
    </div>
  );
};

export default Home;
