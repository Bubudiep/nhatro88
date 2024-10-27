import React, { useState } from "react";
import api from "../../../../../components/api";

const ChitietHoadon = ({ hoadon, phong, handleBack, token, onUserUpdate }) => {
  const [isLoading, setIsloading] = useState(false);
  const [tongTien, setTongTien] = useState(hoadon.tongTien);
  const [errorMes, setErrorMes] = useState(null);
  const songay =
    (new Date(hoadon.ngayKetthuc) - new Date(hoadon.ngayBatdau)) /
      (24 * 3600 * 1000) +
    1;
  const moveCursorToEnd = (element) => {
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(element);
    range.collapse(false); // Di chuyển con trỏ đến cuối
    selection.removeAllRanges();
    selection.addRange(range);
  };
  const handlethuTien = () => {
    setIsloading(true);
    api
      .post(
        `/tt-phong/`,
        {
          hoadon: hoadon.id,
          sotien: tongTien,
        },
        token
      )
      .then((response) => {
        onUserUpdate(response);
        response.forEach((tro) => {
          tro.Thongtin.forEach((tang) => {
            tang.Chitiet.forEach((nphong) => {
              nphong.id == phong.id && handleBack(nphong);
            });
          });
        });
      })
      .catch((error) => {
        console.error("Lỗi khi cập nhật:", error);
      })
      .finally(() => {
        setIsloading(false);
      });
  };
  return (
    <>
      <div className="title2">{hoadon.Key}</div>
      <div className="text-[12px] text-center">
        {phong.soPhong} - {phong.tenTang}
      </div>
      <div className="body-container overflow-auto">
        <div className="chitiet-phongtro">
          <div className="thongtin">
            <table>
              <tbody className="text-[14px]">
                <tr>
                  <td>Tổng ngày</td>
                  <td>{songay} ngày</td>
                  <td>
                    {parseInt(hoadon.soTienPhong.toFixed(0)).toLocaleString(
                      "vi-VN"
                    )}{" "}
                    đ
                  </td>
                </tr>
                <tr>
                  <td>Số điện</td>
                  <td>
                    {hoadon.Tieuthu.soDienKetthuc - hoadon.Tieuthu.soDienBatDau}
                    {` số (${hoadon.Tieuthu.soDienKetthuc} - ${hoadon.Tieuthu.soDienBatDau})`}
                  </td>
                  <td>{hoadon.soTienDien.toLocaleString("vi-VN")} đ</td>
                </tr>
                <tr>
                  <td>Số nước</td>
                  <td>
                    {hoadon.Tieuthu.soNuocKetthuc - hoadon.Tieuthu.soNuocBatDau}
                    {` khối (${hoadon.Tieuthu.soNuocKetthuc} - ${hoadon.Tieuthu.soNuocBatDau})`}
                  </td>
                  <td>{hoadon.soTienNuoc.toLocaleString("vi-VN")} đ</td>
                </tr>
                <tr>
                  <td>Tiền rác</td>
                  <td>
                    {parseInt(phong.tienrac.toFixed(0)).toLocaleString("vi-VN")}
                    {`đ/tháng`}
                  </td>
                  <td>
                    {parseInt(hoadon.soTienRac.toFixed(0)).toLocaleString(
                      "vi-VN"
                    )}{" "}
                    đ
                  </td>
                </tr>
                <tr>
                  <td>
                    <b className="text-[15px]">Tổng</b>
                  </td>
                  <td colSpan={2}>
                    <b className="text-[#cc5e2b] text-[15px]">
                      {parseInt(hoadon.tongTien.toFixed(0)).toLocaleString(
                        "vi-VN"
                      )}{" "}
                      đ
                    </b>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="tooling gap-2">
            <div className="payment">
              <div
                className="input"
                name="giaPhong"
                contentEditable={true}
                onClick={(e) => {
                  moveCursorToEnd(e.target);
                }}
                onInput={(e) => {
                  setTongTien(e.target.innerText.replace(/\D/g, ""));
                  moveCursorToEnd(e.target);
                }}
                suppressContentEditableWarning={true}
              >
                {Number(tongTien.toFixed(0)).toLocaleString("vi-VN")}
              </div>
              đ
            </div>
            <button className="add" onClick={handlethuTien}>
              {isLoading ? (
                <div className="loading-spinner" />
              ) : (
                <i className="fa-solid fa-coins" />
              )}{" "}
              Thu tiền
            </button>
          </div>
        </div>
        {errorMes && <div className="error-message">{errorMes}</div>}
        <div className="mt-auto">
          <div className="pt-3 tools-container flex">
            <button
              className="no-bg flex gap-2 items-center"
              onClick={handleBack}
            >
              <i className="fa-solid fa-arrow-left"></i>
              Quay lại
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChitietHoadon;
