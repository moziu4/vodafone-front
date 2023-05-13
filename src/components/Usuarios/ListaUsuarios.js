import { useQuery } from "@apollo/client";
import { OBTENER_USUARIOS } from "config/graphqlQueries";
import styles from "@/styles/Usuarios.module.css";
import RowUsuario from "./RowUsuario";
import Loader from "../Loader";

const ListaUsuarios = () => {
  const field = "tienda";
  const order = "ASC";
  const { data, loading, error } = useQuery(OBTENER_USUARIOS, {
    variables: {
      sortBy: { field, order },
    },
  });

  if (loading) return <Loader />;

  const { obtenerUsuarios } = data;

  return (
    <div>
      <div className="row">
        <div className={`col-md-2 col-2 ${styles.columnHead}`}>Nombre</div>
        <div className={`col-md-2 col-2 ${styles.columnHead}`}>Apellido</div>
        <div className={`col-md-2 col-2 ${styles.columnHead}`}>Cargo</div>
        <div className={`col-md-2 col-2 ${styles.columnHead}`}>Tienda</div>
        <div className={`col-md-2 col-2 ${styles.columnHead}`}>Editar</div>
        <div className={`col-md-2 col-2 ${styles.columnHead}`}>Eliminar</div>
      </div>
      {obtenerUsuarios.map((usuario) => (
        <RowUsuario key={usuario.id} usuario={usuario} />
      ))}
    </div>
  );
};
export default ListaUsuarios;
