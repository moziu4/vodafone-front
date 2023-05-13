import { useQuery } from "@apollo/client";
import { OBTENER_MI_USUARIO } from "config/graphqlQueries";
import { useRouter } from "next/router";

export const useMiUsuario = (props) => {
  const token = props;
  const router = useRouter();
  // Obtener datos
  const { data, loading, error } = useQuery(OBTENER_MI_USUARIO, {
    variables: {
      token,
    },
  });

  if (loading) return "Cargando";
  if (!data) return "Cargando";

  const { obtenerMiUsuario } = data;
  const { id, tienda, nombre, rol } = obtenerMiUsuario;
  const idUsuario = id;
  const idTienda = tienda;

  return { idUsuario, idTienda, nombre, rol, obtenerMiUsuario };
};
