import { OBTENER_REGISTRO } from "config/graphqlQueries";
import { useQuery } from "@apollo/client";
import Loader from "../Loader";

export const useObtenerRegistro = (props) => {
  let pid = props;

  // Obtener datos
  const { data, loading, error } = useQuery(OBTENER_REGISTRO, {
    variables: {
      id: pid,
    },
  });

  if (loading) return <Loader />;
  if (!data) return <Loader />;

  const { obtenerRegistro } = data;

  return { obtenerRegistro };
};
