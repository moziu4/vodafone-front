import { useState, useEffect } from "react";
import styles from "@/styles/Usuarios.module.css";
import RowRegistro from "./RowRegistros";

const ListaRegistros = (props) => {
  const [loader, setloader] = useState(false);
  const [listaRegistros, setlistaRegistros] = useState([]);
  const { registros } = props;
  useEffect(() => {
    setloader(false);
    if (registros !== undefined) {
      setlistaRegistros(registros);
    }
  }, [registros]);

  useEffect(() => {
    if (registros !== undefined) {
      setloader(true);
    }
  }, [listaRegistros]);

  if (!loader) return "Cargando...";

  return (
    <div>
      <div className="row">
        <div className={`col-md-2 col-2 ${styles.columnHead}`}>Comercial</div>
        <div className={`col-md-2 col-2 ${styles.columnHead}`}>Fecha</div>
        <div className={`col-md-2 col-2 ${styles.columnHead}`}>DNI</div>
        <div className={`col-md-2 col-2 ${styles.columnHead}`}>Facturado</div>
        <div className={`col-md-2 col-2 ${styles.columnHead}`}>Concepto</div>
        <div className={`col-md-2 col-2 ${styles.columnHead}`}>Editar</div>
      </div>
      {listaRegistros.length == 0 && (
        <div className={`row ${styles.noRegistros}`}>No Hay Registros</div>
      )}
      {listaRegistros.map((registro, index) => (
        <RowRegistro index={index} key={registro.id} registro={registro} />
      ))}
    </div>
  );
};
export default ListaRegistros;
