import { useReducer } from "react";
import MiUsuarioContext from "./MiUsuarioContext";
import MiUsuarioReducer from "./MiUsuarioReducer";
import { MI_USUARIO, BORRAR_TOKEN } from "@/types/index";

const MiUsuarioState = ({ children }) => {
  const initialState = {
    usuario: {
      rol: "",
      tienda: "",
      nombre: "",
    },
  };

  const [state, dispatch] = useReducer(MiUsuarioReducer, initialState);

  const agregarMiUsuario = (usuario) => {
    dispatch({
      type: MI_USUARIO,
      payload: usuario,
    });
  };

  return (
    <MiUsuarioContext.Provider
      value={{
        usuario: state.usuario,
        agregarMiUsuario,
      }}
    >
      {children}
    </MiUsuarioContext.Provider>
  );
};

export default MiUsuarioState;
