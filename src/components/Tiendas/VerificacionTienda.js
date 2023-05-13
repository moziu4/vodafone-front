import { useState } from "react";
import ListaTiendas from "./ListaTiendas";
import { useQuery } from "@apollo/client";
import { OBTENER_MI_USUARIO } from "config/graphqlQueries";
import { useRouter } from "next/router";
import Loader from "../Loader";

const VerificacionTienda = (props) => {
  const router = useRouter();
  const token = props.token;
  const [cargado, setCargado] = useState(false);
  const { data, loading, error } = useQuery(OBTENER_MI_USUARIO, {
    variables: {
      token,
    },
  });

  if (loading) return <Loader />;

  const { obtenerMiUsuario } = data;
  const { rol } = obtenerMiUsuario;

  return <ListaTiendas datos={obtenerMiUsuario} />;
};
export default VerificacionTienda;
