import React, { useState } from "react";
import Layout from "@/components/Layout";
import styles from "@/styles/Usuarios.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { NUEVO_CONCEPTO } from "config/graphqlMutation";
import { OBTENER_CONCEPTOS } from "config/graphqlQueries";

const CrearConcepto = () => {
  const router = useRouter();

  // Mensaje de alerta
  const [mensaje, guardarMensaje] = useState(null);

  // Mutation para crear nuevos Jugadors
  const [nuevoConcepto] = useMutation(NUEVO_CONCEPTO, {
    refetchQueries: [{ query: OBTENER_CONCEPTOS }],
    update(cache) {
      cache.evict({
        id: "ROOT_QUERY",
        field: `obtenerConceptos`,
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      nombre: "",
      descripcion: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required("El nombre del concepto es obligatorio"),
      descripcion: Yup.string(),
    }),
    onSubmit: async (valores) => {
      const { nombre, descripcion } = valores;

      try {
        const { data } = await nuevoConcepto({
          variables: {
            input: {
              nombre,
              descripcion,
            },
          },
        });

        router.push("/conceptos"); // redireccionar hacia Usuarios
      } catch (error) {
        guardarMensaje(error.message.replace("GraphQL error: ", ""));

        setTimeout(() => {
          guardarMensaje(null);
        }, 2000);
      }
    },
  });

  const mostrarMensaje = () => {
    return (
      <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
        <p>{mensaje}</p>
      </div>
    );
  };

  return (
    <Layout>
      <div className={` ${styles.container}`}>
        <h1 className={`${styles.tituloH1}`}>Nuevo Concepto</h1>
      </div>
      <div className={styles.contenedorListaUsuarios}>
        {mensaje && mostrarMensaje()}

        <div className=" row">
          <form
            className={`bg-white shadow-md ${styles.contentNuevoUsuario}`}
            onSubmit={formik.handleSubmit}
          >
            <div className="row">
              <div className="mb-4 campos col-md-6">
                <label className="datosJugador" htmlFor="nombre">
                  <span>Nombre:</span>
                </label>

                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 mx-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="nombre"
                  type="text"
                  placeholder="Nombre del Concepto"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.nombre}
                />

                {formik.touched.nombre && formik.errors.nombre ? (
                  <div className="my-2 px-4 error ">
                    <p>{formik.errors.nombre}</p>
                  </div>
                ) : null}
              </div>

              <div className="mb-4 campos col-md-6">
                <label className="datosJugador" htmlFor="descripcion">
                  <span>Descripcion:</span>
                </label>

                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 mx-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="descripcion"
                  type="text"
                  placeholder="Descripcion del Concepto"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.descripcion}
                />
                {formik.touched.descripcion && formik.errors.descripcion ? (
                  <div className="my-2 error px-4">
                    <p>{formik.errors.descripcion}</p>
                  </div>
                ) : null}
              </div>
            </div>

            <input
              type="submit"
              className={`w-full mt-4 mb-3  text-white uppercase font-bold ${styles.btnForm}`}
              value="Nuevo Concepto"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CrearConcepto;
