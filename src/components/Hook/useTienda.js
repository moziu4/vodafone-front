import { useQuery } from "@apollo/client";
import { OBTENER_TIENDA } from "config/graphqlQueries";

export const useTienda = (props) => {
  const id = props;
  const pid = id;

  // Obtener datos
  const { data, loading, error } = useQuery(OBTENER_TIENDA, {
    variables: {
      id: pid,
    },
  });

  if (loading) return "Cargando";
  const { obtenerTienda } = data;
  const { nombre } = obtenerTienda;
  const nombreTienda = nombre;

  return { nombreTienda };
};
