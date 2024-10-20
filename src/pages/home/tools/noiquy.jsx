import React, { useState } from "react";

const NoiQuyComponent = ({ onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [rules, setRules] = useState([{ text: "" }]); // Khởi tạo với một nội quy

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300); // Thời gian trễ phải tương ứng với thời gian của animation
  };

  const handleAddRule = () => {
    setRules([...rules, { text: "" }]); // Thêm một đối tượng nội quy mới vào danh sách
  };

  const handleRuleChange = (index, value) => {
    const updatedRules = [...rules];
    updatedRules[index].text = value; // Cập nhật nội dung của nội quy
    setRules(updatedRules);
  };

  return (
    <div className={`bottom-box-white-bg  ${isClosing ? "hide-out" : ""}`}>
      <div className="detectOut" onClick={handleClose} />
      <div className={`bottom-box-white  ${isClosing ? "hide-down" : ""}`}>
        <div className="top-bar">
          <div className="bar"></div>
        </div>
        <div className="slider fade-in-5">
          <div className="title2">Nội quy phòng trọ</div>
          <div className="body-container">
            <div className="noiquy">
              {/* Lặp qua danh sách các nội quy và hiển thị */}
              {rules.map((rule, index) => (
                <div className="items" key={index}>
                  <div className="text">{index + 1}</div>
                  <div className="value">
                    <input
                      type="text"
                      placeholder={`Nội quy số ${index + 1}...`}
                      value={rule.text}
                      onChange={(e) => handleRuleChange(index, e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-auto">
              <div className="add" onClick={handleAddRule}>
                <div className="add-box">
                  <div className="text">Thêm nội quy</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoiQuyComponent;
