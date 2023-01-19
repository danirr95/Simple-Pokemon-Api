import { useEffect, useState } from "react";

import { Layout } from "../../components/layouts";
import { NoFavorites } from "../../components/ui";
import { localFavorites } from "../../utils";
import { FavoritePokemons } from "../../components/pokemon";

const FavoritesPage = () => {
  //Usamos un useState para almacenar en el state un array de numbers
  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([]);

  //Usamos un useEffect que será ejecutado cada vez que se renderice el componente de FavoritesPage
  useEffect(() => {
    //Seteamos en el state el array devuelto por la función 'pokemons()' de nuestro objeto importado 'localFavorites'
    setFavoritePokemons(localFavorites.pokemons());
  }, []);

  return (
    //Hacemos uso del layout creado por nosostros, el cual recibe el título que deseamos ponerle a la page actual
    <Layout title="Pokémons - Favoritos">
      {/* Si en el array de pokemons favoritos no hay ningún pokemon */}
      {favoritePokemons.length === 0 ? (
        //Renderizamos el componente NoFavorites
        <NoFavorites />
      ) : (
        //Si hay pokemons ne el array de favoritos, renderizamos el componente FAvoritePokemons, al cual le pasamos como prop el array de pokemons favoritos
        <FavoritePokemons pokemons={favoritePokemons} />
      )}
    </Layout>
  );
};

export default FavoritesPage;
