import { useQuery } from "@apollo/client";
import { OBTENER_REGISTROS } from "config/graphqlQueries";

export const useObtenerRegistros = (props) => {
  const input = {};
  const inputFecha = {};
  const creado = props.usuario;
  const tienda = props.tienda;
  const facturado = props.facturado;
  const dni = props.dni;
  const concepto = props.concepto;
  const fechaIni = props.fechaInicio;
  const fechaFin = props.fechaFinal;

  if (creado) {
    input.creado = creado;
  }
  if (tienda) {
    input.tienda = tienda;
  }
  if (facturado) {
    input.facturado = facturado;
  }
  if (concepto) {
    input.concepto = concepto;
  }
  if (dni) {
    input.dni = dni;
  }
  if (fechaIni) {
    inputFecha.fechaIni = fechaIni.toString();
  }
  if (fechaFin) {
    inputFecha.fechaFin = fechaFin.toString();
  }

  // Obtener datos
  const { data, loading, error } = useQuery(OBTENER_REGISTROS, {
    variables: {
      input,
      inputFecha: {
        fechaIni: inputFecha.fechaIni,
        fechaFin: inputFecha.fechaFin,
      },
    },
  });

  if (loading) return "Cargando";
  const { obtenerRegistros } = data;
  return { obtenerRegistros };
};
