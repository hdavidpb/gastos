import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import gastosReducer from "./gastosDuck";
import usuarioReducer, { leerUsuarioAccion } from "./usuarioDuck";

const rootReducer = combineReducers({
  gastos: gastosReducer,
  usuario: usuarioReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
  leerUsuarioAccion()(store.dispatch);
  return store;
}
