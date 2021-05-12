import { db } from "../firebase";

const dataInicial = {
  facturas: [],
  facturasSeleccionada: [],
  totalFacturasSeleccionada: null,
  total: null,
  loadingPopup: false,
  seleccion: null,
};

const AGREGAR_DATOS_EXITO = "AGREGAR_DATOS_EXITO";
const OBTENER_FACTURAS_EXITO = "OBTENER_FACTURAS_EXITO";
const OBTENER_FACTURAS_ERROR = "OBTENER_FACTURAS_ERROR";
const OBTENER_FACTURAS_SELECCIONADAS_EXITO =
  "OBTENER_FACTURAS_SELECCIONADAS_EXITO";
const ELIMINAR_FACTURA_EXITO = "ELIMINAR_FACTURA_EXITO";
const CHANGE_LOADING_TRUE = "CHANGE_LOADING_TRUE";
const CHANGE_LOADING_FALSE = "CHANGE_LOADING_FALSE";

export default function gastosReducer(state = dataInicial, action) {
  switch (action.type) {
    case OBTENER_FACTURAS_EXITO:
      return {
        ...state,
        facturas: action.payload.facturas,
        total: action.payload.total,
      };
    case AGREGAR_DATOS_EXITO:
      return { ...state };
    case OBTENER_FACTURAS_SELECCIONADAS_EXITO:
      return {
        ...state,
        facturasSeleccionada: [...action.payload.facturasSeleccionada],
        totalFacturasSeleccionada: action.payload.total,
        seleccionado: action.payload.seleccionado,
      };
    case ELIMINAR_FACTURA_EXITO:
      return {
        ...state,
        facturasSeleccionada: action.payload.facturasSeleccionada,
        facturas: action.payload.facturas,
        total: action.payload.total,
        totalFacturasSeleccionada: action.payload.totalSeleccionado,
      };
    case CHANGE_LOADING_TRUE:
      return { ...state, loadingPopup: action.payload };
    case CHANGE_LOADING_FALSE:
      return { ...state, loadingPopup: action.payload };
    default:
      return { ...state };
  }
}

export const changeLoading = () => (dispatch) => {
  dispatch({
    type: CHANGE_LOADING_TRUE,
    payload: true,
  });
  setTimeout(() => {
    dispatch({
      type: CHANGE_LOADING_FALSE,
      payload: false,
    });
  }, 2500);
};

export const obtenerGastos = () => async (dispatch, getState) => {
  // console.log("COLECCION:" + email);
  console.log("OBTENER_GASTOS");
  const { email } = getState().usuario.usuario;
  let total = 0;

  try {
    const res = await db.collection(email).get();

    const arrayData = res.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    // localStorage.setItem("facturas", JSON.stringify(arrayData));

    total = arrayData.reduce((acc, fac) => acc + Number(fac.valor), 0);
    console.log("TOTALLLL" + total);
    dispatch({
      type: OBTENER_FACTURAS_EXITO,
      payload: {
        facturas: arrayData,
        total: total,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const obtenerGastosSeleccionados = (nombre) => (dispatch, getState) => {
  const { facturas } = getState().gastos;

  let total;

  const nombreDeFacturaLocalStorage = localStorage.setItem(
    "nombreDeFactura",
    JSON.stringify(nombre.toLowerCase())
  );
  let tipo;
  if (
    nombre === "agua" ||
    nombre === "energía" ||
    nombre === "telefonía" ||
    nombre === "icetex" ||
    nombre === "gas"
  ) {
    tipo = nombre;
  } else {
    tipo = "otro";
  }

  const arrayFacturasSeleccionadas = facturas.filter(
    (fact) => fact.tipoGasto === tipo
  );
  if (arrayFacturasSeleccionadas.length !== 0) {
    total = arrayFacturasSeleccionadas.reduce(
      (acc, fact) => acc + Number(fact.valor),
      0
    );
  } else {
    total = 0;
  }

  dispatch({
    type: OBTENER_FACTURAS_SELECCIONADAS_EXITO,
    payload: {
      facturasSeleccionada: arrayFacturasSeleccionadas,
      total: total,
      seleccionado: nombre,
    },
  });
};

export const agregarFacturasAccion =
  (referencia, nombre, valor, periodo, tipoDeGasto) =>
  async (dispatch, getState) => {
    const { email } = getState().usuario.usuario;
    console.log("AGREGAR FACTURAS ACCION");
    console.log("COLECCION" + email);

    let tipo;
    if (
      nombre === "agua" ||
      nombre === "energía" ||
      nombre === "telefonía" ||
      nombre === "icetex" ||
      nombre === "gas"
    ) {
      tipo = nombre;
    } else {
      tipo = "otro";
    }
    let mes;
    const periodoSplit = periodo.split("-");
    const obtenerMes = () => {
      switch (periodoSplit[1]) {
        case "01":
          return (mes = "enero");
        case "02":
          return (mes = "febrero");
        case "03":
          return (mes = "marzo");
        case "04":
          return (mes = "abril");
        case "05":
          return (mes = "mayo");
        case "06":
          return (mes = "junio");
        case "07":
          return (mes = "julio");
        case "08":
          return (mes = "agosto");
        case "09":
          return (mes = "septiembre");
        case "10":
          return (mes = "obtubre");
        case "11":
          return (mes = "noviembre");
        case "12":
          return (mes = "diciembre");
        default:
          return (mes = "enero");
      }
    };
    obtenerMes();
    const datos = {
      referencia: referencia,
      tipo: tipoDeGasto,
      nombre: nombre,
      periodo: periodo,
      valor: valor,
      mes: mes,
      tipoGasto: tipo,
    };

    try {
      await db.collection(email).doc(referencia).set(datos);
      dispatch({
        type: AGREGAR_DATOS_EXITO,
      });
    } catch (error) {
      console.log(error);
    }
  };

/*ELIMINAR FACTURA ACCION*/

export const eliminarFacturaAccion = (id) => async (dispatch, getState) => {
  const { facturasSeleccionada } = getState().gastos;
  const { facturas } = getState().gastos;
  const { email } = getState().usuario.usuario;

  try {
    await db.collection(email).doc(id).delete();
    const arrayNuevoSeleccionado = facturasSeleccionada.filter(
      (fact) => fact.id !== id
    );

    const totalSeleccionado = arrayNuevoSeleccionado.reduce(
      (acc, fac) => acc + Number(fac.valor),
      0
    );
    console.log(arrayNuevoSeleccionado);

    const arrayNuevoFacturas = facturas.filter((fact) => fact.id !== id);
    const total = arrayNuevoFacturas.reduce(
      (acc, fact) => acc + Number(fact.valor),
      0
    );

    dispatch({
      type: ELIMINAR_FACTURA_EXITO,
      payload: {
        facturas: arrayNuevoFacturas,
        facturasSeleccionada: arrayNuevoSeleccionado,
        total: total,
        totalSeleccionado: totalSeleccionado,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
