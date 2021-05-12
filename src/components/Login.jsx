import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ingresoUsuarioAccion } from "../redux/usuarioDuck";
import { withRouter } from "react-router-dom";
import google from "../assets/images/google.png";
const Login = (props) => {
  const { loading } = useSelector((store) => store.usuario);
  const { active } = useSelector((store) => store.usuario);

  useEffect(() => {
    if (active) {
      props.history.push("/");
      return;
    }
  }, [active, props.history]);

  const dispatch = useDispatch();
  return (
    <div className="login-container">
      <div className="login-container-logo"></div>
      <div className="login-container-form">
        <div className="formulario">
          <h1 className="titulo text-center">MIS GASTOS</h1>
          <hr></hr>
          <div className="formulario-box">
            <button
              className="btn_signIn"
              disabled={loading}
              onClick={() => dispatch(ingresoUsuarioAccion())}
            >
              <h6>Iniciar Sesión con Google</h6>
              <img src={google} alt="Logo de Google" />
            </button>
            <div className="aside">© By: David.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);
