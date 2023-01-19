import { FC } from "react";
import { useRouter } from "next/router";

import { Grid, Card } from "@nextui-org/react";

//Interface con los tipos personalizados
interface Props {
  //type 'pokemonId' será de tipo number
  pokemonId: number;
}

//Componente PokemonCard que es de tipo functional component, dicho 'fc' tiene un valor de retorno que será nuestro type creado de forma personalizada | Este componente recibe por argumento un 'id' de un pokemon
export const FavoriteCardPokemon: FC<Props> = ({ pokemonId }) => {
  //Almacenamos en una constante el objeto del router
  const router = useRouter();

  //Al pulsar en el grid que contiene la card, dirigimos al user a la pantalla del pokemon que pulse
  const onFavoriteClicked = () => {
    router.push(`/pokemon/${pokemonId}`);
  };

  return (
    <Grid
      xs={6}
      sm={3}
      md={2}
      xl={1}
      //Creo que esta prop 'key' no es necesario tenerla aqui, ya que solo se utiliza cuando es llemado nuestro componente desde un mapeo
      key={pokemonId}
      onClick={onFavoriteClicked}
    >
      <Card hoverable clickable css={{ padding: 10 }}>
        <Card.Image
          //Utilizamos el enlace general para todos los pokemons, solo cambiamos el 'id' del pokemon en cuestión por una expresión de javascript para así transformar el valor number del 'id' en un valor de tipo string
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`}
          //Si no es en pixeles, la unidad deseada debe ser indicada entre comillas
          width={"100%"}
          height={140}
        />
      </Card>
    </Grid>
  );
};
