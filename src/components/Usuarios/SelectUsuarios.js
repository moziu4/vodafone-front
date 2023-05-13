import { useQuery } from "@apollo/client";
import { OBTENER_TIENDAS } from "config/graphqlQueries";

const useSelectTiendas = () => {
  const { data, loading, error } = useQuery(OBTENER_TIENDAS);
  if (loading) return "Cargando";
  const { obtenerTiendas } = data;

  return [obtenerTiendas];
};

export default useSelectTiendas;
