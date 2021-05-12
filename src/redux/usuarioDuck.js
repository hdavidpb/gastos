import { firebase, auth } from "../firebase";
import logo from "../assets/images/logo.png";

//data Inicial

const dataInicial = {
  loading: false,
  active: false,
  usuario: {
    nombre: null,
    email: null,
    foto: logo,
    uid: null,
  },
};
//Types
const LOADING = "LOADING";
const USUARIO_ERROR = "USUARIO_ERROR";
const USUARIO_EXITO = "USUARIO_EXITO";
const CERRAR_SESION_EXITO = "CERRAR_SESION_EXITO";
//Reducer
export default function usuarioReducer(state = dataInicial, action) {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true };
    case USUARIO_ERROR:
      return { ...dataInicial };
    case USUARIO_EXITO:
      return {
        ...state,
        loading: false,
        usuario: action.payload,
        active: true,
      };
    case CERRAR_SESION_EXITO:
      return { ...dataInicial };
    default:
      return { ...state };
  }
}

//Acciones

export const ingresoUsuarioAccion = () => async (dispatch) => {
  dispatch({
    type: LOADING,
  });

  try {
    const provider = new firebase.auth.GoogleAuthProvider();

    const res = await auth.signInWithPopup(provider);
    localStorage.setItem(
      "usuario",
      JSON.stringify({
        nombre: res.user.displayName,
        email: res.user.email,
        foto: res.user.photoURL,
        uid: res.user.uid,
      })
    );
    dispatch({
      type: USUARIO_EXITO,
      payload: {
        nombre: res.user.displayName,
        email: res.user.email,
        foto: res.user.photoURL,
        uid: res.user.uid,
      },
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: USUARIO_ERROR,
    });
  }
};

export const leerUsuarioAccion = () => (dispatch) => {
  if (localStorage.getItem("usuario")) {
    dispatch({
      type: USUARIO_EXITO,
      payload: JSON.parse(localStorage.getItem("usuario")),
    });
  }
};

export const cerrarSesionAccion = () => (dispatch) => {
  console.log("Cerrar");
  auth.signOut();
  localStorage.removeItem("usuario");
  dispatch({
    type: CERRAR_SESION_EXITO,
  });
};
