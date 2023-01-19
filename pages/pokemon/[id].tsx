import { useState } from "react";

import { GetStaticProps, NextPage, GetStaticPaths } from "next";
import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";

import confetti from "canvas-confetti";

import { pokeApi } from "../../api";
import { Layout } from "../../components/layouts";
import { Pokemon } from "../../interfaces";
import { localFavorites } from "../../utils";
import { getPokemonInfo } from "../../utils/getPokemonInfo";

//Interface de type 'Props'
interface Props {
  //type pokemon que a su vez es de type 'Pokemon' (interface Pokemon)
  pokemon: Pokemon;
}

//Componente PokemonCard que es de tipo NextPage, dicha NextPage tiene un valor de retorno que será nuestro type creado de forma personalizada | Este componente recibe por argumento un pokemon del cual extraerá cada dato necesario
const PokemonPage: NextPage<Props> = ({ pokemon }) => {
  //Utilizamos un useState que contendrá un valor booleano, dado por la función que comprueba
  const [isInFavorites, setIsInFavorites] = useState(
    localFavorites.existInFavorites(pokemon.id)
  );

  //Funcion que introducirá el pokemon deseado en favoritos o lo eliminará si ya se encuentra ahí
  const onToggleFavorite = () => {
    //Funcion que coloca un pokemon en el array de favoritos o lo elimina | Recibe por argumento el 'id' que introducirá o eliminará del array de pokemons favoritos
    localFavorites.toggleFavorite(pokemon.id);
    //Seteamos en el state 'isInFavorites' el valor contrario que tenga actualmente, esto se hace para actualizar el valor del state, ya que al ejecutar la función toggleFavorite() el pokemon ya a desaparecido del array (si es que estaba) o ha sido añadido a él
    setIsInFavorites(!isInFavorites);

    //Si el pokemon existe en favoritos, se sale de la función con un return
    if (isInFavorites) return;

    //Si no existía en favoritos, ejecuta el confeti
    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 1,
        y: 0,
      },
    });
  };

  return (
    //Utilizamos nuestro layout personalizado, el cual recibe la prop 'title' que le cambiará el titulo a la page en la que nos encontramos
    <Layout title={pokemon.name}>
      {/* Usamos un container grid con un marginTop y un gap en su interior */}
      <Grid.Container css={{ marginTop: "5px" }} gap={2}>
        {/* Un grid (cuadrícula) que ocupe todo lo posible en pantallas 'xs' y en 'sm' solo 4 */}
        <Grid xs={12} sm={4}>
          {/* Es hoverable para poder realizar algún efecto al pasar el cursor por encima */}
          <Card hoverable css={{ padding: "30px" }}>
            {/* Cuerpo de la card */}
            <Card.Body>
              {/* Imagen de la card */}
              <Card.Image
                //El src es obligartorio así que colocamos un argumento condicional por si existe algún fallo al obtener la imagen o en la petición (en este caso el other es condicional porque no existe en todos los pokemons, solo en los primeros 151), a partir de ahí puede no existir los demás | En el caso de que haya algún error, se mostrará una imagen predeterminada (que ahora mismo no existe porque no la tenemos en tre nuestros archivos)
                src={
                  pokemon.sprites.other?.dream_world.front_default ||
                  "/no-image.png"
                }
                alt={pokemon.name}
                width="100%"
                //height en 200px
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>

        {/* Una nueva cuadrícula grid */}
        <Grid xs={12} sm={8}>
          <Card>
            {/* Header de la card */}
            <Card.Header
              css={{ display: "flex", justifyContent: "space-between" }}
            >
              {/* Este elemento Text indicamos con la prop 'h1' que represente a un elemento h1 de html, esto es adecuado para que los bots de los buscadores detecten que es un contenido importante */}
              <Text h1 transform="capitalize">
                {pokemon.name}
              </Text>
              {/* Con la prop 'ghost' hacemos que nuestro botón adapte un estilo con un borde y un fondo transparente */}
              <Button
                color="gradient"
                ghost={!isInFavorites}
                onClick={onToggleFavorite}
              >
                {/*  */}
                {isInFavorites ? "En Favoritos" : "Guardar en favoritos"}
              </Button>
            </Card.Header>

            {/* Body de la card */}
            <Card.Body>
              {/* Text con size en 30 unidades */}
              <Text size={30}>Sprites:</Text>

              {/* Elemento container (como un div de class container) | la prop direction se aplica gracias a que indicamos que el display es flex */}
              <Container direction="row" display="flex" gap={0}>
                <Image
                  //En este src no ponemos el parámetro como condicional porque todos los pokemon disponen de dichas props 'sprites' y sus valores
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  );
};

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
//En esta page debemos declarar la función 'getStaticPaths' ya que en este caso, se trata de una page que recibe argumentos dinámicos (en este caso es el 'id' de cada pokemon)
//Nuestra funcion es de tipo 'GetStaticPaths', recibe el contexto por argumento, aunque no hacemos uso de ello
export const getStaticPaths: GetStaticPaths = async (ctx) => {
  //Almacenamos en una constante un array con los indices de sde el 1 hasta el 151, esto lo hacemos creando con el constructor de Arrays un array, a dicho constructor le pasamos por argumento la cantidad de elementos que deseamos que tenga dicho array creado | Lo que nos devuelve (un array) lo esparcimos con spreed, acto seguido mapeamos este array esparcido para poder obtener cada index y hacemos que dicha funcion map nos devuelva cada index + 1 indicado como interpolación de string para que nos devuelva un string que es lo que necesita la prop 'params' | Todo esto resulta en el nuevo array que almacenamos en la constante 'pokemon151'
  const pokemons151 = [...Array(151)].map((value, index) => `${index + 1}`);

  return {
    //Cada path será cada page que deseamos que sea cargada en tiempo de build | Mapeamos todo el array de pokemons para pasar un 'param' por cada uno de ellos, en este caso pasamos el id de cada pokemon cada vez | Cada path tendrá su propio objeto con una prop 'params' que tendrá a su vez un 'id' único, dicho 'id' se obtiene de mapear todos los elementos contenidos en nuestro array creado
    paths: pokemons151.map((id) => ({
      //Debemos indicar en la prop 'params' (ESTA PROP ESTÁ FORMADA POR LOS PARAMS QUE SERÁN LOS QUERY PARAMS DE CADA PAGE CREADA) aquellos params que serán dinámicos y que deberán ser recibidos por nuestro componente, en este caso, como el nombre de nuestro archivo indica, será el 'id' el argumento que recibe nuestra page | El argumento que recibe 'params' DEBE SER SIEMPRE UN STRING
      params: { id },
    })),
    //Con 'fallback: false' indicamos que si el user introduce un id que no esta permitido, dará un error 404 | Si indicamos que sea 'blocking' entre comillas, e introducimos un id que no habíamos precargado, la web intentará hacer una nueva petición a la api con el id que le pasemos, y si no encuentra nada, lanazará un error 500
    fallback: false,
  };
};

