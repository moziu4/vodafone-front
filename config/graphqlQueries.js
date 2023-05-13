import { gql } from "@apollo/client";

// Usuarios

export const OBTENER_USUARIOS = gql`
  query obtenerUsuarios($sortBy: SortBy) {
    obtenerUsuarios(sortBy: $sortBy) {
      id
      nombre
      apellido
      username
      rol
      tienda
    }
  }
`;

export const OBTENER_USUARIO = gql`
  query obtenerUsuario($id: ID!) {
    obtenerUsuario(id: $id) {
      nombre
      apellido
      username
      rol
      tienda
      password
    }
  }
`;

export const OBTENER_MI_USUARIO = gql`
  query obtenerMiUsuario($token: String!) {
    obtenerMiUsuario(token: $token) {
      id
      nombre
      apellido
      tienda
      rol
    }
  }
`;

export const OBTENER_USUARIO_TIENDA = gql`
  query obtenerUsuarioDeTienda($input: KtiendaInput) {
    obtenerUsuarioDeTienda(input: $input) {
      id
      nombre
      apellido
      rol
      password
      username
      tienda
    }
  }
`;

////// TIENDAS

export const OBTENER_TIENDAS = gql`
  query obtenerTiendas {
    obtenerTiendas {
      id
      nombre
      direccion
      valoracion
    }
  }
`;

export const OBTENER_TIENDA = gql`
  query obtenerTienda($id: ID!) {
    obtenerTienda(id: $id) {
      id
      nombre
      direccion
      valoracion
    }
  }
`;

////////  REGISTROS /////////

export const OBTENER_REGISTROS = gql`
  query obtenerRegistros($input: FiltroInput, $inputFecha: FechaInput) {
    obtenerRegistros(input: $input, inputFecha: $inputFecha) {
      id
      dni
      creado
      fecha
      facturado
      tienda
      concepto
      notas
    }
  }
`;

export const OBTENER_REGISTRO = gql`
  query obtenerRegistro($id: ID!) {
    obtenerRegistro(id: $id) {
      id
      dni
      facturado
      fecha
      creado
      modificado
      notas
      concepto
      tienda
    }
  }
`;

////// CONCEPTOS

export const OBTENER_CONCEPTOS = gql`
  query obtenerConceptos {
    obtenerConceptos {
      id
      nombre
      descripcion
    }
  }
`;
