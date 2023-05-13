import Link from "next/link";
import React, { useContext } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Sidebar.module.css";
import Header from "./Header";
import MiUsuarioContext from "config/context/miUsuario/MiUsuarioContext";

const Sidebar = (props) => {
  const miUsuarioContext = useContext(MiUsuarioContext);
  const { usuario } = miUsuarioContext;
  const { rol, nombre, id } = usuario;
  const router = useRouter();

  return (
    <>
      <Header idUsuario={id} rol={rol} nombre={nombre} />

      <div className={styles.navegadorContent}>
        <nav className={styles.navegador}>
          <div
            className={
              router.pathname === "/" ? styles.liniasActivas : styles.linias
            }
          >
            <Link href={"/"} className={styles.enlaces}>
              Registros
            </Link>
          </div>
          {rol == "Jefe" && (
            <div
              className={
                router.pathname === "/tiendas"
                  ? styles.liniasActivas
                  : styles.linias
              }
            >
              <Link href={"/tiendas"} className={styles.enlaces}>
                Tiendas
              </Link>
            </div>
          )}

          {rol !== "Comercial" && (
            <div
              className={
                router.pathname === "/usuarios"
                  ? styles.liniasActivas
                  : styles.linias
              }
            >
              <Link href={"/usuarios"} className={styles.enlaces}>
                Usuarios
              </Link>
            </div>
          )}

          {rol !== "Comercial" && (
            <div
              className={
                router.pathname === "/conceptos"
                  ? styles.liniasActivas
                  : styles.linias
              }
            >
              <Link href={"/conceptos"} className={styles.enlaces}>
                Conceptos
              </Link>
            </div>
          )}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
