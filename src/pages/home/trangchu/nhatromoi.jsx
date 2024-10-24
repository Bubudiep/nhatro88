import React, { useState } from "react";
import house_mini from "../../../img/house_mini.png";
import api from "../../../components/api"; // Import API

const Nhatromoi = ({ user, updateNhatro }) => {
  const [tenNhatro, setTenNhatro] = useState("Nhà trọ A");
  const [tangs, setTangs] = useState([
    { soTang: 1, phongBatDau: 1, phongKetThuc: 5 }, // Tầng 1 mặc định
  ]);
  const [step, setStep] = useState(1); // Quản lý bước hiện tại (1: thông tin giới thiệu, 2: form chi tiết)
  const [fadeOut, setFadeOut] = useState(false); // Trạng thái fade-out
  const [loading, setLoading] = useState(false); // Trạng thái loading

  // Hàm xử lý thêm tầng mới
  const themTangMoi = () => {
    setTangs([
      ...tangs,
      { soTang: tangs.length + 1, phongBatDau: 1, phongKetThuc: 5 },
    ]);
  };

  // Hàm xử lý thay đổi giá trị số phòng
  const handlePhongChange = (index, field, value) => {
    const newTangs = tangs.map((tang, i) => {
      if (i === index) {
        return { ...tang, [field]: value };
      }
      return tang;
    });
    setTangs(newTangs);
  };

  // Hàm gửi thông tin lên API khi người dùng hoàn tất
  const handleSubmit = () => {
    const data = {
      tenTro: tenNhatro,
      tangs: tangs, // Gửi dữ liệu các tầng lên API
    };
    setLoading(true); // Bắt đầu loading
    api
      .post("/nha-tro/", data, user.app.access_token)
      .then((response) => {
        console.log("Nhà trọ đã được tạo:", response.data);
        updateNhatro(); // Gọi callback để cập nhật lại dữ liệu nhà trọ
      })
      .catch((error) => {
        console.error("Lỗi khi tạo nhà trọ:", error);
      })
      .finally(() => {
        setLoading(false); // Kết thúc loading
      });
  };

  // Hàm xử lý khi bấm "Tiếp tục"
  const handleContinue = () => {
    setFadeOut(true);
    setTimeout(() => {
      setStep(2);
      setFadeOut(false); // Reset fadeOut khi chuyển bước
    }, 300); // Thời gian chờ 0.3 giây
  };

  return (
    <div className="body-container">
      <div className="main-view-container">
        <div className="black-bar">
          <div className="bar"></div>
        </div>

        {step === 1 ? (
          // Step 1: Giới thiệu và nút Bắt đầu
          <div className={`message-box ${fadeOut ? "fade-out-down" : ""}`}>
            <div className="logo">
              <img src={house_mini} alt="House mini" />
            </div>
            <div className="hintbox">
              <div className="light">Nhà trọ 88</div> là một phần mềm được phát
              triển bởi <div className="light">HMH Group</div> nhằm mang lại lợi
              ích thiết thực trong việc quản lý và cho thuê nhà ở.
            </div>
            <div className="logo">Lợi ích mang lại?</div>
            <div className="message">
              <ul>
                <li>1. Tính công khai và minh bạch</li>
                <li>2. Tối ưu hóa quy trình quản lý nhà trọ</li>
                <li>3. Báo cáo và dự kiến lợi nhuận hàng tháng</li>
                <li>4. Kiểm soát ra vào thông minh</li>
                <li>5. Quản lý thu chi thông minh, hiệu quả</li>
                <li>....</li>
              </ul>
            </div>
            <div className="tools-container">
              <div className="options main">
                <button
                  className="add text-[15px]"
                  onClick={handleContinue} // Gọi hàm handleContinue
                >
                  Tiếp tục
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Step 2: Form điền chi tiết nhà trọ
          <div className="message-box fade-in-5">
            <div className="logo">
              <img src={house_mini} alt="House mini" />
            </div>
            <div className="text-[18px] p-2 text-center text-[#ff9137]">
              Bắt đầu bằng một nhà trọ
            </div>
            <div className="form-phongtro">
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
                              handlePhongChange(
                                index,
                                "phongBatDau",
                                e.target.value
                              )
                            }
                          />{" "}
                          đến{" "}
                          <input
                            type="number"
                            value={tang.phongKetThuc}
                            onChange={(e) =>
                              handlePhongChange(
                                index,
                                "phongKetThuc",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className="add-tang text-[16px]" onClick={themTangMoi}>
                Thêm tầng
              </button>
            </div>
            <div className="tools-container">
              <div className="options main">
                <button className="add text-[15px]" onClick={handleSubmit}>
                  {loading ? (
                    <div className="flex gap-5 justify-center items-center">
                      <div className="loading-spinner-in"></div>Loading...
                    </div>
                  ) : (
                    "Bắt đầu"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nhatromoi;
