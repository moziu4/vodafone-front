import { useState } from "react";
import styles from "@/styles/Usuarios.module.css";
const { default: NotasIcon } = require("@/utils/NotasIcon");

const Notas = (props) => {
  let notas = props.notas;
  const [mostrar, setmostrar] = useState(false);

  return (
    <>
      <div onClick={() => setmostrar(true)}>
        <NotasIcon />
      </div>
      {mostrar && (
        <div className={styles.fondoNotas}>
          <div className={styles.contentNotas}>
            <div className={styles.contentTituloNotas}>
              <div className={styles.tituloNotas}>
                <h3>Notas</h3>
              </div>
              <button
                className={styles.botonCerrar}
                onClick={() => setmostrar(false)}
              >
                X
              </button>
            </div>
            <div className={styles.contentTextoNotas}>{notas}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Notas;
