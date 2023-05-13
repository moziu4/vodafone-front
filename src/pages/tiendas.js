import { useState, useEffect } from "react";
import styles from "@/styles/Usuarios.module.css";
import Layout from "@/components/Layout";
import Link from "next/link";
import VerificacionTienda from "@/components/Tiendas/VerificacionTienda";
import Loader from "@/components/Loader";

export default function Tiendas() {
  const [token, setToken] = useState("1");
  const [cargado, setCargado] = useState(false);
  const gettoken = () => {
    return localStorage.getItem("token");
  };

  useEffect(() => {
    setToken(gettoken());
  }, []);

  useEffect(() => {
    if (token != 1) {
      setCargado(true);
    }
  }, [token]);
  if (!cargado) return <Loader />;

  return (
    <Layout>
      <div className={` ${styles.container}`}>
        <h1 className={`${styles.tituloH1}`}>Tiendas</h1>
      </div>
      <div className={styles.contenedorBotonCrear}>
        <Link href="/nuevatienda">
          <button className={styles.botonCrear}>Crear Tienda</button>
        </Link>
      </div>
      <div className={styles.contenedorListaUsuarios}>
        <VerificacionTienda token={token} />
      </div>
    </Layout>
  );
}
