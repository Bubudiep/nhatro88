import React, { useState } from "react";
import api from "../../../../../components/api";

const Update_phong = ({ phong, token, handleUpdatesuccess }) => {
  const [errorMes, setErrorMes] = useState("");
  const [Isloading, setIsloading] = useState(false);
  const [formUpdates, setformupdates] = useState({
    phong: phong.id,
    giaphong: phong.giaPhong,
    sodien: phong.sodien,
    sonuoc: phong.sonuoc,
    dieuhoa: phong.dieuhoa,
    nonglanh: phong.nonglanh,
    wifi: phong.wifi,
  });
  const handleBack = () => {
    handleUpdatesuccess();
  };
  const handleLuulai = () => {
    setIsloading(true);
    const update = api
      .post(`/u-phong/`, formUpdates, token)
      .then((response) => {
        setformupdates((prevState) => ({
          ...prevState,
          giaphong: response.phong.giaPhong,
          sodien: response.phong.sodien,
          sonuoc: response.phong.sonuoc,
          dieuhoa: response.phong.dieuhoa,
          nonglanh: response.phong.nonglanh,
          wifi: response.phong.wifi,
        }));
        setErrorMes("");
        handleUpdatesuccess(response);
      })
      .catch((error) => {
        setErrorMes("Lỗi khi cập nhật, vui lòng thử lại sau!");
        console.error("Lỗi khi cập nhật:", error);
      })
      .finally(() => {
        setIsloading(false);
      });
  };
  return (
    <>
      <div className="title2">
        {phong.soPhong} ({phong.tenTang}) - cập nhập
      </div>
      <div className="body-container">
        <div className="chitiet-phongtro">
          <div className="thongtin-edit">
            <table>
              <tbody>
                <tr>
                  <td>Giá phòng</td>
                  <td>
                    <input
                      type="number"
                      value={formUpdates.giaphong}
                      onChange={(e) => {
                        setformupdates((prevState) => ({
                          ...prevState,
                          giaphong: e.target.value,
                        }));
                      }}
                      placeholder="0"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Số công tơ điện</td>
                  <td>
                    <input
                      type="number"
                      value={formUpdates.sodien}
                      onChange={(e) => {
                        setformupdates((prevState) => ({
                          ...prevState,
                          sodien: e.target.value,
                        }));
                      }}
                      placeholder="0"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Số công tơ nước</td>
                  <td>
                    <input
                      type="number"
                      value={formUpdates.sonuoc}
                      onChange={(e) => {
                        setformupdates((prevState) => ({
                          ...prevState,
                          sonuoc: e.target.value,
                        }));
                      }}
                      placeholder="0"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Điều hòa</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={formUpdates.dieuhoa}
                      onChange={(e) => {
                        setformupdates((prevState) => ({
                          ...prevState,
                          dieuhoa: e.target.checked,
                        }));
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Nóng lạnh</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={formUpdates.nonglanh}
                      onChange={(e) => {
                        setformupdates((prevState) => ({
                          ...prevState,
                          nonglanh: e.target.checked,
                        }));
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Wifi</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={formUpdates.wifi}
                      onChange={(e) => {
                        setformupdates((prevState) => ({
                          ...prevState,
                          wifi: e.target.checked,
                        }));
                      }}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {errorMes && <div className="error-message">{errorMes}</div>}
        <div className="pt-3 tools-container flex">
          <button
            className="no-bg gap-2  flex-1 h-[50px] flex items-center"
            onClick={handleBack}
          >
            <i className="fa-solid fa-arrow-left"></i>
            Quay lại
          </button>
          <button
            className="add flex-1 h-[50px] flex items-center"
            onClick={handleLuulai}
          >
            {Isloading && <div className="loading-spinner" />}
            Lưu và quay lại
          </button>
        </div>
      </div>
    </>
  );
};

export default Update_phong;
