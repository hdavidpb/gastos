import React, { useState, useEffect } from "react";
import {
  faSortUp,
  faSortDown,
  faStore,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import Formulario from "./Formulario";
// import Popup from "./Popup";
import { Link } from "react-router-dom";
import { obtenerGastos, obtenerGastosSeleccionados } from "../redux/gastosDuck";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingWater } from "@fortawesome/free-solid-svg-icons";
import { faBolt } from "@fortawesome/free-solid-svg-icons";
import { faGasPump } from "@fortawesome/free-solid-svg-icons";
import { faItalic } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
export const Home = () => {
  const dispatch = useDispatch();

  const facturaSeleccionada = useSelector(
    (store) => store.gastos.facturaSeleccionada
  );
  const [showFacturasList, setShowFacturasList] = useState(false);
  const { nombre } = useSelector((store) => store.usuario.usuario);
  // const { loadingPopup } = useSelector((store) => store.gastos);

  useEffect(() => {
    const fecthData = () => {
      dispatch(obtenerGastos());
    };

    fecthData();
  }, [dispatch]);

  const handleObtenerGastos = (e) => {
    dispatch(obtenerGastosSeleccionados(e.target.innerText.toLowerCase()));
  };

  return (
    <div className="home">
      <h1 className="title home_title">{`Gastos de ${nombre}`}</h1>

      <div className="facturas_container">
        <div className="facturas_item_container">
          <button
            className="btn_facturas"
            onClick={() => setShowFacturasList(!showFacturasList)}
          >
            <h2>VER FACTURAS</h2>
            <FontAwesomeIcon
              className="arrow"
              icon={showFacturasList ? faSortUp : faSortDown}
            />
          </button>
          {showFacturasList && (
            <ul
              className="factutas_list_container"
              aria-label="Default select example"
            >
              <Link
                data-aos="flip-left"
                className="facturas_list_item"
                onClick={handleObtenerGastos}
                to="/gastos"
              >
                <p>AGUA</p>
                <FontAwesomeIcon icon={faHandHoldingWater} />
              </Link>
              <Link
                data-aos="flip-left"
                className="facturas_list_item"
                onClick={handleObtenerGastos}
                to="/gastos"
              >
                <p>ENERGÍA</p>
                <FontAwesomeIcon icon={faBolt} />
              </Link>
              <Link
                data-aos="flip-left"
                className="facturas_list_item"
                onClick={handleObtenerGastos}
                to="/gastos"
              >
                <p>GAS</p>
                <FontAwesomeIcon icon={faGasPump} />
              </Link>
              <Link
                data-aos="flip-left"
                className="facturas_list_item"
                onClick={handleObtenerGastos}
                to="/gastos"
              >
                <p>ICETEX</p>
                <FontAwesomeIcon icon={faItalic} />
              </Link>
              <Link
                data-aos="flip-left"
                className="facturas_list_item"
                onClick={handleObtenerGastos}
                to="/gastos"
              >
                <p>TELEFONÍA</p>
                <FontAwesomeIcon icon={faPhone} />
              </Link>
              <Link
                className="facturas_list_item"
                onClick={handleObtenerGastos}
                to="/gastos"
              >
                <p>OTRO</p>
                <FontAwesomeIcon icon={faStore} />
              </Link>
            </ul>
          )}
        </div>

        <Formulario />
        {/* {loadingPopup && <Popup />} */}
      </div>
    </div>
  );
};

export default Home;
