import { FC } from "react";
import { useRouter } from "next/router";

import { Grid, Card, Row, Text } from "@nextui-org/react";

import { SmallPokemon } from "../../interfaces";
//
import NextLink from "next/link";

//Interface con los tipos personalizados
interface Props {
  //type 'pokemon' será de tipo 'SmallPokemon' (un array creado por cada pokemon de forma individual que contiene los datos de dicho pokemon)
  pokemon: SmallPokemon;
}

//Componente PokemonCard que es de tipo functional component, dicho fc tiene un valor de retorno que será nuestro type creado de forma personalizada | Este componente recibe por argumento un pokemon del cual extraerá cada dato necesario
export const PokemonCard: FC<Props> = ({ pokemon }) => {
  //Almacenamos en una constante el objeto del router | If you want to access the router object inside any function component in your app, you can use the useRouter hook
  const router = useRouter();

  //Funcion personalizada que se encarga de añadir al objeto de nuestro 'router' el url con el id del pokemon deseado, la cual contiene la dirección con el 'id' del pokemon actual que haya recibido por argumento nuestro FC 'PokemonCard'
  const onClick = () => {
    router.push(`/pokemon/${pokemon.id}`);
  };

  return (
    //Hacemos uso del elemento Grid de next UI, le indicamos que en pantallas xs ocupe 6 de 12, y así con las demás. Tambien indicamos que su key sea el 'id' de cada pokemon respectivo
    <Grid xs={6} sm={3} md={2} xl={1} key={pokemon.id}>
      {/* Elemento card de next UI, con su prop 'hoverable' indicamos que se pueda pasar el ratón por encima de la card para hacer algún tipo de efecto, así como clickable para ejecutar algo al clickar sobre ella | Como prop onClick le pasamos la referencia a nuestra funcion onClick creada mas arriba */}
      <Card hoverable clickable onClick={onClick}>
        {/* Indicamos el body de la card, al cual le pasamos en su prop 'css' (que en next ui es como el atributo 'styles' normal) un padding de 1 */}
        <Card.Body css={{ p: 1 }}>
          <Card.Image
            //Indicamos la imagen de la card, cuyo width es declarado de forma explícita entre comillas y cuyo height es colocado entre corchetes de forma implícita, cuyo valor será interpretado en px
            src={pokemon.img}
            width="100%"
            height={140}
          />
        </Card.Body>
        {/* Indicamos el footer de la card */}
        <Card.Footer>
          {/* Hacemos uso del elemento Row de next UI al cual le indicamos una prop de justify-content en space-between */}
          <Row justify="space-between">
            {/* Hacemos uso del elemento Text de next UI al cual le indicamos la prop de 'transform' y su valor 'capitalize' para que coloque el texto de su interior en mayúscula */}
            <Text transform="capitalize">{pokemon.name}</Text>
            <Text>#{pokemon.id}</Text>
          </Row>
        </Card.Footer>
      </Card>
    </Grid>
  );
};
