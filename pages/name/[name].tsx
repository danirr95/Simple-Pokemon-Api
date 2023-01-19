import { useState } from "react";

import { GetStaticProps, NextPage, GetStaticPaths } from "next";
import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";

//Debemos instalar los @types de confeti para poder usarlo en typescript
import confetti from "canvas-confetti";

import { pokeApi } from "../../api";
import { Layout } from "../../components/layouts";
import { Pokemon, PokemonListResponse } from "../../interfaces";
import { getPokemonInfo, localFavorites } from "../../utils";

//Interface de type 'Props'
interface Props {
  //type pokemon que a su vez es de type 'Pokemon' (interface Pokemon)
  pokemon: Pokemon;
}

//Componente PokemonCard que es de tipo NextPage, dicha NextPage tiene un valor de retorno que será nuestro type creado de forma personalizada | Este componente recibe por argumento un pokemon del cual extraerá cada dato necesario
const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {
  //Utilizamos un useState que contendrá un valor booleano, dado por la función que comprueba
  const [isInFavorites, setIsInFavorites] = useState(
    localFavorites.existInFavorites(pokemon.id)
  );

  //Funcion que introducirá el pokemon deseado en favoritos o lo eliminará si ya se encuentra ahí
  const onToggleFavorite = () => {
    //Funcion que coloca un pokemon en el array de favoritos o lo elimina | Recibe por argumento el 'id' que introducirá o eliminará del array de pokemons favoritos
    localFavorites.toggleFavorite(pokemon.id);
    //Seteamos en el state 'isInFavorites' el valor contrario que tenga actualmente, esto se hace para actualizar el valor del state, ya que al ejecutar la función toggleFavorite() el pokemon ya a desaparecido del array (si es que estaba) o ha sido añadido a él
    //USESTATE IS AN ASYNCHRONOUS HOOK, IT WILL WAIT FOR THE COMPONENT TO FINISH ITS CYCLE, RE-RENDER, AND THEN IT WILL UPDATE THE STATE | Esto quiere decir que el nuevo valor para 'isInFavorites' se seteará una vez que el componente haya sido renderizado por completo, así que el valor 'antiguo' será el que llegue al if
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
    <Layout title={pokemon.name}>
      <Grid.Container css={{ marginTop: "5px" }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card hoverable css={{ padding: "30px" }}>
            <Card.Body>
              <Card.Image
                //Argumento opcional porque no todos los pokemon disponen de dicha prop 'other'
                src={
                  pokemon.sprites.other?.dream_world.front_default ||
                  "/no-image.png"
                }
                alt={pokemon.name}
                width="100%"
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>

        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header
              css={{ display: "flex", justifyContent: "space-between" }}
            >
              <Text h1 transform="capitalize">
                {pokemon.name}
              </Text>

              <Button
                color="gradient"
                ghost={!isInFavorites}
                onClick={onToggleFavorite}
              >
                {/* En funcion de si se encuentra en favoritos o no, muestra un texto u otro */}
                {isInFavorites ? "En Favoritos" : "Guardar en favoritos"}
              </Button>
            </Card.Header>

            <Card.Body>
              <Text size={30}>Sprites:</Text>

              <Container direction="row" display="flex" gap={0}>
                <Image
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

//You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
//En esta page debemos declarar la función 'getStaticPaths' ya que en este caso, se trata de una page que recibe argumentos dinámicos (en este caso es el 'name' de cada pokemon)
//Nuestra funcion es de tipo 'GetStaticPaths', recibe el contexto por argumento, aunque no hacemos uso de ello
export const getStaticPaths: GetStaticPaths = async (ctx) => {
  //Desestructuramos la 'data' de cada pokemon recibido de nuestra petición echa con axios (gracias a neustra instancia de axios almacenada en 'pokeApi'), a dicha peticion le pasamos el path de pokemon seguido del 'queyparam' que le indicará que queremos solo 151 elementos (pokemons) | El dato devuelto por nuestra petición será de tipo 'PokemonListResponse' dicho tipo personalizado está declarado como interface en nuestro archivo 'pokemon-list.ts', el cual hemos generado gracias a 'quicktype.io'
  const { data } = await pokeApi.get<PokemonListResponse>("/pokemon?limit=151");
  //Creamos un array de strings que será rellenado con el 'name' de cada pokemon conseguido mediante el mapeo de la prop 'results' de nuestro objeto 'data' desestructurado de la petición echa
  const pokemonNames: string[] = data.results.map((pokemon) => pokemon.name);

  return {
    //Cada path será cada page que deseamos que sea cargada en tiempo de build | Mapeamos todo el array de pokemons para pasar un 'param' por cada uno de ellos, en este caso pasamos el 'name' de cada pokemon cada vez | Cada path tendrá su propio objeto con una prop 'params' que tendrá a su vez un 'name' único, dicho 'name' se obtiene de mapear todos los elementos contenidos en nuestro array creado
    paths: pokemonNames.map((name) => ({
      //Debemos indicar en la prop 'params' (ESTA PROP ESTÁ FORMADA POR LOS PARAMS QUE SERÁN LOS QUERY PARAMS DE CADA PAGE CREADA) aquellos params que serán dinámicos y que deberán ser recibidos por nuestro componente, en este caso, como el nombre de nuestro archivo indica, será el 'name' el argumento que recibe nuestra page | El argumento que recibe 'params' DEBE SER SIEMPRE UN STRING
      params: { name },
    })),
    //Con 'fallback: false' indicamos que si el user introduce un id que no esta permitido, dará un error 404 | Si indicamos que sea 'blocking' entre comillas, e introducimos un id que no habíamos precargado, la web intentará hacer una nueva petición a la api con el id que le pasemos, y si no encuentra nada, lanazará un error 500
    fallback: "blocking",
  };
};

//Esta funcion 'getStaticProps' que es de tipo 'GetStaticProps' recibe los 'params' precargados en nuestra 'getStaticPaths()' desestructurados desde el 'contexto'
export const getStaticProps: GetStaticProps = async ({ params }) => {
  //Desestructuramos el 'name' de cada pokemon del objeto 'params' que es el objeto que contiene nuestros 'queryParams' | Para poder indicar el tipo de los params debemos indicar un objeto en el que cada prop de los params nos indique de que tipo es, en este caso solo tenemos la prop 'name' que es de tipo string
  const { name } = params as { name: string };

  //Almacenamos en una constante el objeto devuelto por la funcion asíncrona getPokemonInfo() la cual se encarga de servirnos los datos del pokemon
  const pokemon = await getPokemonInfo(name);

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

export default PokemonByNamePage;
