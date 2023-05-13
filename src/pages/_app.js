import { ApolloProvider } from "@apollo/client";
import client from "../../config/apollo";

import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import MiUsuarioState from "config/context/miUsuario/MiUsuarioState";

export default function App({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <MiUsuarioState>
        <Component {...pageProps} />
      </MiUsuarioState>
    </ApolloProvider>
  );
}
