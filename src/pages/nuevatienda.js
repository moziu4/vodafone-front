import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import styles from "@/styles/Usuarios.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { NUEVA_TIENDA } from "config/graphqlMutation";
import { OBTENER_TIENDAS } from "config/graphqlQueries";

const NuevaTienda = () => {
  const router = useRouter();

  // Mensaje de alerta
  const [mensaje, guardarMensaje] = useState(null);

  // Mutation para crear nuevos Jugadors
  const [nuevaTienda] = useMutation(NUEVA_TIENDA, {
    refetchQueries: [{ query: OBTENER_TIENDAS }],
    update(cache) {
      cache.evict({
        id: "ROOT_QUERY",
        field: `obtenerTiendas`,
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      nombre: "",
      direccion: "",
      valoracion: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required("El nombre de la tienda es obligatorio"),
      direccion: Yup.string().required(
        "La localidad de la tienda es obligatoria"
      ),
      valoracion: Yup.string(),
    }),
    onSubmit: async (valores) => {
      const { nombre, direccion, valoracion } = valores;

      try {
        const { data } = await nuevaTienda({
          variables: {
            input: {
              nombre,
              direccion,
              valoracion,
            },
          },
        });

        router.push("/tiendas"); // redireccionar hacia Tiendas
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
        <h1 className={`${styles.tituloH1}`}>Nueva Tienda</h1>
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
                  placeholder="Nombre Usuario"
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
                <label className="datosJugador" htmlFor="direccion">
                  <span>Localidad:</span>
                </label>

                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 mx-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="direccion"
                  type="text"
                  placeholder="Localidad de la tienda"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.direccion}
                />
                {formik.touched.direccion && formik.errors.direccion ? (
                  <div className="my-2 error px-4">
                    <p>{formik.errors.direccion}</p>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="row">
              <div className=" campos col-md-6"></div>
              <div className=" campos col-md-6"></div>
            </div>

            <div className="row">
              <div className="mb-4 campos col-md-6">
                <label className="datosJugador" htmlFor="valoracion">
                  <span>Valoración:</span>
                </label>

                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 mx-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="valoracion"
                  type="text"
                  placeholder="Valoración de la tienda"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option selected disabled hidden>
                    Selecciona la valoración
                  </option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </select>
                {formik.touched.valoracion && formik.errors.valoracion ? (
                  <div className="my-2 px-4 error ">
                    <p>{formik.errors.valoracion}</p>
                  </div>
                ) : null}
              </div>
            </div>

            <input
              type="submit"
              className={`w-full mt-4 mb-3  text-white uppercase font-bold ${styles.btnForm}`}
              value="Crear tienda"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default NuevaTienda;
