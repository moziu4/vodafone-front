import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import styles from "@/styles/Usuarios.module.css";
import Loader from "../Loader";
import { useRouter } from "next/router";
import { useMiUsuario } from "../Hook/useMiUsuario";

const ListaConceptos = (props) => {
  const [miRol, setmiRol] = useState("Encargado");
  const router = useRouter();
  const token = props.token;
  const { rol } = useMiUsuario(token);

  useEffect(() => {
    {
      rol && setmiRol(rol);
    }
  }, [rol]);

  return (
    <div>
      <div className="row">
        <div className={`col-md-3 col-3 ${styles.columnHead}`}>Concepto</div>
        <div className={`col-md-7 col-5 ${styles.columnHead}`}>Descripción</div>
        <div className={`col-md-1 col-2 ${styles.columnHead}`}>Editar</div>
        <div className={`col-md-1 col-2 ${styles.columnHead}`}>Eliminar</div>
      </div>
    </div>
  );
};
export default ListaConceptos;
