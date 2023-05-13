import React from "react";
import { useRouter } from "next/router";
import styles from "@/styles/Usuarios.module.css";
import Layout from "@/components/Layout";
import { useQuery, useMutation } from "@apollo/client";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { OBTENER_TIENDA } from "config/graphqlQueries";
import { ACTUALIZAR_TIENDA } from "config/graphqlMutation";

export default function EditarTienda() {
  // obtener el ID actual
  const router = useRouter();
  const {
    query: { pid },
  } = router;

  // Obtener datos
  const { data, loading, error } = useQuery(OBTENER_TIENDA, {
    variables: {
      id: pid,
    },
  });

  // Actualizar Tienda
  const [actualizarTienda] = useMutation(ACTUALIZAR_TIENDA, {
    update(cache) {
      cache.evict({
        id: "ROOT_QUERY",
        field: `obtenerTiendas`,
      });
    },
  });

  // Schema Valores
  const schemaValidacion = Yup.object({
    nombre: Yup.string().required("El nombre de la tienda es obligatorio"),
    direccion: Yup.string().required(
      "La localidad de la tienda es obligatoria"
    ),
    valoracion: Yup.string(),
  });

  if (loading) return "Cargando..";

  const { obtenerTienda } = data;

  // Modifica el cliente en la BD
  const actualizarInfoTienda = async (valores) => {
    const { nombre, direccion, valoracion } = valores;

    try {
      const { data } = await actualizarTienda({
        variables: {
          id: pid,
          input: {
            nombre,
            direccion,
            valoracion,
          },
        },
      });

      // console.log(data);

      // Mostrar Alerta
      Swal.fire(
        "Actualizado",
        "La tienda se actualizó correctamente",
        "success"
      );

      // Redireccionar
      router.push("/tiendas");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className={` ${styles.container}`}>
        <h1 className={`${styles.tituloH1}`}>Editar Tienda</h1>
      </div>

      <Formik
        validationSchema={schemaValidacion}
        enableReinitialize
        initialValues={obtenerTienda}
        onSubmit={(valores) => {
          actualizarInfoTienda(valores);
        }}
      >
        {(props) => {
          // console.log(props);
          return (
            <div className={`row ${styles.contenedorListaUsuarios}`}>
              <form
                className={`bg-white shadow-md ${styles.contentNuevoUsuario}`}
                onSubmit={props.handleSubmit}
              >
                <div className="row">
                  <div className="col-md-6 mb-4 campos">
                    <label className="datosJugador" htmlFor="nombre">
                      <span>Nombre:</span>
                    </label>

                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-2 mx-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="nombre"
                      type="text"
                      placeholder="Nombre Usuario"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.nombre}
                    />
                    {props.touched.nombre && props.errors.nombre ? (
                      <div className="error">
                        <p>{props.errors.nombre}</p>
                      </div>
                    ) : null}
                  </div>

                  <div className="mb-4 col-md-6 campos">
                    <label className="datosJugador" htmlFor="direccion">
                      <span>Localidad:</span>
                    </label>

                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 mx-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="direccion"
                      type="text"
                      placeholder="Localidad de la tienda"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.direccion}
                    />
                    {props.touched.direccion && props.errors.direccion ? (
                      <div className="error">
                        <p>{props.errors.direccion}</p>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="row">
                  <div className="mb-4 campos col-md-6">
                    <label className="datosJugador" htmlFor="valoracion">
                      <span>Valoración:</span>
                    </label>

                    <Field
                      className="shadow appearance-none border rounded w-full py-2 px-3 mx-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="valoracion"
                      name="valoracion"
                      as="select"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    >
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                    </Field>
                  </div>

                  {props.touched.valoracion && props.errors.valoracion ? (
                    <div className="error">
                      <p>{props.errors.valoracion}</p>
                    </div>
                  ) : null}
                </div>

                <input
                  type="submit"
                  className={`w-full mt-4 mb-3  text-white uppercase font-bold ${styles.btnForm}`}
                  value="Editar tienda"
                />
              </form>
            </div>
          );
        }}
      </Formik>
    </Layout>
  );
}
