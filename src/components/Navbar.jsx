import React, { useState, useEffect } from "react";
import "aos/dist/aos.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/images/logo.png";
import { withRouter, NavLink, Link } from "react-router-dom";
import { cerrarSesionAccion } from "../redux/usuarioDuck";
const Navbar = (props) => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const { active } = useSelector((store) => store.usuario);
  const { foto } = useSelector((store) => store.usuario.usuario);
  const cerrarSesion = () => {
    dispatch(cerrarSesionAccion());
    props.history.push("/login");
  };

  useEffect(() => {
    const handleBrsMenu = () => {
      console.log("Hello");
      const list = document.querySelector(".navbar_list");
      const barsMenu = document.querySelector(".bars_menu_box");
      barsMenu.addEventListener("click", function () {
        list.classList.toggle("navbar_list_toogle");
      });
    };
    const handleMenuList = () => {
      const menuList = document.querySelector(".navbar_list");
      menuList.addEventListener("click", function () {
        menuList.classList.toggle("navbar_list_toogle");
      });
    };
    handleMenuList();
    handleBrsMenu();
  }, []);
  return (
    <nav className="navbar">
      {active ? (
        <Link className="logo_box" to="/">
          <img src={foto} alt="perfil" className="navbar_logo" />
        </Link>
      ) : (
        <Link className="logo_box" to="/">
          <img src={logo} alt="perfil" className="navbar_logo" />
        </Link>
      )}
      <div className="name_app_box">
        <p>MIS GASTOS APP</p>
      </div>
      <ul
        className="navbar_list_toogle navbar_list"
        onClick={() => setShowMenu(!showMenu)}
      >
        {active && (
          <NavLink className="navbar_list_item" to="/" exact>
            Home
          </NavLink>
        )}
        {active && (
          <NavLink className="navbar_list_item" to="/gastos-totales">
            Gastos
          </NavLink>
        )}

        {active ? (
          <button
            className="btn btn-danger btn_sign-out"
            onClick={cerrarSesion}
          >
            Cerrar sesión
          </button>
        ) : (
          <NavLink className="navbar_list_item" to="/login">
            Login
          </NavLink>
        )}
      </ul>

      {showMenu ? (
        <div onClick={() => setShowMenu(!showMenu)} className="bars_menu_box">
          <FontAwesomeIcon icon={faTimes} />
        </div>
      ) : (
        <div onClick={() => setShowMenu(!showMenu)} className="bars_menu_box">
          <FontAwesomeIcon icon={faBars} />
        </div>
      )}
    </nav>
  );
};

export default withRouter(Navbar);
