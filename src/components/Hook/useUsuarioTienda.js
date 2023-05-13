import { useQuery } from "@apollo/client";
import { OBTENER_USUARIO_TIENDA } from "config/graphqlQueries";
export const useUsuarioTienda = (props) => {
  const tienda = props;

  // Obtener datos
  const { data, loading, error } = useQuery(OBTENER_USUARIO_TIENDA, {
    variables: {
      input: {
        tienda,
      },
    },
  });

  if (loading) return "Cargando";

  const { obtenerUsuarioDeTienda } = data;

  return { obtenerUsuarioDeTienda };
};
