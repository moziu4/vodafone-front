import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/Usuarios.module.css";
import Layout from "@/components/Layout";
import { useMutation } from "@apollo/client";
import { Formik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es";
registerLocale("es", es);
import { useUsuario } from "@/components/Hook/useUsuario";
import { useObtenerRegistro } from "@/components/Hook/useObtenerRegistro";
import { ACTUALIZAR_REGISTRO } from "config/graphqlMutation";
import { useToken } from "@/components/Hook/useToken";
import { useMiUsuario } from "@/components/Hook/useMiUsuario";

export default function EditarTienda() {
  const { token } = useToken();
  const { idUsuario } = useMiUsuario(token);

  // obtener el ID actual
  const router = useRouter();
  const {
    query: { pid },
  } = router;

  const [fechaInicio, setfechaInicio] = useState(null);
  const [fechaFin, setfechaFin] = useState(null);

  const { obtenerRegistro } = useObtenerRegistro(pid);

  // Actualizar Tienda
  const [actualizarRegistro] = useMutation(ACTUALIZAR_REGISTRO, {
    update(cache) {
      cache.evict({
        id: "ROOT_QUERY",
        field: `obtenerRegistros`,
      });
    },
  });

  // Schema Valores
  const schemaValidacion = Yup.object({
    dni: Yup.string().required("El dni del cliente es obligatorio"),
    concepto: Yup.string().required("El concepto es obligatoria"),
    facturado: Yup.string().required("El estado de facturación es obligatorio"),
    notas: Yup.string(),
  });

  // Modifica el cliente en la BD
  const actualizarInfoRegistro = async (valores) => {
    const { concepto, facturado, dni, notas, creado } = valores;
    const fecha = fechaFin;
    const modificado = idUsuario;

    try {
      const { data } = await actualizarRegistro({
        variables: {
          id: pid,
          input: {
            creado,
            modificado,
            concepto,
            facturado,
            dni,
            notas,
            fecha,
          },
        },
      });

      // Mostrar Alerta
      Swal.fire(
        "Actualizado",
        "El Registro se actualizó correctamente",
        "success"
      );

      // Redireccionar
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const nombre = (id) => {
    if (obtenerRegistro) {
      const { nombre, apellido } = useUsuario(id);
      return (
        <div>
          {nombre} {apellido}
        </div>
      );
    }
  };

  const actualizarFecha = (date) => {
    setfechaInicio(date);
    setfechaFin(date);
  };

  const cambioFecha = () => {
    if (!fechaInicio) {
      let date = obtenerRegistro.fecha;
      let time = parseInt(date);
      let z = new Date(time);
      setfechaFin(z);
      setfechaInicio(time);
      return time;
    } else {
      return fechaInicio;
    }
  };

  if (!obtenerRegistro) return "cargando..";

  return (
    <Layout>
      <div className={` ${styles.container}`}>
        <h1 className={`${styles.tituloH1}`}>Editar Registro</h1>
      </div>

      <Formik
        validationSchema={schemaValidacion}
        enableReinitialize
        initialValues={obtenerRegistro}
        onSubmit={(valores) => {
          actualizarInfoRegistro(valores);
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
                  <div className="mb-4 campos col-md-6">
                    <label className="datosJugador" htmlFor="creado">
                      <span>Creado por:</span>
                    </label>

                    <div className="shadow appearance-none border rounded w-full py-2 px-3 mx-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                      {nombre(obtenerRegistro.creado)}
                    </div>
                  </div>

                  <div className="mb-4 campos col-md-6">
                    <label className="datosJugador" htmlFor="modificado">
                      <span>Modificado por:</span>
                    </label>

                    <div className="shadow appearance-none border rounded w-full py-2 px-3 mx-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                      {nombre(props.values.modificado)}
                    </div>
                  </div>
                </div>
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
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.dni}
                    />

                    {props.touched.dni && props.errors.dni ? (
                      <div className="my-2 px-4 error ">
                        <p>{props.errors.dni}</p>
                      </div>
                    ) : null}
                  </div>

                  <div className="mb-4 campos col-md-6">
                    <label className="datosJugador" htmlFor="fecha">
                      <span>Fecha:</span>
                    </label>

                    <DatePicker
                      selected={cambioFecha()}
                      locale="es"
                      dateFormat={"dd/MM/yy"}
                      placeholder="Fecha inicial"
                      onChange={(date) => actualizarFecha(date)}
                      className="shadow appearance-none border rounded w-full py-1 px-3 mx-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {props.touched.fecha && props.errors.fecha ? (
                      <div className="my-2 error px-4">
                        <p>{props.errors.fechapto}</p>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="row">
                  <div className="mb-4 campos col-md-6">
                    <label className="datosJugador" htmlFor="concepto">
                      <span>Concepto:</span>
                    </label>

                    <select
                      className="shadow appearance-none border rounded w-full py-2 px-3 mx-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="concepto"
                      type="text"
                      placeholder="Concepto del registro"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.concepto}
                    >
                      <option selected disabled hidden>
                        Concepto del registro
                      </option>
                      <option value="HI">HI</option>
                      <option value="DUO">DUO</option>
                      <option value="Migra">Migra</option>
                    </select>
                    {props.touched.concepto && props.errors.concepto ? (
                      <div className="my-2 error px-4">
                        <p>{props.errors.concepto}</p>
                      </div>
                    ) : null}
                  </div>
                  <div className="mb-4 campos col-md-6">
                    <label className="datosJugador" htmlFor="facturado">
                      <span>Facturado:</span>
                    </label>

                    <select
                      className="shadow appearance-none border rounded w-full py-2 px-3 mx-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="facturado"
                      type="text"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.facturado}
                    >
                      <option selected disabled hidden>
                        Estado de facturación
                      </option>
                      <option value="Facturado">Facturado</option>
                      <option value="No Facturado">No Facturado</option>
                    </select>

                    {props.touched.facturado && props.errors.facturado ? (
                      <div className="my-2 px-4 error ">
                        <p>{props.errors.facturado}</p>
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="row">
                  <div className="mb-4 campos ">
                    <label className="datosJugador" htmlFor="notas">
                      <span>Notas:</span>
                    </label>

                    <textarea
                      maxLength={60}
                      className="shadow appearance-none border rounded w-full py-2 px-3 mx-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="notas"
                      type="text"
                      placeholder="Notas de registro"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.notas}
                    />
                    {props.touched.notas && props.errors.notas ? (
                      <div className="my-2 error px-4">
                        <p>{props.errors.notas}</p>
                      </div>
                    ) : null}
                  </div>
                </div>

                <input
                  type="submit"
                  className={`w-full mt-4 mb-3  text-white uppercase font-bold ${styles.btnForm}`}
                  value="Editar Registro"
                />
              </form>
            </div>
          );
        }}
      </Formik>
    </Layout>
  );
}
