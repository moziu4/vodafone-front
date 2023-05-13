import { BORRAR_TOKEN, MI_USUARIO } from "@/types";

export default (state, action) => {
  switch (action.type) {
    case MI_USUARIO:
      return {
        ...state,
        usuario: action.payload,
      };
    case BORRAR_TOKEN:
      return {
        ...state,
        usuario: action.payload,
      };
    default:
      return state;
  }
};
