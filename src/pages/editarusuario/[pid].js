import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/Usuarios.module.css";
import Layout from "@/components/Layout";
import { useQuery, useMutation } from "@apollo/client";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { OBTENER_USUARIO } from "config/graphqlQueries";
import { ACTUALIZAR_USUARIO } from "config/graphqlMutation";
import VerIcon from "@/utils/VerIcon";
import useSelectTiendas from "@/components/Usuarios/SelectUsuarios";

export default function EditarUsuario() {
  const [passwordType, setPasswordType] = useState("password");
  const [obtenerTiendas] = useSelectTiendas();
  const [listaCargada, setListaCargada] = useState(false);

  // obtener el ID actual
  const router = useRouter();
  const {
    query: { pid },
  } = router;

  // Obtener datos
  const { data, loading, error } = useQuery(OBTENER_USUARIO, {
    variables: {
      id: pid,
    },
  });

  // Actualizar Cliente
  const [actualizarUsuario] = useMutation(ACTUALIZAR_USUARIO, {
    update(cache) {
      cache.evict({
        id: "ROOT_QUERY",
        field: `obtenerUsuarios`,
      });
    },
  });

  useEffect(() => {
    setTimeout(setListaCargada(true), 100);
  }, [obtenerTiendas]);

  // Schema Valores
  const schemaValidacion = Yup.object({
    nombre: Yup.string().required("El nombre del usuario es obligatorio"),
    apellido: Yup.string().required("El apellido del usuario es obligatorio"),
    rol: Yup.string().required("El cargo del usuario es obligatorio"),
    tienda: Yup.string().required("La tienda asignada es obligatoria"),
    password: Yup.string().required("El Password del usuario es necesario"),
  });

  if (loading) return "Cargando..";

  const { obtenerUsuario } = data;

  const verPassword = (e) => {
    {
      passwordType == "password" && setPasswordType("text");
    }
    {
      passwordType == "text" && setPasswordType("password");
    }
  };
  // Modifica el cliente en la BD
  const actualizarInfoUsuario = async (valores) => {
    const { nombre, apellido, rol, password, tienda } = valores;

    try {
      const { data } = await actualizarUsuario({
        variables: {
          id: pid,
          input: {
            nombre,
            apellido,
            rol,
            tienda,
            password,
          },
        },
      });

      // console.log(data);

      // Mostrar Alerta
      Swal.fire(
        "Actualizado",
        "El usuario se actualizó correctamente",
        "success"
      );

      // Redireccionar
      router.push("/usuarios");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className={` ${styles.container}`}>
        <h1 className={`${styles.tituloH1}`}>Editar Usuario</h1>
      </div>

      <Formik
        validationSchema={schemaValidacion}
        enableReinitialize
        initialValues={obtenerUsuario}
        onSubmit={(valores) => {
          actualizarInfoUsuario(valores);
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
                    <label className="datosJugador" htmlFor="apellido">
                      <span>Apellidos:</span>
                    </label>

                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 mx-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="apellido"
                      type="text"
                      placeholder="Apellido Usuario"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.apellido}
                    />
                    {props.touched.apellido && props.errors.apellido ? (
                      <div className="error">
                        <p>{props.errors.apellido}</p>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="row">
                  <div className="mb-4 campos col-md-6">
                    <label className="datosJugador" htmlFor="rol">
                      <span>Cargo:</span>
                    </label>

                    <Field
                      className="shadow appearance-none border rounded w-full py-2 px-3 mx-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="rol"
                      name="rol"
                      as="select"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    >
                      <option value="Comercial">Comercial</option>
                      <option value="Encargado">Encargado de tienda</option>
                      <option value="Jefe">Encargado de zona</option>
                    </Field>
                  </div>

                  {props.touched.rol && props.errors.rol ? (
                    <div className="error">
                      <p>{props.errors.rol}</p>
                    </div>
                  ) : null}

                  <div className="mb-4 col-md-6 campos">
                    <label className="datosJugador" htmlFor="tienda">
                      <span>Tienda:</span>
                    </label>

                    <select
                      className="shadow appearance-none border rounded w-full py-2 px-3 mx-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="tienda"
                      name="tienda"
                      type="select"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.tienda}
                    >
                      {listaCargada &&
                        obtenerTiendas.map((tienda) => {
                          return (
                            <option key={tienda.id} value={tienda}>
                              {tienda.nombre}
                            </option>
                          );
                        })}
                    </select>
                    {props.touched.tienda && props.errors.tienda ? (
                      <div className="error">
                        <p>{props.errors.tienda}</p>
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="row">
                  <div className="mb-4 campos col-md-6">
                    <label className="datosJugador" htmlFor="Username">
                      <span>Username:</span>
                    </label>

                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 mx-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="username"
                      type="text"
                      placeholder="Username"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.username}
                      disabled
                    />
                  </div>

                  <div className="mb-4 col-md-6 campos">
                    <label className="datosJugador" htmlFor="password">
                      <span>Password:</span>
                    </label>
                    <div className="row contenedorPassword">
                      <input
                        className="col-md-10 shadow appearance-none border rounded w-full py-2 px-3 mx-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type={passwordType}
                        placeholder="Password Usuario"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.password}
                      />

                      <button
                        alt="Ver contraseña"
                        type="button"
                        className={`${styles.botonVer} col-md-1`}
                        onClick={(e) => verPassword(e)}
                      >
                        <VerIcon />
                      </button>
                    </div>
                    {props.touched.password && props.errors.password ? (
                      <div className="error">
                        <p>{props.errors.password}</p>
                      </div>
                    ) : null}
                  </div>
                </div>

                <input
                  type="submit"
                  className={`w-full mt-4 mb-3  text-white uppercase font-bold ${styles.btnForm}`}
                  value="Editar Usuario"
                />
              </form>
            </div>
          );
        }}
      </Formik>
    </Layout>
  );
}
