//Importamos los componentes de next que usamos en nuestro return jsx
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
//Importamos el 'CssBaseline' que hará que nuestra web se vea bien en todos los navegadores donde sea ejecutada
import { CssBaseline } from "@nextui-org/react";

//A custom Document can update the <html> and <body> tags used to render a Page | This file is only rendered on the server, so event handlers like onClick cannot be used in _document
class MyDocument extends Document {
  //'getInitialProps' hook returns the context object with the addition of renderPage | renderPage callback executes React rendering logic synchronously to support server-rendering wrappers | Recibe por argumento el parámetro 'ctx' que es de tipo 'DocumentContext'
  static async getInitialProps(ctx: DocumentContext) {
    /*Almacenamos en una constante el contexto devuelto (es un objeto) -> 
        {
            styles: JSX.Element;
            html: string;
            head?: (JSX.Element | null)[] | undefined;
        }>  
    */
    const initialProps = await Document.getInitialProps(ctx);
    //Retornamos un objeto que contiene todos los valores del objeto de 'initialProps' (html y head) esparcidos con spreed y una prop 'styles' que contiene un JSX.Element con los styles contenidos en nuestro objeto 'initialProps' 
    return {
      ...initialProps,
      styles: <>{initialProps.styles}</>,
    };
  }

  //Renderizamos el JSX.Element indicado
  render() {
    return (
      <Html lang="es">
        {/* Colocamos dentro del Head una expresión de javascript, dentro de la cual ejecutamos el flush() de CssBaseline para que dicho componente pueda hacer su efecto */}
        <Head>{CssBaseline.flush()}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
