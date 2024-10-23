import React, { useState } from "react";
import api from "../../../../components/api";
import house_mini from "../../../../img/house_mini.png";
import Add_nhatro from "./list_nhatro/add_nhatro";
import Edit_nhatro from "./list_nhatro/edit_nhatro";
import List_nhatro from "./list_nhatro/list_nhatro";
import View_nhatro from "./list_nhatro/view_nhatro";
const ListNhatro = ({ option, onClose, user, onUserUpdate }) => {
  const [isThemtro, setIsThemTro] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isUpdate, setIsUpdate] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
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
  const handleViewnhatro = (e) => {
    const updateData = user.nhatro.find((nhatro) => nhatro.id === e);
    setSlideDanhsach("slideOut");
    setTimeout(() => {
      setSlideNhatro("slideIn");
      setIsUpdate(updateData);
      setIsEdit(false);
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
  const handleBack2 = () => {
    setSlideDanhsach("slideOut2");
    setTimeout(() => {
      setSlideNhatro("slideIn2");
      setIsEdit(false);
    }, 200);
  };
  const handleEdittro = () => {
    setSlideNhatro("slideOut");
    setTimeout(() => {
      setSlideDanhsach("slideIn");
      setIsEdit(true);
    }, 200);
  };
  const handlePhongtro = (e) => {
    console.log(e);
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
          isEdit ? (
            <div className={`slider fade-in-5 ${slideDanhsach}`}>
              <Edit_nhatro
                nhatro={isUpdate}
                handleBack={handleBack2}
                onUserUpdate={onUserUpdate}
                token={user?.app?.access_token}
              />
            </div>
          ) : (
            <div className={`slider fade-in-5 ${slideNhatro}`}>
              <View_nhatro
                nhatro={isUpdate}
                handleBack={() => {
                  setSlideNhatro("slideOut2");
                  setTimeout(() => {
                    setSlideDanhsach("slideIn2");
                    setIsUpdate(null);
                    setIsThemTro(false);
                  }, 200);
                }}
                handleEdittro={handleEdittro}
                handlePhongtro={handlePhongtro}
              />
            </div>
          )
        ) : (
          <div className={`slider fade-in-5 ${slideDanhsach}`}>
            <List_nhatro
              user={user}
              handleThemnhatro={handleThemnhatro}
              handleViewnhatro={handleViewnhatro}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ListNhatro;
