import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { obtenerGastos, obtenerGastosSeleccionados } from "../redux/gastosDuck";
import GastosCards from "./GastosCards";
export const Gastos = () => {
  const [filter, setFilter] = useState("");

  const facturasSeleccionada = useSelector(
    (store) => store.gastos.facturasSeleccionada
  );
  const [facturasFiltradas, setFacturasFiltradas] = useState([]);
  const total = useSelector((store) => store.gastos.totalFacturasSeleccionada);
  const [totalFiltrado, setTotalFiltrado] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fecthData = () => {
      dispatch(obtenerGastos());
    };
    if (facturasSeleccionada.length === 0) {
      fecthData();
    }
  }, [dispatch, facturasSeleccionada.length]);

  //SI NO HAY FACTURA EN EL STATE

  useEffect(() => {
    const obtenerGastosData = () => {
      dispatch(
        obtenerGastosSeleccionados(
          JSON.parse(localStorage.getItem("nombreDeFactura"))
        )
      );
    };

    if (facturasSeleccionada.length === 0) {
      setTimeout(() => {
        obtenerGastosData();
      }, 3000);
    }
  }, [dispatch, facturasSeleccionada.length]);

  /**OBTENER FACTURA FILTRADA */
  useEffect(() => {
    const arrayFiltrado = facturasSeleccionada.filter(
      (fact) =>
        fact.referencia.includes(filter) ||
        fact.periodo.includes(filter) ||
        fact.mes.includes(filter) ||
        fact.tipoGasto.includes(filter) ||
        fact.tipo.includes(filter) ||
        fact.valor.includes(filter) ||
        fact.nombre.includes(filter)
    );

    setFacturasFiltradas(arrayFiltrado);
  }, [facturasSeleccionada, filter]);

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  /*----------------OBTENER TOTAL FILTRADO------------- (REVISAR) Cuidado*/
  useEffect(() => {
    if (facturasFiltradas.length !== 0) {
      const totalF = facturasFiltradas.reduce(
        (acc, fac) => acc + Number(fac.valor),
        0
      );
      console.log(totalF);
      setTotalFiltrado(totalF);
    }
  }, [facturasFiltradas]);
  /**--------------------------------------------------------------------------------- */
  return (
    <>
      <div className="gastos_container">
        {facturasSeleccionada.length === 0 ? (
          <div className="facturas_empty_box">
            <h1>{`Aún no tiene gastos en ${JSON.parse(
              localStorage.getItem("nombreDeFactura")
            ).toUpperCase()}...`}</h1>
            <Link className="btn btn-primary sm" to="/">
              Go Home
            </Link>
          </div>
        ) : (
          <>
            {facturasSeleccionada !== 0 && (
              <h1 className="title">
                {JSON.parse(
                  localStorage.getItem("nombreDeFactura")
                ).toUpperCase()}
              </h1>
            )}
            <div className="header_gastos">
              <Link className="btn btn-secondary" to="/">
                Home
              </Link>
              <div className="filter_gastos_container">
                <FontAwesomeIcon className="filter_icon " icon={faSearch} />
                <input
                  className="filter_input_gastos"
                  type="text"
                  placeholder="Buscar factura..."
                  onChange={(e) => handleFilter(e)}
                />
              </div>
              {facturasSeleccionada.length !== 0 && (
                <div className="total_container">
                  <label className="label">SUBTOTAL: </label>
                  <p>{`$ ${new Intl.NumberFormat().format(
                    Number(totalFiltrado)
                  )}`}</p>
                </div>
              )}
            </div>
            <GastosCards facturasFiltradas={facturasFiltradas} />
          </>
        )}
      </div>
      {facturasSeleccionada.length !== 0 && (
        <div className="total_container">
          <label className="label">TOTAL: </label>
          <p>{`$ ${new Intl.NumberFormat().format(Number(total))}`}</p>
        </div>
      )}
    </>
  );
};

export default Gastos;