//Esta funcion 'getStaticProps' que es de tipo 'GetStaticProps' recibe los 'params' precargados en nuestra 'getStaticPaths()' desestructurados desde el 'contexto'
export const getStaticProps: GetStaticProps = async ({ params }) => {
  //Desestructuramos el 'id' de cada pokemon del objeto 'params' que es el objeto que contiene nuestros queryParams | Para poder indicar el tipo de los params debemos indicar un objeto en el que cada prop de los params nos indique de que tipo es, en este caso solo tenemos la prop 'id' que es de tipo string
  const { id } = params as { id: string };

  //Desestructuramos la 'data' de cada pokemon recibido de nuestra petición echa con axios (gracias a neustra instancia de axios almacenada en 'pokeApi'), a dicha peticion le pasamos el path de pokemon seguido del id obtenido de los params, esto lo hará cada vez que seleccionemos un pokemon diferente | El dato devuelto por nuestra petición será de tipo 'Pokemon' dicho tipo personalizado está declarado como interface en nuestro archivo 'pokemon-full.ts', el cual hemos generado gracias a 'quicktype.io'
  //const { data } = await pokeApi.get<Pokemon>(`/pokemon/${id}`);

  //Almacenamos en una constante el objeto devuelto por la funcion asíncrona getPokemonInfo() la cual se encarga de servirnos los datos del pokemon
  const pokemon = await getPokemonInfo(id);

  //Si el pokemon solicitado no existe en la pokeApi
  if (!pokemon) {
    return {
      //Retornamos un objeto 'redirect' el cual indica las pautas para redirigir al user
      redirect: {
        //Destino al que será mandado el user, en este caso, al home
        destination: "/",
        //Esta prop le indica a los bots de google si la redirección que se le va a hacer al user es permanente, en nuestro caso, esto indicaría que deseamos prohibir un nuevo intento de acceso a ese pokemon que antes no existía | Como es posible que en algún momento ese pokemon exista, decimos que la redirección no será permanenete, esto quiere decir que el user puede intentar cuantas veces quiera el acceder a ese pokemon que en un momento le dio error
        permanent: false,
      },
    };
  }

  return {
    //Retorna las props que recibirá esta misma page
    props: {
      //Dichas props contiene una prop 'pokemon', la cual a su vez, contiene el objeto devuelto por la funcion asíncrona getPokemonInfo() la cual se encarga de servirnos los datos del pokemon
      //pokemon: pokemon
      pokemon,
    },
    // Next.js will re-generate the page
    // El number indicado será el tiempo en segundos tras el cual (contado desde el builda completo) se volverá a generar una nueva build de la página
    revalidate: 86400,
  };
};

export default PokemonPage;
