import React, { useState, useEffect } from "react";
import styles from "@/styles/Usuarios.module.css";
import Link from "next/link";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es";
registerLocale("es", es);
import { useObtenerRegistros } from "../Hook/useObtenerRegistros";
import ListaRegistros from "./ListaRegistros";
import { useUsuarioTienda } from "../Hook/useUsuarioTienda";

const FiltroRegistros = (props) => {
  const tienda = props.tienda;
  const [cargado, setcargado] = useState(false);
  const [usuario, setUsuario] = useState("");
  const [dni, setDni] = useState("");
  const [facturado, setFacturado] = useState("");
  const [concepto, setConcepto] = useState("");
  const [usuariosDeTienda, setUsuariosDeTienda] = useState("");
  const [fechaInicio, setFechaInicio] = useState(props.primerDia);
  const [fechaFinal, setFechaFinal] = useState(props.ultimoDia);
  const { obtenerUsuarioDeTienda } = useUsuarioTienda(tienda);

  useEffect(() => {
    setcargado(false);
    if (obtenerUsuarioDeTienda !== undefined) {
      setUsuariosDeTienda(obtenerUsuarioDeTienda);
      setcargado(true);
    }
  });

  const actualizarFechaInicio = (value) => {
    let fecha = value.getTime();
    setFechaInicio(fecha);
  };
  const actualizarFechaFinal = (value) => {
    let fecha = value.getTime();
    setFechaFinal(fecha);
  };

  const { obtenerRegistros } = useObtenerRegistros({
    usuario,
    tienda,
    facturado,
    concepto,
    dni,
    fechaInicio,
    fechaFinal,
  });

  if (!cargado) return "Cargando..";

  return (
    <div>
      <div className={`row ${styles.contentFiltro}`}>
        <form className={`col-sm-9 col-md-10`}>
          <div className="row">
            <div className="col-md-4">
              <div className={styles.campoFiltros}>
                <label>Comercial:</label>
                <select
                  name="comercial"
                  className="shadow appearance-none border rounded w-full py-1 px-3 mx-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={(e) => setUsuario(e.target.value)}
                >
                  <option value="">Todos</option>
                  {usuariosDeTienda.map((usuario) => (
                    <option key={usuario.id} value={usuario.id}>
                      {usuario.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.campoFiltros}>
                <label>DNI:</label>
                <input
                  name="dni"
                  type="text"
                  placeholder="Dni Cliente"
                  className="shadow appearance-none border rounded w-full py-1 px-3 mx-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={(e) => setDni(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className={styles.campoFiltros}>
                <label>Facturado:</label>
                <select
                  name="facturado"
                  className="shadow appearance-none border rounded w-full py-1 px-3 mx-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={(e) => setFacturado(e.target.value)}
                >
                  <option value="">Todos</option>
                  <option value="Facturado">Facturado</option>
                  <option value="No Facturado">No facturado</option>
                </select>
              </div>
              <div className={styles.campoFiltros}>
                <label>Concepto:</label>
                <select
                  name="concepto"
                  className="shadow appearance-none border rounded w-full py-1 px-3 mx-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={(e) => setConcepto(e.target.value)}
                >
                  <option value="">Todos</option>
                  <option value="HI">HI</option>
                  <option value="DUO">DUO</option>
                  <option value="Migra">Migra</option>
                </select>
              </div>
            </div>
            <div className="col-md-4">
              <div className={styles.campoFiltros}>
                <label>Fecha Inicio:</label>
                <DatePicker
                  selected={fechaInicio}
                  locale="es"
                  dateFormat={"dd/MM/yy"}
                  placeholder="Fecha inicial"
                  onChange={(date) => actualizarFechaInicio(date)}
                  selectsStart
                  startDate={fechaInicio}
                  endDate={fechaFinal}
                  className="shadow appearance-none border rounded w-full py-1 px-3 mx-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className={styles.campoFiltros}>
                <label>Fecha Final:</label>
                <DatePicker
                  selected={fechaFinal}
                  locale="es"
                  dateFormat={"dd/MM/yy"}
                  placeholder="Fecha final"
                  onChange={(date) => actualizarFechaFinal(date)}
                  selectsEnd
                  startDate={fechaInicio}
                  endDate={fechaFinal}
                  minDate={fechaInicio}
                  className="shadow appearance-none border rounded w-full py-1 px-3 mx-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
          </div>
        </form>
        <div
          className={`col-sm-3 col-md-2 ${styles.contenedorBotonCrearRegistro}`}
        >
          <Link href="/crearregistro">
            <button className={styles.botonCrear}>Crear Registro</button>
          </Link>
        </div>
      </div>
      <div className="mt-4">
        <ListaRegistros registros={obtenerRegistros} />
      </div>
    </div>
  );
};
export default FiltroRegistros;
