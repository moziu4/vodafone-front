import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import styles from "@/styles/Usuarios.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { CREAR_REGISTRO } from "config/graphqlMutation";
import { OBTENER_REGISTROS } from "config/graphqlQueries";
import { useMiUsuario } from "@/components/Hook/useMiUsuario";

const CrearRegistro = () => {
  const router = useRouter();
  const fecha = Date.now().toString();
  const [token, setToken] = useState("1");
  const gettoken = () => {
    return localStorage.getItem("token");
  };

  const { idUsuario, idTienda } = useMiUsuario(token);

  // Mensaje de alerta
  const [mensaje, guardarMensaje] = useState(null);

  // Mutation para crear nuevos Jugadors
  const [nuevoRegistro] = useMutation(CREAR_REGISTRO, {
    refetchQueries: [{ query: OBTENER_REGISTROS }],
    update(cache) {
      cache.evict({
        id: "ROOT_QUERY",
        field: `obtenerRegistros`,
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      dni: "",
      concepto: "",
      facturado: "",
      notas: "",
    },
    validationSchema: Yup.object({
      dni: Yup.string().required("El dni del cliente es obligatorio"),
      concepto: Yup.string().required("El concepto es obligatoria"),
      facturado: Yup.string().required(
        "El estado de facturación es obligatorio"
      ),
      notas: Yup.string(),
    }),
    onSubmit: async (valores) => {
      const { dni, concepto, facturado, notas } = valores;
      const creado = idUsuario;
      const modificado = idUsuario;
      const tienda = idTienda;

      try {
        const { data } = await nuevoRegistro({
          variables: {
            input: {
              creado,
              tienda,
              fecha,
              dni,
              concepto,
              facturado,
              notas,
              modificado,
            },
          },
        });

        router.push("/"); // redireccionar hacia Tiendas
      } catch (error) {
        guardarMensaje(error.message.replace("GraphQL error: ", ""));

        setTimeout(() => {
          guardarMensaje(null);
        }, 2000);
      }
    },
  });

  useEffect(() => {
    setToken(gettoken());
  }, []);

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
        <h1 className={`${styles.tituloH1}`}>Nuevo Registro</h1>
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
                <label className="datosJugador" htmlFor="dni">
                  <span>DNI:</span>
                </label>

                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 mx-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="dni"
                  type="text"
                  placeholder="DNI del Cliente"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.dni}
                />

                {formik.touched.dni && formik.errors.dni ? (
                  <div className="my-2 px-4 error ">
                    <p>{formik.errors.dni}</p>
                  </div>
                ) : null}
              </div>

              <div className="mb-4 campos col-md-6">
                <label className="datosJugador" htmlFor="concepto">
                  <span>Concepto:</span>
                </label>

                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 mx-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="concepto"
                  type="text"
                  placeholder="Concepto del registro"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option selected disabled hidden>
                    Concepto del registro
                  </option>
                  <option value="HI">HI</option>
                  <option value="DUO">DUO</option>
                  <option value="Migra">Migra</option>
                </select>
                {formik.touched.concepto && formik.errors.concepto ? (
                  <div className="my-2 error px-4">
                    <p>{formik.errors.concepto}</p>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="row">
              <div className="mb-4 campos col-md-6">
                <label className="datosJugador" htmlFor="facturado">
                  <span>Facturado:</span>
                </label>

                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 mx-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="facturado"
                  type="text"
                  placeholder="DNI del Cliente"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option selected disabled hidden>
                    Estado de facturación
                  </option>
                  <option value="Facturado">Facturado</option>
                  <option value="No Facturado">No Facturado</option>
                </select>

                {formik.touched.facturado && formik.errors.facturado ? (
                  <div className="my-2 px-4 error ">
                    <p>{formik.errors.facturado}</p>
                  </div>
                ) : null}
              </div>

              <div className="mb-4 campos col-md-6">
                <label className="datosJugador" htmlFor="notas">
                  <span>Notas:</span>
                </label>

                <textarea
                  maxLength={160}
                  className="shadow appearance-none border rounded w-full py-2 px-3 mx-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="notas"
                  type="text"
                  placeholder="Notas de registro"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.notas}
                />
                {formik.touched.notas && formik.errors.notas ? (
                  <div className="my-2 error px-4">
                    <p>{formik.errors.concepto}</p>
                  </div>
                ) : null}
              </div>
            </div>

            <input
              type="submit"
              className={`w-full mt-4 mb-3  text-white uppercase font-bold ${styles.btnForm}`}
              value="Crear registro"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CrearRegistro;
