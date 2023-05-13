import React, { useState, useEffect, useContext } from "react";
import Head from "next/head";
import Sidebar from "./Sidebar";
//import SidebarMovil from "./SidebarMovil";
import styles from "../styles/Layout.module.css";
import { useRouter } from "next/router";
import Loader from "./Loader";
import { useMiUsuarioLayout } from "./Hook/useMiUsuarioLayout";
import MiUsuarioContext from "config/context/miUsuario/MiUsuarioContext";

const Layout = ({ children }) => {
  const router = useRouter();
  const [token, setToken] = useState("1");
  const [cargado, setCargado] = useState(false);
  const { obtenerMiUsuario } = useMiUsuarioLayout(token);
  // Crear context
  const miUsuarioContext = useContext(MiUsuarioContext);
  const { agregarMiUsuario } = miUsuarioContext;

  const gettoken = () => {
    return localStorage.getItem("token");
  };

  useEffect(() => {
    setToken(gettoken());
  }, []);

  useEffect(() => {
    if (token == null) {
      router.push("/login");
    }
    if (token != null && token != 1) {
      setCargado(true);
    }
  }, [obtenerMiUsuario]);

  useEffect(() => {
    agregarMiUsuario(obtenerMiUsuario);
  }, [obtenerMiUsuario]);

  if (!cargado) return <Loader />;

  return (
    <>
      <Head>
        <title>Vodafone</title>
        <meta name="description" content="Generated for Vodafone" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo-vodafone.ico" />
      </Head>
      <div className={`row ${styles.pantalla}`}>
        <div className={`col-md-2 ${styles.fondoSide}`}>
          <Sidebar />
        </div>
        <div className={styles.movilBar}>
          <p>jol</p>
        </div>

        <main className={`col-md-10 ${styles.fondo} `}>{children}</main>
      </div>
    </>
  );
};
export default Layout;
