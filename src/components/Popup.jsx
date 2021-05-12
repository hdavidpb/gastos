import React from "react";
import logo from "../assets/images/dinero.gif";
import "aos/dist/aos.css";
const Popup = () => {
  return (
    <div data-aos="zoom-in" className="popup_container">
      <img src={logo} alt="Check" />
      <h2>Gasto agregado con éxito!</h2>
    </div>
  );
};

export default Popup;
