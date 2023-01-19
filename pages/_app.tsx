//Importamos el tipo 'AppProps' de next
import type { AppProps } from "next/app";
//Importamos el 'NextUIProvider' de next UI, dicho componente se ocupa de hacer de proovedor (como Redux)
import { NextUIProvider } from "@nextui-org/react";
//Importamos nuestro tema oscuro creado
import { darkTheme } from "../themes";
//Archivo de estilos globales (EN ESTE CASO NO SE USA, ESTÁ VACÍO)
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider theme={darkTheme}>
      {/* NextUIProvider funciona como proveedor para todos los hijos, en este caso todo aquello que se encuentre en 'Component' | En este caso proveemos el tema oscuro gracias a la prop 'theme' */}
      <Component {...pageProps} />
    </NextUIProvider>
  );
}

export default MyApp;
