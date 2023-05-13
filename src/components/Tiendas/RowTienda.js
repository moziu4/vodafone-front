import styles from "@/styles/Usuarios.module.css";
import Borrar from "@/utils/Borrar";
import EditarIcon from "@/utils/EditarIcon";
import { useMutation } from "@apollo/client";
import { ELIMINAR_TIENDA } from "config/graphqlMutation";
import { OBTENER_TIENDAS } from "config/graphqlQueries";
import Link from "next/link";
import Swal from "sweetalert2";

const RowTienda = ({ tienda }) => {
  const { nombre, direccion, id, valoracion } = tienda;
  const destinoEditar = "/editartienda/" + id;

  const [eliminarTienda] = useMutation(ELIMINAR_TIENDA, {
    update(cache) {
      // obtener una copia del objeto de cache
      const { obtenerTiendas } = cache.readQuery({
        query: OBTENER_TIENDAS,
      });

      // Reescribir el cache
      cache.writeQuery({
        query: OBTENER_TIENDAS,
        data: {
          obtenerTiendas: obtenerTiendas.filter(
            (tiendaActual) => tiendaActual.id !== id
          ),
        },
      });
    },
  });

  // Elimina una tienda
  const confirmarEliminarTienda = () => {
    Swal.fire({
      title: "¿Deseas eliminar a esta tienda?",
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
          const { data } = await eliminarTienda({
            variables: {
              id,
            },
          });
          // console.log(data);

          // Mostrar una alerta
          Swal.fire("Eliminada!", data.eliminarTienda, "success");
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <div className="row">
      <div className={`col-md-4 col-4 ${styles.columnBody}`}>{nombre}</div>
      <div className={`col-md-3 col-3 ${styles.columnBody}`}>{direccion}</div>
      <div className={`col-md-1 col-1 ${styles.columnBody}`}>{valoracion}</div>
      <div className={`col-md-2 col-2 ${styles.columnBody}`}>
        <Link href={destinoEditar}>
          <EditarIcon />
        </Link>
      </div>
      <div className={`col-md-2 col-2 ${styles.columnBody}`}>
        <button
          type="button"
          className={styles.botonIconos}
          onClick={() => confirmarEliminarTienda()}
        >
          <Borrar />
        </button>
      </div>
    </div>
  );
};

export default RowTienda;
