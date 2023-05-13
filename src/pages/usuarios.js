import { Inter } from "next/font/google";
import styles from "@/styles/Usuarios.module.css";
import Layout from "@/components/Layout";
import ListaUsuarios from "@/components/Usuarios/ListaUsuarios";
import Link from "next/link";

export default function Usuarios() {
  return (
    <Layout>
      <div className={` ${styles.container}`}>
        <h1 className={`${styles.tituloH1}`}>Usuarios</h1>
      </div>
      <div className={styles.contenedorBotonCrear}>
        <Link href="/nuevousuario">
          <button className={styles.botonCrear}>Crear Usuario</button>
        </Link>
      </div>
      <div className={styles.contenedorListaUsuarios}>
        <ListaUsuarios />
      </div>
    </Layout>
  );
}
