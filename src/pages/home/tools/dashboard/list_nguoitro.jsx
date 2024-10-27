import React, { useState, useEffect } from "react";
import api from "../../../../components/api";
import List_nguoi from "./list_nguoitro/list_nguoi";
import Details_nguoi from "./list_nguoitro/details_nguoi";

const ListNguoitro = ({ option, onClose, user, onUserUpdate }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateuser, setIsUpdateuser] = useState(false);
  const [slideMain, setslideMain] = useState(false);
  const [slideSub, setslideSub] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };
  return (
    <div className={`bottom-box-white-bg ${isClosing ? "hide-out" : ""}`}>
      <div className="detectOut" onClick={handleClose} />
      <div className={`bottom-box-white ${isClosing ? "hide-down" : ""}`}>
        <div className="top-bar">
          <div className="bar"></div>
        </div>
        {isUpdateuser ? (
          <div className={`slider fade-in-5 ${slideMain}`}>
            <Details_nguoi
              nguoitro={isUpdateuser}
              token={user?.app?.access_token}
              onUserUpdate={onUserUpdate}
              handleBack={() => {
                setslideMain("slideOut2");
                setTimeout(() => {
                  setslideSub("slideIn2");
                  setIsUpdateuser(false);
                }, 200);
              }}
            />
          </div>
        ) : (
          <div className={`slider fade-in-5 ${slideSub}`}>
            <List_nguoi
              handleClose={handleClose}
              token={user?.app?.access_token}
              handleNguoitro={(e) => {
                setslideSub("slideOut");
                setTimeout(() => {
                  setslideMain("slideIn");
                  if (e.id) setIsUpdateuser(e);
                }, 200);
              }}
              user={user}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ListNguoitro;
