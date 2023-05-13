import { useState } from "react";
import Head from "next/head";
import styles from "@/styles/Login.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import logo from "../assets/logo-150.png";
import { useMutation } from "@apollo/client";
import { AUTENTICAR_USUARIO } from "config/graphqlMutation";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const [mensaje, setMensaje] = useState(null);

  const [autenticarUsuario] = useMutation(AUTENTICAR_USUARIO);
  // Validacion
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("El Usuario es necesario"),
      password: Yup.string().required("El Password es necesario"),
    }),
    onSubmit: async (valores) => {
      const { username, password } = valores;
      try {
        const { data } = await autenticarUsuario({
          variables: {
            input: {
              username,
              password,
            },
          },
        });

        setMensaje("Autenticando...");
        const { token } = data.autenticarUsuario;
        localStorage.setItem("token", token);
        setTimeout(() => {
          setMensaje(null);
          router.push("/");
        }, 1500);
      } catch (error) {
        setMensaje(error.message);
        setTimeout(() => {
          setMensaje(null);
        }, 2000);
      }
    },
  });

  const mostrarMensaje = () => {
    return (
      <div name="autenticando" className={styles.contenedorMensaje}>
        {mensaje}
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>Vodafone</title>
        <meta name="description" content="Generated for Vodafone" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo-vodafone.ico" />
      </Head>
      <div className={styles.fondo}>
        <div>
          <Image
            src={logo}
            className={styles.imagenLogo}
            width={100}
            height={100}
            alt="Logo Vodafone"
          />
          <h1 className={styles.tituloLogin} id="login-titulo">
            Login
          </h1>
          {mensaje && mostrarMensaje()}
          <div className={styles.contenedor}>
            <form
              onSubmit={formik.handleSubmit}
              className={styles.contenedorForm}
            >
              <div className={styles.contenedorCampos}>
                <label className={styles.label} htmlFor="username">
                  Usuario
                </label>

                <input
                  placeholder="Nombre Usuario"
                  type="text"
                  id="username"
                  className={styles.campo}
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.username && formik.errors.username ? (
                  <div className="my-2 px-4 error ">
                    <p>{formik.errors.username}</p>
                  </div>
                ) : null}
              </div>
              <div className={styles.contenedorCampos}>
                <label className={styles.label} htmlFor="password">
                  Password
                </label>

                <input
                  placeholder="Password Usuario"
                  type="password"
                  id="password"
                  className={styles.campo}
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="my-2 px-4 error ">
                    <p>{formik.errors.password}</p>
                  </div>
                ) : null}
              </div>
              <input
                id="submitLogin"
                type="submit"
                className={styles.botonLogin}
                value="Iniciar Sesión"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
