import { NextPage, GetStaticProps } from "next";
import { Grid } from "@nextui-org/react";

//Importamos la instancisça de axios creada
import { pokeApi } from "../api";
import { Layout } from "../components/layouts";
import { PokemonListResponse, SmallPokemon } from "../interfaces";
import { PokemonCard } from "../components/pokemon";

//Creamos una interface para usar types personalizados (sus props, en este caso solo una, son los types personalizados)
interface Props {
  //El type pokemon es a su vez de tipo array de 'SmallPokemon'
  pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
  return (
    <Layout title="Listado de Pokémons">
      {/* Usamos el elemento Grid (variante container) de next UI, al cual le indicamos un gap de 2 y un justify content de flex-start */}
      <Grid.Container gap={2} justify="flex-start">
        {/* Lo rellenamos mapeando el array de pokemons, con cada pokemon tomado construimos un componente 'PokemonCard' */}
        {pokemons.map((pokemon) => (
          //La 'key' de cada card es el 'id' del pokemon respectivo, así como tambien recibe el atributo 'pokemon', dentro del cual toda la info que se encuentre dentro de cada pokemon
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </Grid.Container>
    </Layout>
  );
};

//Solo podemos usar GetStaticProps en las pages, dentro de nuestros componentes no podemos hacer uso de ello | Usamos 'GetStaticProps' para generar cierta información, en este caso un array con imagenes (una request) antes de que el user necesite disponer de ella, ya que sabemos que ese array va a ser servido si o si. Con esto hacemos uso de la server-side generation (ya que esta función solo se puede ejecutar del lado del servidor), lo único que llega al lado del cliente es el objeto 'props' que retornamos | Dicha funcion que se ejecuta en tiempo de build, es de tipo 'GetStaticProps', es asíncrona ya que debemos usar el await para obtener las imágenes | Recibe el contexcçto por argumento, aunque en este caso no se usa
export const getStaticProps: GetStaticProps = async (ctx) => {
  //Desestructuramos la data de nuestra petición a la pokeapi | Le pasamos el path que se deberá sumar a la baseUrl, en este caso le pasamos un query param que indica que como límite queremos solo la data de 151 pokemons | Indicamos que este get es de un tipo personalizado 'PokemonListResponse'
  const { data } = await pokeApi.get<PokemonListResponse>("/pokemon?limit=151");

  //Almacenamos en una constante el array de tipo 'SmallPokemon', el cual rellenamos con los datos obtenidos del array de 'results' | Dicho array de results es mapeado, y obtenemos cada pokemon y su índice
  const pokemons: SmallPokemon[] = data.results.map((poke, i) => ({
    //Almacenamos en el array resultado todas las propiedades esparcidas con spreed
    ...poke,
    //Almacenamos tambien el id del pokemon (le sumamos uno porque al venir de un array, el primero empieza en 0)
    id: i + 1,
    //OPbtenemos la imagen, la cual es una interpolación de string para poder colocarle el id del pokemon de forma dinámica
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
      i + 1
    }.svg`,
  }));

  return {
    //Retornamos las props que serán pasadas a nuestro componente de mas arriba (HomePage) | Dicha 'props' no es mas que una prop formada por un objeto el cual contiene una prop que es un array con las imágenes de los pokemons | pokemons : pokemons es redundante, por eso se indica solo una vez
    props: {
      pokemons,
    },
  };
};

export default HomePage;
