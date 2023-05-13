import { useState, useEffect, useContext } from "react";
import styles from "@/styles/Usuarios.module.css";
import Layout from "@/components/Layout";
import Link from "next/link";
import Loader from "@/components/Loader";
import ListaConceptos from "@/components/Conceptos/ListaConceptos";
import { useQuery } from "@apollo/client";
import { OBTENER_CONCEPTOS } from "config/graphqlQueries";
import MiUsuarioContext from "config/context/miUsuario/MiUsuarioContext";
import { useRouter } from "next/router";

export default function Conceptos() {
  const router = useRouter();
  const miUsuarioContext = useContext(MiUsuarioContext);
  const { usuario } = miUsuarioContext;
  const { data, loading, error } = useQuery(OBTENER_CONCEPTOS);

  useEffect(() => {
    if (usuario) {
      console.log(usuario.rol);
    }
  });
  if (loading) return <Loader />;

  const { obtenerConceptos } = data;
  console.log(obtenerConceptos);

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.contenedorBotonCrear}>
          <Link href="/">
            <button className={styles.botonCrear}>Crear Concepto</button>
          </Link>
        </div>
      </div>
      <div className={styles.contenedorListaUsuarios}>
        <ListaConceptos obtenerConceptos={obtenerConceptos} />
      </div>
    </Layout>
  );
}
