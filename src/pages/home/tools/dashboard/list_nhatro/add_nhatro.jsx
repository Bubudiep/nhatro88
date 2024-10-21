import React, { useState } from "react";
import api from "../../../../../components/api";
import house_mini from "../../../../../img/house_mini.png";
import Popup from "../../../../../components/popup";

const Add_nhatro = ({ handleBack, onUserUpdate, token }) => {
  const [errorMes, setErrorMes] = useState("");
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const [tenNhatro, setTenNhatro] = useState("Nhà trọ A");
  const [tangs, setTangs] = useState([
    { soTang: 1, phongBatDau: 1, phongKetThuc: 5 }, // Tầng 1 mặc định
  ]);
  const themTangMoi = () => {
    setTangs([
      ...tangs,
      { soTang: tangs.length + 1, phongBatDau: 1, phongKetThuc: 5 },
    ]);
  };
  const handleSubmit = () => {
    const data = {
      tenTro: tenNhatro,
      tangs: tangs, // Gửi dữ liệu các tầng lên API
    };
    setLoading(true); // Bắt đầu loading
    api
      .post("/nha-tro/", data, token)
      .then((response) => {
        api
          .get("/my_nhatro/", token)
          .then((response) => {
            onUserUpdate(response.results);
            handleBack();
          })
          .catch((error) => {
            console.error("Lỗi khi lấy thông tin nhà trọ:", error);
          });
      })
      .catch((error) => {
        setErrorMes("Lỗi khi tạo nhà trọ: " + error?.response?.data?.Error);
        console.error("Lỗi khi tạo nhà trọ:", error);
      })
      .finally(() => {
        setLoading(false); // Kết thúc loading
      });
  };
  return (
    <>
      <div className="flex justify-center p-3">
        <img className="w-14" src={house_mini} alt="House mini" />
      </div>
      {errorMes && <div className="error-message">{errorMes}</div>}
      <div className="form-phongtro new">
        <table>
          <tbody>
            <tr>
              <td>Tên trọ</td>
              <td>
                <input
                  type="text"
                  value={tenNhatro}
                  onChange={(e) => setTenNhatro(e.target.value)}
                />
              </td>
            </tr>

            {tangs.map((tang, index) => (
              <tr key={index}>
                <td>Tầng {tang.soTang}</td>
                <td>
                  <div className="flex gap-1 items-center justify-end">
                    Phòng
                    <input
                      type="number"
                      value={tang.phongBatDau}
                      onChange={(e) =>
                        handlePhongChange(index, "phongBatDau", e.target.value)
                      }
                    />{" "}
                    đến{" "}
                    <input
                      type="number"
                      value={tang.phongKetThuc}
                      onChange={(e) =>
                        handlePhongChange(index, "phongKetThuc", e.target.value)
                      }
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="add-tang text-[15px] mt-4" onClick={themTangMoi}>
          Thêm tầng
        </button>
        <button className="add-tang text-[15px]" onClick={handleBack}>
          Quay lại
        </button>
      </div>
      <div className="tools-container">
        <div className="options main flex">
          <button className="add w-full h-[50px]" onClick={handleSubmit}>
            {loading ? (
              <div className="flex gap-5 justify-center items-center">
                <div className="loading-spinner-in"></div>Loading...
              </div>
            ) : (
              "Thêm nhà trọ"
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default Add_nhatro;
