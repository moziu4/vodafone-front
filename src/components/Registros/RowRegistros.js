import styles from "@/styles/Usuarios.module.css";
import EditarIcon from "@/utils/EditarIcon";
import Link from "next/link";
import { useFecha } from "../Hook/useFecha";
import { useUsuario } from "../Hook/useUsuario";
import Notas from "./Notas";

const RowRegistro = ({ registro, index }) => {
  const { id, fecha, dni, concepto, creado, facturado, notas } = registro;
  const { nombre } = useUsuario(creado);
  const { data } = useFecha(fecha);
  const destinoEditar = "/editarRegistro/" + id;

  return (
    <div className="row">
      <div className={`col-md-2 col-2 ${styles.columnBody}`}>{nombre}</div>
      <div className={`col-md-2 col-2 ${styles.columnBody}`}>{data}</div>
      <div className={`col-md-2 col-2 ${styles.columnBody}`}>{dni}</div>
      <div className={`col-md-2 col-2 ${styles.columnBody}`}>{facturado}</div>
      <div className={`col-md-2 col-2 ${styles.columnBody}`}>{concepto}</div>
      <div className={`col-md-2 col-2 ${styles.columnBody}`}>
        <div className={`${styles.iconosEditar}`}>
          <Link href={destinoEditar}>
            <EditarIcon />
          </Link>
        </div>
        <div className={`${styles.iconosEditar}`}>
          {notas && <Notas notas={notas} />}
        </div>
      </div>
    </div>
  );
};

export default RowRegistro;
