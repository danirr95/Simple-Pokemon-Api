import { pokeApi } from "../api";
import { Pokemon } from "../interfaces";

//Función qçasíncrona, la cual recibe el 'name' o el 'id' de un pokemon (ambos serán strings)
export const getPokemonInfo = async (nameOrId: string) => {

  try {
    //Desestructuramos la 'data' de cada pokemon recibido de nuestra petición echa con axios (gracias a nuestra instancia de axios almacenada en 'pokeApi'), a dicha peticion le pasamos el path de pokemon seguido del name o el id obtenido de los params, esto lo hará cada vez que seleccionemos un pokemon diferente | El dato devuelto por nuestra petición será de tipo 'Pokemon' dicho tipo personalizado está declarado como interface en nuestro archivo 'pokemon-full.ts', el cual hemos generado gracias a 'quicktype.io'
    const { data } = await pokeApi.get<Pokemon>(`/pokemon/${nameOrId}`);

    //Retornamos las distintas props necesarias, las cuales se encuentran en el objeto de la 'data'
    return {
      id: data.id,
      name: data.name,
      sprites: data.sprites,
    };
  } catch (error) {
    //Si el user introduce un pokemon que no existe, devolverremos un 404, un null
    return null;
  }
};
