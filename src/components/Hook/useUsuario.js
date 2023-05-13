import { useQuery } from "@apollo/client";
import { OBTENER_USUARIO } from "config/graphqlQueries";

export const useUsuario = (props) => {
  const id = props;
  // Obtener datos
  const { data, loading, error } = useQuery(OBTENER_USUARIO, {
    variables: {
      id: id,
    },
  });

  if (loading) return "Cargando";

  const { obtenerUsuario } = data;
  const { tienda, nombre, rol, password, username, apellido } = obtenerUsuario;

  return { tienda, nombre, rol, password, username, apellido };
};
