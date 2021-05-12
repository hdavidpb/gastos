import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  obtenerGastos,
  agregarFacturasAccion,
  changeLoading,
} from "../redux/gastosDuck";

import swal from "sweetalert";
const Formulario = () => {
  // const [factura, setFactura] = useState({});
  const [tipoDeGasto, setTipoDeGasto] = useState("factura");
  const [referencia, setReferencia] = useState("");
  const [periodo, setPeriodo] = useState("");
  const [valor, setValor] = useState("");
  const [nombre, setNombre] = useState("agua");
  const [floatInput, setFloatInput] = useState(false);
  // const [error, setError] = useState(false);

  const now = new Date();

  const date = `${now.getFullYear()}-0${now.getMonth() + 1}-0${now.getDate()}`;
  // console.log(date);

  const dispatch = useDispatch();

  useEffect(() => {
    if (nombre === "otro") {
      setFloatInput(true);
      setNombre("");
      return;
    }
    // if (error) {
    //   setTimeout(() => {
    //     setError(false);
    //   }, 2000);
    // }
  }, [nombre /*error*/]);

  //------------------MANEJADOR DE EVENTOS PARA EL INPUT----------------//

  //--------------------------------------------------------------------------------//
  const handleAddGasto = (e) => {
    e.preventDefault();
    if (
      !referencia.trim() ||
      !nombre.trim() ||
      !valor.trim() ||
      !periodo.trim() ||
      !tipoDeGasto.trim()
    ) {
      swal("Gasto no agregado", "Debes llenar todos los campos", "error");
      // setError(true);
    } else {
      dispatch(
        agregarFacturasAccion(referencia, nombre, valor, periodo, tipoDeGasto)
      );
      swal({
        title: "Gasto agregado !",
        icon: "success",
        button: "OK",
      });
      // dispatch(changeLoading());
      dispatch(obtenerGastos());
      setNombre("agua");
      setPeriodo("");
      setReferencia("");
      setTipoDeGasto("factura");
      setValor("");
      setFloatInput(false);
      // setError(false);
    }
  };

  return (
    <div className="formulario_container">
      <h2 className="title_form">AGREGAR GASTO</h2>
      <form className="formulario_form" onSubmit={handleAddGasto}>
        <label className="label_input normal_label">Nombre del gasto</label>
        {!floatInput && (
          <select
            value={nombre}
            className="form-select form-select-sm input_form"
            aria-label=".form-select-sm example"
            onChange={(e) => setNombre(e.target.value.toLowerCase())}
          >
            <option value="agua">AGUA</option>
            <option value="gas">GAS</option>
            <option value="energía">ENERGÍA</option>
            <option value="telefonía">TELEFONÍA</option>
            <option value="icetex">ICETEX</option>
            <option value="otro">OTRO</option>
          </select>
        )}

        {floatInput ? (
          <input
            className="input_form"
            placeholder="Cual..."
            value={nombre}
            onChange={(e) => setNombre(e.target.value.toLowerCase())}
          />
        ) : null}
        <label className="label_input normal_label">Tipo de gasto</label>
        <select
          value={tipoDeGasto}
          className="form-select form-select-sm input_form"
          aria-label=".form-select-sm example"
          onChange={(e) => setTipoDeGasto(e.target.value.toLowerCase())}
        >
          <option value="factura">FACTURA</option>
          <option value="otro">OTRO</option>
        </select>
        <div className="input_box">
          <label className="label_input input_box_label input_box_label_down">
            <span>N° Contrato</span>
          </label>
          <input
            className="input_form input_box_input"
            value={referencia}
            type="number"
            onChange={(e) => setReferencia(e.target.value.toLowerCase())}
            min="0"
          />
        </div>

        <label className="label_input normal_label">Fecha</label>
        <input
          className="input_form"
          type="date"
          id="start"
          name="trip-start"
          value={periodo}
          min="2018-01-01"
          max={date}
          onChange={(e) => setPeriodo(e.target.value)}
        />

        <div className="input_box">
          <label className="label_input input_box_label input_box_label_down label_input_valor">
            <span>Valor</span>
          </label>
          <input
            className="input_form input_box_input input_box_valor"
            value={valor}
            type="number"
            onChange={(e) => setValor(e.target.value.toLowerCase())}
            min="0"
          />
        </div>

        <button className="btn btn-primary btn_submit" type="submit">
          AGREGAR GASTO
        </button>
        {/* {error ? (
          <div data-aos="zoom-in" className="error_form">
            <h5>Debes llenar todos los campos</h5>
          </div>
        ) : null} */}
      </form>
    </div>
  );
};

export default Formulario;
