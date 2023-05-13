import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { OBTENER_TIENDAS } from "config/graphqlQueries";
import styles from "@/styles/Usuarios.module.css";
import Loader from "../Loader";
import { useRouter } from "next/router";
import RowTienda from "./RowTienda";

const ListaTiendas = (props) => {
  const router = useRouter();
  const { rol } = props.datos;

  const { data, loading, error } = useQuery(OBTENER_TIENDAS);

  useEffect(() => {
    if (rol !== "Encargado") {
      router.push("/");
    }
  });

  if (loading) return <Loader />;

  const { obtenerTiendas } = data;

  return (
    <div>
      <div className="row">
        <div className={`col-md-4 col-2 ${styles.columnHead}`}>Nombre</div>
        <div className={`col-md-3 col-3 ${styles.columnHead}`}>Localidad</div>
        <div className={`col-md-1 col-1 ${styles.columnHead}`}>Valoracion</div>
        <div className={`col-md-2 col-2 ${styles.columnHead}`}>Editar</div>
        <div className={`col-md-2 col-2 ${styles.columnHead}`}>Eliminar</div>
      </div>
      {obtenerTiendas.map((tienda) => (
        <RowTienda key={tienda.id} tienda={tienda} />
      ))}
    </div>
  );
};
export default ListaTiendas;
