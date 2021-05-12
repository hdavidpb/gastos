import React from "react";
import "aos/dist/aos.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { eliminarFacturaAccion } from "../redux/gastosDuck";
import { useDispatch } from "react-redux";
import agua from "../assets/images/agua.jpg";
import energia from "../assets/images/energia.png";
import gas from "../assets/images/gas.jpg";
import telefonia from "../assets/images/telefonia.jpg";
import icetex from "../assets/images/icetex.jpg";
import otro from "../assets/images/otro.jpg";

import swal from "sweetalert";
const GastosCards = ({ facturasFiltradas }) => {
  const dispatch = useDispatch();

  const handleEliminarGasto = (id) => {
    swal({
      title: "¿Estas seguro que quieres eliminar este gasto?",
      text: "Una vez eliminado no lo puedes reestablecer",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Tu gasto ha sido eliminado con exito", {
          icon: "success",
        });
        console.log("PASO LA PRUEBA");
        dispatch(eliminarFacturaAccion(id));
      } else {
        swal("Tu gasto no fue eliminado");
      }
    });
  };

  return (
    <div className="gastos_items">
      {facturasFiltradas.map((fac) => (
        <ul data-aos="flip-left" key={fac.id} className="gastos_list">
          {fac.tipoGasto === "agua" && <img src={agua} alt="" />}
          {fac.tipoGasto === "energía" && <img src={energia} alt="" />}
          {fac.tipoGasto === "gas" && <img src={gas} alt="" />}
          {fac.tipoGasto === "telefonía" && <img src={telefonia} alt="" />}
          {fac.tipoGasto === "icetex" && <img src={icetex} alt="" />}
          {fac.tipoGasto === "otro" && <img src={otro} alt="" />}
          <li className="gastos_list_item ">
            <label>Fecha: </label>
            <p>{fac.periodo}</p>
          </li>
          <li className="gastos_list_item">
            <label>Nombre: </label>
            <p>{fac.nombre}</p>
          </li>
          <li className="gastos_list_item">
            <label>N° Contrato: </label>
            <p>{fac.referencia}</p>
          </li>
          <li className="gastos_list_item">
            <label>Tipo: </label>
            <p>{fac.tipo}</p>
          </li>

          <li className="gastos_list_item valor_item">
            <label>Valor: </label>
            <p>{`$ ${new Intl.NumberFormat().format(fac.valor)}`}</p>
          </li>
          <div
            className="delete_item_container"
            onClick={() => handleEliminarGasto(fac.id)}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </div>
        </ul>
      ))}
    </div>
  );
};

export default GastosCards;
