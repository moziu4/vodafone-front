import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import styles from "@/styles/Usuarios.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { NUEVO_USUARIO } from "config/graphqlMutation";
import { OBTENER_USUARIOS } from "config/graphqlQueries";
import useSelectTiendas from "@/components/Usuarios/SelectUsuarios";

const NuevoUsuario = () => {
  const router = useRouter();
  const [obtenerTiendas] = useSelectTiendas();

  const [listaTiendas, setlistaTiendas] = useState([]);
  const [listaCargada, setListaCargado] = useState(false);
  // Mensaje de alerta
  const [mensaje, guardarMensaje] = useState(null);

  // Mutation para crear nuevos Jugadors
  const [nuevoUsuario] = useMutation(NUEVO_USUARIO, {
    refetchQueries: [{ query: OBTENER_USUARIOS }],
    update(cache) {
      cache.evict({
        id: "ROOT_QUERY",
        field: `obtenerUsuarios`,
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      rol: "",
      tienda: "",
      password: "",
      username: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required("El nombre del usuario es obligatorio"),
      apellido: Yup.string().required("El apellido del usuario es obligatorio"),
      rol: Yup.string().required("El cargo del usuario es obligatorio"),
      tienda: Yup.string().required("La tienda es obligatoria"),
      username: Yup.string().required("El username es obligatorio"),
      password: Yup.string().required("El password es obligatorio"),
    }),
    onSubmit: async (valores) => {
      const { nombre, apellido, rol, tienda, username, password } = valores;

      try {
        const { data } = await nuevoUsuario({
          variables: {
            input: {
              nombre,
              apellido,
              rol,
              tienda,
              username,
              password,
            },
          },
        });

        router.push("/usuarios"); // redireccionar hacia Usuarios
      } catch (error) {
        guardarMensaje(error.message.replace("GraphQL error: ", ""));

        setTimeout(() => {
          guardarMensaje(null);
        }, 2000);
      }
    },
  });

  useEffect(() => {
    setlistaTiendas(obtenerTiendas);
    setTimeout(() => {
      setListaCargado(true);
    }, 100);
  }, [obtenerTiendas]);

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
        <h1 className={`${styles.tituloH1}`}>Nuevo Usuario</h1>
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
                <label className="datosJugador" htmlFor="apellido">
                  <span>Apellidos:</span>
                </label>

                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 mx-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="apellido"
                  type="text"
                  placeholder="Apellidos Usuario"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.apellido}
                />
                {formik.touched.apellido && formik.errors.apellido ? (
                  <div className="my-2 error px-4">
                    <p>{formik.errors.apellido}</p>
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
                <label className="datosJugador" htmlFor="rol">
                  <span>Cargo:</span>
                </label>

                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 mx-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="rol"
                  type="text"
                  placeholder="Cargo"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option selected disabled hidden>
                    Selecciona un cargo
                  </option>
                  <option value="Comercial">Comercial</option>
                  <option value="Encargado">Encagardo de tienda</option>
                  <option value="Jefe">Encargado de zona</option>
                </select>
                {formik.touched.rol && formik.errors.rol ? (
                  <div className="my-2 px-4 error ">
                    <p>{formik.errors.rol}</p>
                  </div>
                ) : null}
              </div>

              <div className="mb-4 campos col-md-6">
                <label className="datosJugador" htmlFor="tienda">
                  <span>Tienda:</span>
                </label>

                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 mx-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="tienda"
                  name="tienda"
                  type="select"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option selected disabled hidden>
                    Selecciona una tienda
                  </option>
                  {listaCargada &&
                    obtenerTiendas.map((tienda) => {
                      return (
                        <option key={tienda.id} value={tienda.id}>
                          {tienda.nombre}
                        </option>
                      );
                    })}
                </select>
                {formik.touched.tienda && formik.errors.tienda ? (
                  <div className="my-2 px-4 error ">
                    <p>{formik.errors.tienda}</p>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="row">
              <div className="mb-4 campos col-md-6">
                <label className="datosJugador" htmlFor="username">
                  <span>Username:</span>
                </label>

                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 mx-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Username"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                />
                {formik.touched.username && formik.errors.username ? (
                  <div className="my-2 px-4 error ">
                    <p>{formik.errors.username}</p>
                  </div>
                ) : null}
              </div>

              <div className="mb-4 campos col-md-6">
                <label className="datosJugador" htmlFor="password">
                  <span>Password:</span>
                </label>

                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 mx-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="text"
                  placeholder="Password usuario"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="my-2 px-4 error ">
                    <p>{formik.errors.password}</p>
                  </div>
                ) : null}
              </div>
            </div>

            <input
              type="submit"
              className={`w-full mt-4 mb-3  text-white uppercase font-bold ${styles.btnForm}`}
              value="Nuevo usuario"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default NuevoUsuario;
