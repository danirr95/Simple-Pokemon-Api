import Image from "next/image";
import NextLink from "next/link";
import { Spacer, Text, useTheme, Link } from "@nextui-org/react";

//Componente Navbar
export const Navbar = () => {
  //Desestructuramos la prop 'theme' de la funcion useTheme() importada de next UI, la cual devuelve un objeto
  const { theme } = useTheme();

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "start",
        padding: "0px 20px",
        //Obtenemos el valor de la prop 'gray900' contenida en el objeto 'colors', el cual se encuentra a su vez en el objeto 'theme' desestructurado
        backgroundColor: theme?.colors.gray900.value,
      }}
    >
      {/* Hacemos uso del elemento 'Image' de next para mostrar la imagen de ditto | Dicho elemento Image recibe atributos como las de un elemento img tradicional | Debemos indicar el dominio de procedencia de la imagen en nuestro archivo de configuración de next.config.js | El tamaño indicado en width y height se indica como expresión entre corchetes y su valor en px */}
      <Image
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png"
        alt="icono de la app"
        width={70}
        height={70}
      />

      {/* Hacemos uso del elemento 'NextLink' para navegar a otra ruta, en este caso al HomePage | Le indicamos el 'href' y con la prop 'passHref' le pasamos el 'href' al 'Link' hijo | Este NextLink nos obliga a colocarle un hijo (solo acepta un hijo), así que colocamos un Link de React (que hace como un anchor tag de html) */}
      <NextLink href="/" passHref>
        {/* Este elemento Link si acepta mas de un hijo | No es necesario indicarle el href porque lo hereda de su padre NextLink */}
        <Link>
          <Text color="white" h2>
            P
          </Text>
          <Text color="white" h3>
            okémon
          </Text>
        </Link>
      </NextLink>

      {/* Elemento de next UI el cual nos permite insertar un espacio | En nuestro caso, le indicamos dentro de su prop 'css' que sea flex: 1, lo cual hará que ocupe todo el espacio posible, haciendo que los dos textos (Pokemon y Favoritos) se separen y esté cada uno a un lado del navbar*/}
      <Spacer css={{ flex: 1 }} />

      <NextLink href="/favorites" passHref>
        <Link>
          <Text h5 color="white">Favoritos</Text>
        </Link>
      </NextLink>
    </div>
  );
};
