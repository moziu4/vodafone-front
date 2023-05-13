import { gql } from "@apollo/client";

// Usuarios

export const NUEVO_USUARIO = gql`
  mutation nuevoUsuario($input: UsuarioInput) {
    nuevoUsuario(input: $input) {
      id
      nombre
      apellido
      username
      rol
      tienda
    }
  }
`;

export const ACTUALIZAR_USUARIO = gql`
  mutation actualizarUsuario($id: ID!, $input: UsuarioInput) {
    actualizarUsuario(id: $id, input: $input) {
      id
      nombre
      apellido
      username
      rol
      tienda
    }
  }
`;

export const ELIMINAR_USUARIO = gql`
  mutation eliminarUsuario($id: ID!) {
    eliminarUsuario(id: $id)
  }
`;

export const AUTENTICAR_USUARIO = gql`
  mutation autenticarUsuario($input: AutenticarInput) {
    autenticarUsuario(input: $input) {
      token
    }
  }
`;

///  TIENDAS

export const NUEVA_TIENDA = gql`
  mutation nuevaTienda($input: TiendaInput) {
    nuevaTienda(input: $input) {
      id
      nombre
      direccion
      valoracion
    }
  }
`;

export const ACTUALIZAR_TIENDA = gql`
  mutation actualizarTienda($id: ID!, $input: TiendaInput) {
    actualizarTienda(id: $id, input: $input) {
      id
      nombre
      direccion
      valoracion
    }
  }
`;

export const ELIMINAR_TIENDA = gql`
  mutation eliminarTienda($id: ID!) {
    eliminarTienda(id: $id)
  }
`;

//////// Registros
export const CREAR_REGISTRO = gql`
  mutation nuevoRegistro($input: RegistroInput) {
    nuevoRegistro(input: $input) {
      id
      creado
      tienda
      fecha
      dni
      concepto
      facturado
      notas
      modificado
    }
  }
`;

export const ACTUALIZAR_REGISTRO = gql`
  mutation actualizarRegistro($id: ID!, $input: RegistroInput) {
    actualizarRegistro(id: $id, input: $input) {
      id
      tienda
      concepto
      creado
      modificado
      fecha
      facturado
      dni
      notas
    }
  }
`;

export const NUEVO_CONCEPTO = gql`
  mutation nuevoConcepto($input: ConceptoInput) {
    nuevoConcepto(input: $input) {
      id
      nombre
      descripcion
    }
  }
`;
