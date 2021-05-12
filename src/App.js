import React, { useEffect, useState } from "react";
import Aos from "aos";
import "./App.css";
import { auth } from "./firebase";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from "./components/Home";
import Gastos from "./components/Gastos";
import GastosTotales from "./components/GastosTotales";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import dinero from "./assets/images/dinero.gif";
function App() {
  const [firebaseUser, setFirebaseUser] = useState(false);

  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);

  useEffect(() => {
    const fecthData = () => {
      auth.onAuthStateChanged((user) => {
        console.log(user);
        if (user) {
          setFirebaseUser(user);
        } else {
          setFirebaseUser(null);
        }
      });
    };
    fecthData();
  }, []);

  const RutaPrivada = ({ component, path, ...rest }) => {
    if (localStorage.getItem("usuario")) {
      const usuarioStorage = JSON.parse(localStorage.getItem("usuario"));

      if (usuarioStorage.uid === firebaseUser.uid) {
        return <Route component={component} path={path} {...rest} />;
      } else {
        return <Redirect to="/login" {...rest} />;
      }
    } else {
      return <Redirect to="/login" {...rest} />;
    }
  };

  return firebaseUser !== false ? (
    <Router>
      <div className="contenedor">
        <Navbar />

        <Switch>
          <RutaPrivada component={Home} path="/" exact />
          <Route component={Login} path="/login" exact />
          <RutaPrivada component={Gastos} path="/gastos" exact />
          <RutaPrivada component={GastosTotales} path="/gastos-totales" exact />
        </Switch>
      </div>
    </Router>
  ) : (
    <div className="loading_box">
      <img src={dinero} />
      <h1>Cargando...</h1>
    </div>
  );
}

export default App;
