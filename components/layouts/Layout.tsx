import { FC } from "react";

import Head from "next/head";
import { Navbar } from "../ui";

//Creamos una interface que contiene tipos personalizados | ESTO NOS PERMITE RECIBIR PROPS PERSONALIZADAS EN NUESTRO COMPONENTE
interface Props {
  //Prop opcional de tipo string
  title?: string;
}

//Almacenamos en una constante el 'origin' de la url que es no es mas que el path inicial. Ej -> http://localhost:3000/ | http://vercel-app...
//En el caso de estar en la parte del servidor, el typeof window (de donde obtendremos la prop 'origin') será undefined, así que almacenaremos un string vacío, en caso de estar en el lado del cliente, si que dispondremos del objeto window, del cual podremos obtener la prop origin
const origin = typeof window === "undefined" ? "" : window.location.origin;

//Componente 'Layout' es de tipo Functional Component, dicho FC tiene las props indicadas en la interface creada ('Props'), esto nos permite recibir props personalizadas en nuestro componente | Recibe por argumento sus children y la prop 'title' (que es opcional)
export const Layout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title || "Pokemon-App"}</title>
        <meta name="author" content="Daniel Ruiz" />
        {/* descripcion de nuestra web que aparecera en los navegadores */}
        <meta
          name="description"
          content={`Información sobre el pokémon ${title}`}
        />
        {/* keywprds es palabras que pueden usar para buscar nuestra web en los navegadores */}
        <meta name="keywords" content={`${title}, pokemon, pokedex`} />

        {/* Metatags para hacer uso de las Open Graph Meta Tags (para cuando compartan un enlace de nuestra web en redes sociales) */}
        <meta property="og:title" content={`Información sobre ${title}`} />
        <meta
          property="og:description"
          content={`Esta es la página sobre ${title}`}
        />
        <meta property="og:image" content={`${origin}/img/banner.png`} />
      </Head>

      <Navbar />

      <main
        //Aplicamos estilos pasando un objeto con los estilos deseados
        style={{
          padding: "0px 20px",
        }}
      >
        {/* Recibimos aquí los children de nuestro componente */}
        {children}
      </main>
    </>
  );
};
