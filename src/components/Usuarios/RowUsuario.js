import styles from "@/styles/Usuarios.module.css";
import Borrar from "@/utils/Borrar";
import EditarIcon from "@/utils/EditarIcon";
import { useMutation } from "@apollo/client";
import { ELIMINAR_USUARIO } from "config/graphqlMutation";
import { OBTENER_USUARIOS } from "config/graphqlQueries";
import Link from "next/link";
import Swal from "sweetalert2";
import { useTienda } from "../Hook/useTienda";

const RowUsuario = ({ usuario }) => {
  const { nombre, apellido, rol, id, tienda } = usuario;
  const { nombreTienda } = useTienda(tienda);
  const destinoEditar = "/editarusuario/" + id;

  const [eliminarUsuario] = useMutation(ELIMINAR_USUARIO, {
    update(cache) {
      // obtener una copia del objeto de cache
      const { obtenerUsuarios } = cache.readQuery({
        query: OBTENER_USUARIOS,
      });

      // Reescribir el cache
      cache.writeQuery({
        query: OBTENER_USUARIOS,
        data: {
          obtenerUsuarios: obtenerUsuarios.filter(
            (usuarioActual) => usuarioActual.id !== id
          ),
        },
      });
    },
  });

  // Elimina un jugador
  const confirmarEliminarUsuario = () => {
    Swal.fire({
      title: "¿Deseas eliminar a este usuario?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar",
      cancelButtonText: "No, Cancelar",
    }).then(async (result) => {
      if (result.value) {
        try {
          // Eliminar por ID
          const { data } = await eliminarUsuario({
            variables: {
              id,
            },
          });
          // console.log(data);

          // Mostrar una alerta
          Swal.fire("Eliminado!", data.eliminarUsuario, "success");
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <div className="row">
      <div className={`col-md-2 col-2 ${styles.columnBody}`}>{nombre}</div>
      <div className={`col-md-2 col-2 ${styles.columnBody}`}>{apellido}</div>
      <div className={`col-md-2 col-2 ${styles.columnBody}`}>{rol}</div>
      <div className={`col-md-2 col-2 ${styles.columnBody}`}>
        {nombreTienda}
      </div>
      <div className={`col-md-2 col-2 ${styles.columnBody}`}>
        <Link href={destinoEditar}>
          <EditarIcon />
        </Link>
      </div>
      <div className={`col-md-2 col-2 ${styles.columnBody}`}>
        <button
          type="button"
          className={styles.botonIconos}
          onClick={() => confirmarEliminarUsuario()}
        >
          <Borrar />
        </button>
      </div>
    </div>
  );
};

export default RowUsuario;
