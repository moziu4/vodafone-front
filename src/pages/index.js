import { Inter } from "next/font/google";
import { useState, useEffect } from "react";
import styles from "@/styles/Usuarios.module.css";
import Layout from "@/components/Layout";
import FiltroRegistros from "@/components/Registros/FiltroRegistros";
import { useToken } from "../components/Hook/useToken";
import { useMiUsuario } from "../components/Hook/useMiUsuario";

export default function Home() {
  const [tienda, setTienda] = useState("");

  const { token } = useToken();
  const { idTienda, rol } = useMiUsuario(token);
  const [fechaInicio, setfechaInicio] = useState("");
  const [fechaFinal, setfechaFinal] = useState("");

  let date = new Date();
  let fechaPrimerDia = new Date(date.getFullYear(), date.getMonth(), 1, 0, 0);
  let fechaUltimoDia = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0,
    23,
    59,
    59
  );
  let primerDia = fechaPrimerDia.getTime();
  let ultimoDia = fechaUltimoDia.getTime();

  useEffect(() => {
    setTienda(idTienda);
    setfechaInicio(primerDia);
    setfechaFinal(ultimoDia);
  });

  return (
    <Layout>
      <div
        className={` ${
          rol == "Comercial" ? styles.containerComercial : styles.container
        }`}
      >
        <h1 className={`${styles.tituloH1}`} id="tituloRegistros">
          Registros
        </h1>
      </div>

      <div className={styles.contenedorListaUsuarios}>
        <FiltroRegistros
          tienda={tienda}
          primerDia={fechaInicio}
          ultimoDia={fechaFinal}
        />
      </div>
    </Layout>
  );
}
