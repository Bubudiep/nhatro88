import React, { useState } from "react";
import api from "../../../../components/api";
import house_mini from "../../../../img/house_mini.png";
import Add_nhatro from "./list_nhatro/add_nhatro";
import Edit_nhatro from "./list_nhatro/edit_nhatro";
import List_nhatro from "./list_nhatro/list_nhatro";
const ListNhatro = ({ option, onClose, user, onUserUpdate }) => {
  const [isThemtro, setIsThemTro] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isUpdate, setIsUpdate] = useState(null);
  const [slideDanhsach, setSlideDanhsach] = useState("");
  const [slideNhatro, setSlideNhatro] = useState("");
  const [themtroError, setThemtroError] = useState("");

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleThemnhatro = (e) => {
    setSlideDanhsach("slideOut");
    setTimeout(() => {
      setSlideNhatro("slideIn");
      setIsThemTro(true);
    }, 200);
  };
  const handleUpdateTro = (e) => {
    const updateData = user.nhatro.find((nhatro) => nhatro.id === e);
    setSlideDanhsach("slideOut");
    setTimeout(() => {
      setSlideNhatro("slideIn");
      setIsUpdate(updateData);
    }, 200);
  };

  const handleBack = () => {
    setSlideNhatro("slideOut2");
    setTimeout(() => {
      setSlideDanhsach("slideIn2");
      setIsUpdate(null);
      setIsThemTro(false);
    }, 200);
  };

  return (
    <div className={`bottom-box-white-bg ${isClosing ? "hide-out" : ""}`}>
      <div className="detectOut" onClick={handleClose} />
      <div className={`bottom-box-white ${isClosing ? "hide-down" : ""}`}>
        <div className="top-bar">
          <div className="bar"></div>
        </div>
        {isThemtro ? ( // Step 2: Form điền chi tiết nhà trọ
          <div
            className={`slider p-[20px] message-box fade-in-5 gap-2 flex flex-col ${slideNhatro}`}
          >
            <Add_nhatro
              handleBack={handleBack}
              onUserUpdate={onUserUpdate}
              token={user?.app?.access_token}
            />
          </div>
        ) : isUpdate ? (
          <div className={`slider fade-in-5 ${slideNhatro}`}>
            <Edit_nhatro
              nhatro={isUpdate}
              handleBack={handleBack}
              onUserUpdate={onUserUpdate}
              token={user?.app?.access_token}
            />
          </div>
        ) : (
          <div className={`slider fade-in-5 ${slideDanhsach}`}>
            <List_nhatro
              user={user}
              handleThemnhatro={handleThemnhatro}
              handleUpdateTro={handleUpdateTro}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ListNhatro;
