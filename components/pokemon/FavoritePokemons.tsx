import { FC } from 'react';
import { Grid } from '@nextui-org/react';

import { FavoriteCardPokemon } from './';

//Interface con los tipos personalizados
interface Props {
  //type 'pokemons' será de tpo array de numbers
    pokemons: number[];
}

//Componente PokemonCard que es de tipo functional component, dicho 'fc' tiene un valor de retorno que será nuestro type creado de forma personalizada | Este componente recibe por argumento un array con los 'ids' de los pokemons
export const FavoritePokemons: FC<Props> = ({ pokemons }) => {
  return (

    <Grid.Container gap={ 2 } direction='row' justify='flex-start'>
    {
      //Mapeamos todo el array de pokemons recibido por argumento
        pokemons.map( id => (
          //Por cada 'id' mapeado, creamos un nuevo componente 'FavoriteCardPokemon' al cual le pasamos como props la 'key' para identificarlo de forma única, así como la prop 'pokemonId'. El valor de ambas props será el 'id' del pokemon que estemos mapeando en ese momento 
            <FavoriteCardPokemon key={ id } pokemonId={ id } />          
        ))
    }
    </Grid.Container>

  )
};
